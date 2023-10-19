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


class DotsToggle {
  constructor(dotsItem, img, imgContainer, cartList) {
    this.dotsItem = document.querySelectorAll(dotsItem);
    this.img = img;
    this.imgContainer = imgContainer;
    this.cartList = cartList;
    this.initEventListener();
  }

  initEventListener() {
    this.dotsItem.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const eventTarget = event.target
        this.changeDot(eventTarget)
        this.changeImg(eventTarget)
        this.changeId(eventTarget)
      })
    })
  }

  changeDot(eventTarget) {
    const activeDot = eventTarget.parentElement.querySelector('.dots__item--active')
    activeDot.classList.remove('dots__item--active')
    eventTarget.classList.add('dots__item--active')
  }

  changeImg(eventTarget) {
    const currentImg = eventTarget.closest(this.imgContainer).querySelector(this.img);
    const currentMicroPhoto = currentImg.getAttribute('src')

    const newPhoto = eventTarget.dataset.img;
    if (currentMicroPhoto !== newPhoto) {
      currentImg.setAttribute('src', newPhoto)
    }
  }

  changeId(eventTarget) {
    const curentId = eventTarget.closest('.dots__item--active').getAttribute('data-id')
    eventTarget.closest(this.imgContainer).setAttribute('data-id', curentId)
  }
}


class Cart {
  constructor(cartList) {
    this.hideCartBtn = document.querySelectorAll('.popup__close')
    this.popup = document.querySelector('.popup')
    this.openCartBtn = document.querySelectorAll('.catalog-list__btn')
    this.catalogListItem = document.querySelectorAll('.catalog-list__item')
    this.getPopupPrice = document.querySelector('.popup__price')
    this.popupItem = document.querySelector('.popup__content-item')
    this.body = document.querySelector('body')
    this.iconCart = document.querySelector('.header__cart')
    this.popupWithEmptyCart = document.querySelector('.popup-default')
    this.addToCartFlag = false;
    this.cartList = cartList;
    this.initEventListener()
  }

  toggleCart(currentPopup) {
    currentPopup.classList.toggle('popup__active')
    this.body.classList.toggle('overflow-hidden')
  }


  initEventListener() {
    this.hideCard()
    this.openCard()
    this.onClickIconCart()
  }

  hideCard() {
    this.hideCartBtn.forEach((close) => {
      close.addEventListener('click', (event) => {
        const currentPopup = event.target.closest('.popup')
        this.toggleCart(currentPopup)
      })
    })
  }


  openCard() {
    this.openCartBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const findId = event.target.closest('.catalog-list__item').getAttribute('data-id')
        if (this.cartList.some((item) => item.id === findId)) {
          this.toggleCart(this.popup)
        } else {
          this.toggleCart(this.popup)
          this.addItemToCart(event)
          this.addToCartFlag = true;

        }
      })
    })
  }


  onClickIconCart() {
    this.iconCart.addEventListener('click', (event) => {
      if (this.addToCartFlag === false) {
        this.toggleCart(this.popupWithEmptyCart)
      } else {
        this.toggleCart(this.popup)
      }
    })
  }


  addItemToCartList(img, title, price, id) {
    const itemObj = {
      img: img,
      title: title,
      price: price,
      id: id,
      quantity: 1,
    }

    this.cartList.push(itemObj)
  }

  addItemToCart(event) {
    const selectPrice = event.target.closest('.catalog-list__item').getAttribute('data-price');
    const selectImg = event.target.closest('.catalog-list__item').querySelector('.catalog-list__img').getAttribute('src')
    const selectTitle = event.target.closest('.catalog-list__item').querySelector('.catalog-list__price-title').innerHTML
    const selectDataId = event.target.closest('.catalog-list__item').getAttribute('data-id')
    // const selectBtn = event.target.closest('.catalog-list__item').querySelector('.catalog-list__btn')

    const itemWrapper = document.querySelector('.popup__item-wraper')
    const newItem = document.createElement('div')
    newItem.innerHTML = this.getCartItemTemplate(selectImg, selectTitle, selectPrice, selectDataId)
    itemWrapper.append(newItem)
    console.log(itemWrapper);
    const quantityLessBtn = newItem.querySelector('.popup__less-btn')
    const quantityMoreBtn = newItem.querySelector('.popup__more-btn')
    this.quantityLessListener(quantityLessBtn)
    this.quantityMoreListener(quantityMoreBtn)
    this.iconCart.classList.add('header__cart--chekout')
    this.addItemToCartList(selectImg, selectTitle, selectPrice, selectDataId)
    // selectBtn.in
  }

  getCartItemTemplate(img, title, price, id) {
    return `
    <div class="popup__content-item" data-price="${price}" data-id="${id}">
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
      <div class="popup__price">${this.getFormattedPrice(price)}</div>
    </div>
    `
  }

  quantityLessListener(quantityLessBtn) {
    quantityLessBtn.addEventListener('click', (event) => {
      this.changeQuantity(event, -1)

    })
  }

  quantityMoreListener(quantityMoreBtn) {
    quantityMoreBtn.addEventListener('click', (event) => {
      this.changeQuantity(event, 1)
    })
  }

  changeQuantity(event, step) {
    const currentPrice = event.target.closest('.popup__content-item').getAttribute('data-price');
    const getPopupPrice = event.target.closest('.popup__content-item').querySelector('.popup__price')
    const quantity = event.target.closest('.popup__content-item').querySelector('.popup__number')
    const selectDataId = event.target.closest('.popup__content-item').getAttribute('data-id')
    let newQuantity = +quantity.innerHTML + step;

    if (newQuantity === 0) {
      const confirmDeleteCart = confirm('Do you realy want to clear your cart?')
      if (confirmDeleteCart) {
        this.toggleCart(this.popup)
        this.iconCart.classList.remove('header__cart--chekout')
      }

    } else {
      quantity.innerHTML = newQuantity
      const currentItem = this.cartList.find((item) => item.id === selectDataId);
      currentItem.quantity = newQuantity;
      console.log(this.cartList);
      getPopupPrice.innerHTML = this.getFormattedPrice(currentPrice * newQuantity)
    }

  }

  getFormattedPrice(price) {
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
}


const cartList = []

const tabs = new Tabs('.catalog-list');
const microDots = new DotsToggle('.micro-card .dots__item', '.micro-card__img', '.micro-card');
const catalogDots = new DotsToggle('.catalog-list .dots__item', '.catalog-list__img', '.catalog-list__item', cartList);
const cart = new Cart(cartList)

























