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




const hideCartBtn = document.querySelectorAll('.popup__close')
const popup = document.querySelector('.popup')
const openCartBtn = document.querySelectorAll('.catalog-list__btn')
const catalogListItem = document.querySelectorAll('.catalog-list__item')
const getPopupPrice = document.querySelector('.popup__price')
const popupItem = document.querySelector('.popup__content-item')
const body = document.querySelector('body')

hideCartBtn.forEach((close) => {
  close.addEventListener('click', (event) => {
    const currentPopup = event.target.closest('.popup')
      toggleCart(currentPopup)
  })
})


openCartBtn.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    toggleCart(popup)
    addItemToCart(event)
    addToCartFlag = true;
  })
})

function toggleCart(currentPopup) {
  currentPopup.classList.toggle('popup__active')
  body.classList.toggle('overflow-hidden')
}

function addItemToCart(event) {
  const selectPrice = event.target.closest('.catalog-list__item').getAttribute('data-price');
  const selectImg = event.target.closest('.catalog-list__item').querySelector('.catalog-list__img').getAttribute('src')
  const selectTitle = event.target.closest('.catalog-list__item').querySelector('.catalog-list__price-title').innerHTML


  const itemWrapper = document.querySelector('.popup__item-wraper')
  const newItem = document.createElement('div')
  newItem.innerHTML = getCartItemTemplate(selectImg, selectTitle, selectPrice)
  itemWrapper.append(newItem)
  const quantityLessBtn = newItem.querySelector('.popup__less-btn')
  const quantityMoreBtn = newItem.querySelector('.popup__more-btn')
  quantityLessListener(quantityLessBtn)
  quantityMoreListener(quantityMoreBtn)
}


function quantityLessListener(quantityLessBtn) {
  quantityLessBtn.addEventListener('click', (event) => {
    const currentPrice = event.target.closest('.popup__content-item').getAttribute('data-price');
    const getPopupPrice = event.target.closest('.popup__content-item').querySelector('.popup__price')
    const quantity = event.target.closest('.popup__content-item').querySelector('.popup__number')
    let newQuantity = +quantity.innerHTML - +1;

    if (newQuantity === 0) {
      const confirmDeleteCart = confirm('Do you realy want to clear your cart?')
      if (confirmDeleteCart) {
        popup.classList.toggle('popup__active');
      }

    } else {
      quantity.innerHTML = newQuantity
      getPopupPrice.innerHTML = getFormattedPrice(currentPrice * newQuantity)
    }

  })
}


function quantityMoreListener(quantityMoreBtn) {
  quantityMoreBtn.addEventListener('click', (event) => {
    const currentPrice = event.target.closest('.popup__content-item').getAttribute('data-price');
    const getPopupPrice = event.target.closest('.popup__content-item').querySelector('.popup__price')
    const quantity = event.target.closest('.popup__content-item').querySelector('.popup__number')
    let newQuantity = +quantity.innerHTML + +1;
    quantity.innerHTML = newQuantity
    getPopupPrice.innerHTML = getFormattedPrice(currentPrice * newQuantity)
  })
}


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


function getCartItemTemplate(img, title, price) {
  return `
  <div class="popup__content-item" data-price="${price}">
    <div class="popup__text-block">
      <div class="popup__photo">
          <img class="popup__img" src="${img}" alt="">
      </div>
      <div class="popup__title">${title}</div>
    </div>
    <div class="popup__buttons">
      <button class="popup__less-btn">-</button>
      <div class="popup__number">1</div>
      <button class="popup__more-btn">+</button>
    </div>
    <div class="popup__price">${getFormattedPrice(price)}</div>
  </div>
  `
}

const iconCart = document.querySelector('.header__cart')
const popupWithEmptyCart = document.querySelector('.popup-default')
let addToCartFlag = false;



  iconCart.addEventListener('click', (event) => {
    if (addToCartFlag === false) {
      toggleCart(popupWithEmptyCart)
    } else {
      toggleCart(popup)
    }
  })







