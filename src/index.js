import './style.scss';
import 'font-awesome/scss/font-awesome.scss';
import util from './util.js';

const imageLightBox = function (selector, options = {}) {
    const self = this;

    this.item = document.querySelector(selector);

    var defaultOptions = {
        showToolbar: true,
        downloadUrl: '',
        imageProcessing: false, // sometime image you want to popup is processing.
        cache: false
    }

    this.options = util.extend(defaultOptions, options);

    this.overlay = {
        id: 'imageLightBoxOverlay' + Math.random().toString(36).substr(2, 10),
        instance: null,
        dom() {
            if (!this.instance) {
                let div = document.createElement('div');
                div.id = this.id;
                div.className = 'imageLightBoxOverlay';

                div.style['text-align'] = 'center';
                div.style['background-color'] = 'rgba(0, 0, 0, 0.8)';
                div.style['opacity'] = '1';
                div.style['position'] = 'fixed';
                div.style['top'] = '0';
                div.style['left'] = '0';
                div.style['width'] = '100%';
                div.style['height'] = '100%';
                div.style['z-index'] = '100000';

                div.appendChild(self.toolbar.dom());
                div.appendChild(self.loading.dom());

                let img = util.htmlToDom('<div data-x="0" data-y="0" style="transform: translate3d(0px, 0px, 0px);" class="image_wrapper"><img data-src="' + self.findImageUrl() + '" class="image" data-scale="1" style="transform: scale3d(1, 1, 1);"></div>');

                // img.addEventListener('dblclick', (e) => {
                //     if (this.img().getAttribute('data-scale') > 1) {
                //         self.zoomOut();
                //     } else {
                //         let pageX = e.pageX;
                //         let pageY = e.pageY;

                //         let overlayWidth = util.windowWidth();
                //         let overlayHeight = util.windowHeight() - 44;

                //         let x = (overlayWidth / 2 - pageX);
                //         let y = (overlayHeight / 2 - pageY);

                //         let imageWrapper = this.dom().querySelector('.image_wrapper');;
                //         imageWrapper.setAttribute('data-x', x);
                //         imageWrapper.setAttribute('data-y', y);
                //         imageWrapper.style.transform = 'translate3d(' + x + 'px ,' + y + 'px , 0px)'
 
                //         self.zoomUp();
                //     }
                // })
                div.appendChild(img);

                this.instance = div;
            }
            return this.instance;
        },
        img() {
            return this.dom().querySelector('img');
        },
        destroy() {
            var element = this.dom();
            if (element || (element = document.getElementById(this.id))) {
                util.removeElement(element);
                this.instance = null;
            }
        },
        isExist() {
            return !!document.getElementById(this.id);
        }

    }

    this.loading = {
        instance: null,
        dom() {
            if (!this.instance) {
                let div = document.createElement('div');
                div.className = 'loading';
                div.style.display = 'none';

                this.instance = div;
            }

            return this.instance;
        },
        show() {
            this.dom().style.display = 'block';
        },
        hide() {
            this.dom().style.display = 'none';
        }
    }

    this.toolbar = {
        instance: null,
        buttons: {
            close: null,
            download: null,
            zoomUp: null,
            zoomOut: null
        },
        dom() {
            if (!this.instance) {
                let div = document.createElement('div');
                div.className = 'toolbar';

                this.buttons.close = util.htmlToDom('<a href="javascript: void(0);"><i style="float: right" class="fa fa-times fa-2x" aria-hidden="true"></i></a>');
                this.buttons.download = util.htmlToDom('<a style="display: none;" class="download" onclick="event.stopPropagation();" target="_blank" href="' + self.options.downloadUrl + '" download><i style="float: right" class="fa fa-download fa-2x" aria-hidden="true"></i></a>');
                this.buttons.zoomUp = util.htmlToDom('<a style="display: none;" href="javascript: void(0);" class="zoomUp"><i style="float: right" class="fa fa-search-plus fa-2x" aria-hidden="true"></i></a>')
                this.buttons.zoomOut = util.htmlToDom('<a style="display: none;" href="javascript: void(0);" class="zoomOut disabled"><i style="float: right" class="fa fa-search-minus fa-2x" aria-hidden="true"></i></a>')
                div.appendChild(this.buttons.close);
                div.appendChild(this.buttons.download);
                div.appendChild(this.buttons.zoomUp);
                div.appendChild(this.buttons.zoomOut);

                this.buttons.close.addEventListener('click', () => {
                    self.close();
                });
                this.buttons.zoomUp.addEventListener('click', () => {
                    self.zoomUp();
                });
                this.buttons.zoomOut.addEventListener('click', () => {
                    self.zoomOut();
                });
                this.instance = div;
            }

            return this.instance;
        }
    }

    this.movement = {
        x: 0,
        y: 0,
        run() {
            let startPointX, startPointY, wrapperX, wrapperY;
            let imageWrapper = self.overlay.dom().querySelector('.image_wrapper');

            imageWrapper.addEventListener('dragend', (e) => {
                imageWrapper.setAttribute('data-x', this.x);
                imageWrapper.setAttribute('data-y', this.y);

                this.resetPosition();
            }, false);

            imageWrapper.addEventListener('dragstart', (e) => {
                startPointX = e.pageX;
                startPointY = e.pageY;
                wrapperX = imageWrapper.getAttribute('data-x');
                wrapperY = imageWrapper.getAttribute('data-y');
            }, false);

            imageWrapper.addEventListener('drag', (e) => {
                if (e.pageX !== 0 && e.pageY !== 0) {
                    var movementX = e.pageX - startPointX;
                    var movementY = e.pageY - startPointY;

                    this.x = parseInt(wrapperX) + movementX;
                    this.y = parseInt(wrapperY) + movementY;
                    imageWrapper.style.transform = 'translate3d(' + this.x + 'px ,' + this.y + 'px , 0px)'
                }
            }, false);
        },
        resetPosition() {
            const overlayImg = self.overlay.img();
            
            let imgOriginalWidth = overlayImg.clientWidth;
            let imgOriginalHeight = overlayImg.clientHeight;

            const imageWrapper = self.overlay.dom().querySelector('.image_wrapper');
            const scale = parseInt(overlayImg.getAttribute('data-scale'));
            
            let maxMovementX, minMovementX, maxMovementY, minMovementY;

            if (scale === 1) {
                maxMovementX = minMovementX = maxMovementY = minMovementY = 0;
            } else if (scale > 1) {
                const windowWidth = util.windowWidth();
                const windowHeight = util.windowHeight() - 44;

                if (imgOriginalWidth * scale > windowWidth) {
                    maxMovementX = (imgOriginalWidth * scale - windowWidth) / 2
                } else {
                    maxMovementX = imgOriginalWidth * Math.pow(2, scale - 3);
                }

                if (imgOriginalHeight * scale > windowHeight) {
                    maxMovementY = (imgOriginalHeight * scale - windowHeight) / 2
                } else {
                    maxMovementY = imgOriginalHeight * Math.pow(2, scale - 3);
                }

                minMovementX = -maxMovementX;
                minMovementY = -maxMovementY;
            }
            if (this.x > maxMovementX) {
                imageWrapper.setAttribute('data-x', maxMovementX);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/\(\d+/, '(' + maxMovementX);
            }
            if (this.x < minMovementX) {
                imageWrapper.setAttribute('data-x', minMovementX);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/\(\-\d+/, '(' + minMovementX);
            }
            if (this.y > maxMovementY) {
                imageWrapper.setAttribute('data-y', maxMovementY);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/(.+ )(\d+)(px\,.*)/, '$1' + maxMovementY + '$3');
            }

            if (this.y < minMovementY) {
                imageWrapper.setAttribute('data-y', minMovementY);
                imageWrapper.style.transform = imageWrapper.style.transform.replace(/(.+ )(\-\d+)(px\,.*)/, '$1' + minMovementY + '$3');
            }
        }
    };

    this.init();
}

