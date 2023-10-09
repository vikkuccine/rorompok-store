class Tabs {
  constructor(selector) {
    this.selector = selector;
    this.initTabs();
  }

  initTabs() {
    if (document.querySelector(this.selector)) {
      var mixer = mixitup(this.selector, {
        load: {
          filter: '.meja'
        }
      })
    }
  }
}


const tabs = new Tabs('.catalog-list');



class DotsToggle {
  constructor(dotsItem, img, imgContainer) {
    this.dotsItem = document.querySelectorAll(dotsItem);
    this.img = img;
    this.imgContainer = imgContainer;
    this.initEventListener();
  }

  initEventListener() {
    this.dotsItem.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        console.log(event.target.parentElement.parentElement);
        const eventTarget = event.target
        this.changeDot(eventTarget)
        this.changeImg(eventTarget)
      })

    })
  }

  changeDot(eventTarget) {
    const activeDot = eventTarget.parentElement.querySelector('.dots__item--active')
    activeDot.classList.remove('dots__item--active')
    eventTarget.classList.add('dots__item--active')
  }

  changeImg(eventTarget) {
    console.log('eventTarget.closest(this.imgContainer)', eventTarget.closest(this.imgContainer));
    const currentImg = eventTarget.closest(this.imgContainer).querySelector(this.img);
    const currentMicroPhoto = currentImg.getAttribute('src')
    // const findImg = eventTarget.parentElement
    
    const newPhoto = eventTarget.dataset.img;
    if (currentMicroPhoto !== newPhoto) {
      currentImg.setAttribute('src', newPhoto)
    }

  }
}

const microDots = new DotsToggle('.micro-card .dots__item', '.micro-card__img', '.micro-card');

const catalogDots = new DotsToggle('.catalog-list .dots__item', '.catalog-list__img', '.catalog-list__item');


