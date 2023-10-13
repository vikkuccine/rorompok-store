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




const hideCartBtn = document.querySelector('.popup__close')
const popup = document.querySelector('.popup')
const openCartBtn = document.querySelectorAll('.catalog-list__btn')
const catalogListItem = document.querySelectorAll('.catalog-list__item')
const getPopupPrice = document.querySelector('.popup__price')
const popupItem = document.querySelector('.popup__content-item')
let price = 0


hideCartBtn.addEventListener('click', () => {
  popup.classList.toggle('popup__active')
})

openCartBtn.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    popup.classList.toggle('popup__active')
    const popupActive = document.querySelector('.popup__active')
  })
})

openCartBtn.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const selectPrice = event.target.closest('.catalog-list__item').getAttribute('data-price');
    getPopupPrice.innerHTML = getFormattedPrice(selectPrice);
    popupItem.setAttribute('data-price', selectPrice)
    price = selectPrice;
  })
})



const quantity = document.querySelector('.popup__number')
const quantityLessBtn = document.querySelector('.popup__less-btn')
const quantityMoreBtn = document.querySelector('.popup__more-btn')



quantityLessBtn.addEventListener('click', (event) => {
  const minPrice = event.target.closest('.popup__content-item').getAttribute('data-price');
  price = +price - +minPrice;
  let newQuantity = +quantity.innerHTML - +1;

  if (newQuantity === 0) {
    const confirmDeleteCart = confirm('Do you realy want to clear your cart?')
    if (confirmDeleteCart) {
      popup.classList.toggle('popup__active');
    }

  } else {
    quantity.innerHTML = newQuantity
    getPopupPrice.innerHTML = getFormattedPrice(price)
  }

})

quantityMoreBtn.addEventListener('click', (event) => {
  const currentPrice = event.target.closest('.popup__content-item').getAttribute('data-price');
  price = +price + +currentPrice;
  quantity.innerHTML = +quantity.innerHTML + +1;
  getPopupPrice.innerHTML = getFormattedPrice(price)
})

function getFormattedPrice(price) {
  let formattedPrice = price.toString()

  if (formattedPrice.length === 6) {
    formattedPrice = formattedPrice.slice(0, 3) + ',' + formattedPrice.slice(3)
  } else if (formattedPrice.length === 7) {
    formattedPrice = formattedPrice.slice(0, 1) + ',' + formattedPrice.slice(1)
    formattedPrice = formattedPrice.slice(0, 5) + ',' + formattedPrice.slice(5)
  } else if (formattedPrice.length === 8) {
    formattedPrice = formattedPrice.slice(0, 2) + ',' + formattedPrice.slice(2)
    formattedPrice = formattedPrice.slice(0, 6) + ',' + formattedPrice.slice(6)
  }
  return formattedPrice
}




