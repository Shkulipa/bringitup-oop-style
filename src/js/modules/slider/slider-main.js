import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns, prevSelectorBtn, nextSelectorBtn) {
        super(btns, prevSelectorBtn, nextSelectorBtn);
    }

    showSlides(n) {
        if(n > this.slides.length) {
            this.slideIndex = 1;
        };

        if(n < 1) {
            this.slideIndex = this.slides.length;
        };

        try {
            this.hanson.style.opacity = '0';

            if(n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3e3);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) {};
        
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    };

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    };

    switchSlide(btnSelector, directionSlider) {
        document.querySelectorAll(btnSelector).forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(directionSlider);
            });
        });
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.switchSlide('.nextmodule', 1);
        this.switchSlide('.prevmodule', -1);
    };

    render() {
        if(this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {
                console.log(e);
            };
    
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    };
}