imageLightBox.prototype.init = function () {
    if (!this.options.downloadUrl) {
        let url;
        if (url = this.item.getAttribute('data-download')) {
            this.options.downloadUrl = url;
        }
    }

    this.item.addEventListener('click', () => {
        this.show();
    });

    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27) {
            if (this.overlay.isExist()) {
                this.close();
            }
        }
    });

}

imageLightBox.prototype.zoomUp = function () {
    const img = this.overlay.img();
    let scale = parseInt(img.getAttribute('data-scale'));
    scale++;
    img.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
    img.setAttribute('data-scale', scale);

    util.removeClass(this.toolbar.buttons.zoomOut, 'disabled');
}

imageLightBox.prototype.zoomOut = function () {
    const img = this.overlay.img();
    let scale = parseInt(img.getAttribute('data-scale'));
    if (scale > 1) {
        scale--;
        img.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1)';
        img.setAttribute('data-scale', scale);
        this.movement.resetPosition();
    }

    if (scale == 1) {
        util.addClass(this.toolbar.buttons.zoomOut, 'disabled');
    }
}

imageLightBox.prototype.showOverlay = function () {
    let o;
    // overlay exist
    if (o = document.getElementById(this.overlay.id)) {
        o.style.display = 'block';
    } else {
        document.body.appendChild(this.overlay.dom());
        this.movement.run();
    }
}

imageLightBox.prototype.show = function () {
    // TODO before show
    this.showOverlay();

    if (!this.options.imageProcessing) {
        this.loadImage();
    } else {
        this.loading.show();
    }

    // TODO after show
}

imageLightBox.prototype.hideOverlay = function () {
    let element;
    if (element = document.getElementById(this.overlay.id)) {
        element.style.display = 'none';
    }
}

imageLightBox.prototype.close = function () {
    // TODO before close
    this.hideOverlay();
    if (!this.options.cache) {
        this.overlay.destroy();
    }
    // TODO after close
}

imageLightBox.prototype.findImageUrl = function () {
    let url;
    if (url = this.item.getAttribute('data-img')) {
        return url;
    } else {
        return this.item.getAttribute('src');
    }
}

imageLightBox.prototype.loadImage = function () {
    let img = this.overlay.img();
    img.setAttribute('src', img.getAttribute('data-src'));
    this.loading.show();

    img.onload = () => {
        this.toolbar.buttons.zoomOut.style.display = 'inline';
        this.toolbar.buttons.zoomUp.style.display = 'inline';        
        this.toolbar.buttons.download.style.display = 'inline';
        this.loading.hide();
    }
}

imageLightBox.prototype.imageProcessComplete = function (src, downloadUrl, callback) {
    this.options.imageProcessing = false;
    var img = this.overlay.img();
    img.setAttribute('data-src', src);
    this.overlay.dom().querySelector('a.download').setAttribute('href', downloadUrl);
    this.loadImage();

    if (callback) {
        callback();
    }
}

module.exports = imageLightBox;