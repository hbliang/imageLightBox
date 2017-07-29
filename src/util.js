const util = {
    removeElement (el) {
        el.parentElement.removeChild(el);
    },
    windowWidth () {
        return isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;
    },
    windowHeight () {
        return isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
    },
    extend (oldObject, newObject) {
        return Object.assign({}, oldObject, newObject);
    },
    htmlToDom (html) {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        
        return wrapper.firstChild;
    },
    addClass (el, className) {
        if (!el) {
            return;
        }

        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    }, 
    removeClass (el, className) {
        if (!el) {
            return;
        }

        if (el.classList) {
            el.classList.remove(className);
        } else {
            if (el.hasClass(el, className)) {

                let classes = el.className.split(" ");
                classes.splice(classes.indexOf(className), 1);
                el.className = classes.join(" ");
            }
        }
    },
    hasClass (el, className) {
        if (!el) {
            return;
        }

        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return el.className.match(new RegExp('\b' + className + '\b'));
        }
    }
}

module.exports = util;