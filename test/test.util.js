const assert = chai.assert

describe('util', function () {
    describe('#removeElement()', function () {
        it('should remove element', function () {
            let el = document.createElement('div');
            el.id = 'testRemoveElement';

            document.body.appendChild(el);
            assert.isNotNull(document.getElementById('testRemoveElement'), 'create element');
            util.removeElement(el);
            assert.isNull(document.getElementById('testRemoveElement'));
        });
    })

    describe('#extend()', function () {
        it('empty object extend empty object', function () {
            assert.deepEqual(util.extend({}, {}), {});
        });
        it('empty object extend no empty object', function () {
            assert.deepEqual(util.extend({}, { a: 1 }), { a: 1 });
        });
        it('no empty object extend empty object', function () {
            assert.deepEqual(util.extend({ a: 1 }, {}), { a: 1 });
        });
        it('no empty object extend no empty object', function () {
            assert.deepEqual(util.extend({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
        });
        it('first object is override by second object', function () {
            assert.deepEqual(util.extend({ a: 1 }, { a: 2 }), { a: 2 });
        });
        it('complex condition', function () {
            assert.deepEqual(util.extend({ a: 1, b: 2, c: 3 }, { a: 2, d: 5 }), { a: 2, b: 2, c: 3, d: 5 });
        })
    });

    describe('#htmlToDom()', function () {
        it('should html to dom', function () {
            let html = '<div id="hello">hello world</div>';
            const el = util.htmlToDom(html);
            assert.isNotNull(el, 'not null');
            assert.instanceOf(el, Element);
        });
    });

    describe('#addClass()', function () {
        it('should add class', function () {
            const el = document.createElement('div');
            el.className = 'abc de fgh';
            util.addClass(el, 'test');
            assert.include(el.className, 'test');
        });
    })

    describe('#hasClass()', function () {
        it('check to have class', function () {
            const el = document.createElement('div');
            el.className = 'abc de fgh';

            assert.equal(util.hasClass(el, 'de'), true);
            assert.equal(util.hasClass(el, 'dee'), false);
        });
        it('check to special class', function () {
            const el = document.createElement('div');
            el.className = '  abc de   fgh    ';

            assert.equal(util.hasClass(el, 'de'), true);
            assert.equal(util.hasClass(el, 'dee'), false);
        });
    });

    describe('#removeClass()', function () {
        it('should remove class', function () {
            const el = document.createElement('div');
            el.className = 'abc de fgh';
            util.removeClass(el, 'de');
            assert.notInclude(el.className, 'de');
        });
    });
});