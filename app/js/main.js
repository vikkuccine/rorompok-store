class Tabs {
  constructor(selector) {
    this.selector = selector;
    this.catalogList = document.querySelector('.catalog-list')
    this.initTabs();
  }

  initTabs() {
    if (document.querySelector(this.selector)) {
      var mixer = mixitup(this.selector, {
        load: {
          filter: '.meja'
        },
        callbacks: {
          onMixEnd: (state) => {
            var activeContainer = state.activeFilter.selector;

            this.catalogList.querySelectorAll('.catalog-list__tab').forEach(function (item) {
              item.classList.remove('active-container');
            });

            this.catalogList.querySelectorAll(activeContainer).forEach(function (item) {
              item.classList.add('active-container');
            });
          }
        }
      })
    }
  }
}


class DotsToggle {
  constructor(dotsItem, img, imgContainer, store) {
    this.dotsItem = document.querySelectorAll(dotsItem);
    this.img = img;
    this.imgContainer = imgContainer;
    this.store = store;
    this.initEventListener();
  }

  initEventListener() {
    this.dotsItem.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const eventTarget = event.target
        this.changeDot(eventTarget)
        this.changeImg(eventTarget)
        this.changeId(eventTarget)
        let currentBtn = event.target.closest('.catalog-list__item').querySelector('.catalog-list__btn')
        const findId = event.target.closest('.catalog-list__item').getAttribute('data-id')
        if (this.store.cartList.some((item) => item.id === findId)) {
          currentBtn.innerText = 'To cart'
        } else {
          currentBtn.innerText = 'Buy'
        }
      })
    })
  }

  changeDot(eventTarget) {
    const activeDot = eventTarget.parentElement.querySelector('.dots__item--active')
    activeDot.classList.remove('dots__item--active')
    eventTarget.classList.add('dots__item--active')
  }

  changeImg(eventTarget) {
    const currentImg = eventTarget.closest(this.imgContainer).querySelector(this.img)
    const currentMicroPhoto = currentImg.getAttribute('src')

    const newPhoto = eventTarget.dataset.img
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
  constructor(store) {
    this.hideCartBtn = document.querySelectorAll('.popup__close')
    this.popup = document.querySelector('.popup')
    this.openCartBtn = document.querySelectorAll('.catalog-list__btn')
    this.catalogListItem = document.querySelectorAll('.catalog-list__item')
    this.getPopupPrice = document.querySelector('.popup__price')
    this.popupItem = document.querySelector('.popup__content-item')
    this.body = document.querySelector('body')
    this.iconCart = document.querySelectorAll('.header__cart')
    this.popupWithEmptyCart = document.querySelector('.popup-default')
    this.popupOkBtn = document.querySelectorAll('.popup__ok')
    this.popupSubmit = document.querySelector('.popup__submit')
    this.store = store;
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
    this.popupOkBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const currentPopup = event.target.closest('.popup')
        this.toggleCart(currentPopup)
      })
    })
    this.popupSubmit.addEventListener('submit', (event) => {
      const currentPopup = event.target.closest('.popup')
      this.toggleCart(currentPopup)
    } )
  }


  openCard() {
    this.openCartBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const findId = event.target.closest('.catalog-list__item').getAttribute('data-id')
        if (this.store.cartList.some((item) => item.id === findId)) {
          this.toggleCart(this.popup)

        } else {
          this.toggleCart(this.popup)
          this.addItemToCart(event)
          event.target.innerText = 'To cart'
          this.updateCart()
        }
      })

    })
  }


  onClickIconCart() {
    this.iconCart.forEach((icon) => {
      icon.addEventListener('click', (event) => {
        if (this.store.cartList.length === 0) {
          this.toggleCart(this.popupWithEmptyCart)
        } else {
          this.toggleCart(this.popup)
        }
      })
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

    this.store.cartList.push(itemObj)

  }


  addItemToCart(event) {
    const selectPrice = event.target.closest('.catalog-list__item').getAttribute('data-price');
    const selectImg = event.target.closest('.catalog-list__item').querySelector('.catalog-list__img').getAttribute('src')
    const selectTitle = event.target.closest('.catalog-list__item').querySelector('.catalog-list__price-title').innerHTML
    const selectDataId = event.target.closest('.catalog-list__item').getAttribute('data-id')


    const itemWrapper = document.querySelector('.popup__item-wraper')
    const newItem = document.createElement('div')
    newItem.innerHTML = this.getCartItemTemplate(selectImg, selectTitle, selectPrice, selectDataId)
    itemWrapper.append(newItem)

    const deleteIcon = newItem.querySelector('.popup__icon-delete')

    this.deleteItemListener(deleteIcon, newItem, selectDataId)
    this.showDeleteIcon(newItem, deleteIcon)

    const quantityLessBtn = newItem.querySelector('.popup__less-btn')
    const quantityMoreBtn = newItem.querySelector('.popup__more-btn')
    this.quantityLessListener(quantityLessBtn)
    this.quantityMoreListener(quantityMoreBtn)
    this.iconCart.forEach((item) => {
      item.classList.add('header__cart--chekout')
    })

    this.addItemToCartList(selectImg, selectTitle, selectPrice, selectDataId)
  }

  getCartItemTemplate(img, title, price, id) {
    return `
    <div class="popup__content-item" data-price="${price}" data-id="${id}">
      <div class="popup__text-block">
        <a class="popup__icon-delete">
           <img class="popup__del-img" src="./images/delete.svg" alt="">
        </a>
        <div class="popup__photo">
            <img class="popup__img" src="${img}" alt="">
        </div>
        <div class="popup__title">${title}</div>
      </div>
      <div class="popup__buttons">
        <button type="button" class="popup__less-btn">-</button>
        <div class="popup__number">1</div>
        <button type="button" class="popup__more-btn">+</button>
      </div>
      <div class="popup__price">${this.getFormattedPrice(price)}</div>
    </div>
    `
  }

  countTotal() {
    const total = document.querySelector('.popup__total-text')
    let sum = 0;
    this.store.cartList.forEach((item) => {
      sum = sum + (item.price * item.quantity)
      total.innerHTML = this.getFormattedPrice(sum)
    })
  }


  setCartListToForm() {
    const hiddenInput = document.querySelector('.popup__cart-list-data')
    hiddenInput.value = JSON.stringify(this.store.cartList)
  }

  updateCart() {
    this.countTotal()
    this.setCartListToForm()
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
    const currentItem = event.target.closest('.popup__content-item').parentElement
    let newQuantity = +quantity.innerHTML + step;

    if (newQuantity === 0) {
      const confirmDeleteCart = confirm('Do you realy want to clear your cart?')
      if (confirmDeleteCart) {

        this.deleteItem(currentItem, selectDataId)
      }

    } else {
      quantity.innerHTML = newQuantity
      const currentItem = this.store.cartList.find((item) => item.id === selectDataId);
      currentItem.quantity = newQuantity;
      getPopupPrice.innerHTML = this.getFormattedPrice(currentPrice * newQuantity)
      this.updateCart()
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

  showDeleteIcon(item, deleteIcon) {
    item.addEventListener('mouseover', (event) => {
      deleteIcon.style.opacity = 1
    })

    item.addEventListener('mouseout', (event) => {
      deleteIcon.style.opacity = 0
    })
  }


  deleteItemListener(deleteIcon, item, id) {
    deleteIcon.addEventListener('click', (event) => {
      this.deleteItem(item, id)
    })
  }

  deleteItem(item, id) {
    item.remove()
    const catalogItem = document.querySelector(`.catalog-list__item[data-id="${id}"] .catalog-list__btn`)
    catalogItem.innerText = 'Buy'
    this.store.cartList = this.store.cartList.filter((item) => item.id !== id)
    if (this.store.cartList.length === 0) {
      this.toggleCart(this.popup)
      this.iconCart.forEach((icon) => {
        icon.classList.remove('header__cart--chekout')
      })

    }
    this.updateCart()
  }
}


class BurgerMenu {
  constructor() {
    this.menuBtn = document.querySelector('.burger-menu');
    this.menu = document.querySelector('.menu');
    this.body = document.querySelector('body')
    this.openBurgerMenu()
  }

  openBurgerMenu() {
    this.menuBtn.addEventListener('click', () => {
      this.menuBtn.classList.toggle('burger-menu--open');

      this.menu.classList.toggle('menu--open');
      this.body.classList.toggle('overflow-hidden');
    })
  }
}

class MenuBtn {
  constructor() {
    this.catalogList = document.querySelector('.catalog-list')
    this.catalogBtn = document.querySelector('.catalog__btn')
    this.toggleBtn()
  }

  toggleBtn() {
    this.catalogBtn.addEventListener('click', () => {
      this.catalogBtn.innerHTML = this.catalogList.classList.contains('expanded') ? 'View More' : 'View Less';

      if (this.catalogList.classList.contains('expanded')) {
        this.catalogList.style.maxHeight = '840px';
        this.catalogList.classList.remove('expanded');
        document.querySelectorAll('.active-container .catalog-list__item')[2].scrollIntoView({ behavior: "smooth" })

      } else {
        this.catalogList.style.maxHeight = '3000px';
        this.catalogList.classList.add('expanded');
      }
    })
  }
}

class URLParamsHandler {
  constructor() {
    this.queryString = window.location.search;
    this.urlParams = new URLSearchParams(this.queryString)
    this.popupSuccess = document.querySelector('.popup-success')
    this.body = document.querySelector('body')
    this.handleMailSuccess()
  }

  togglePopup(currentPopup) {
    currentPopup.classList.toggle('popup__active')
    this.body.classList.toggle('overflow-hidden')
  }

  handleMailSuccess() {
    if (this.urlParams.get('mailSuccess')) {
      this.togglePopup(this.popupSuccess)
      history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

const store = { cartList: [] }

const tabs = new Tabs('.catalog-list');
const microDots = new DotsToggle('.micro-card .dots__item', '.micro-card__img', '.micro-card');
const catalogDots = new DotsToggle('.catalog-list .dots__item', '.catalog-list__img', '.catalog-list__item', store);
const cart = new Cart(store);
const burgerMenu = new BurgerMenu();
const menuBtn = new MenuBtn();
const urlParamsHandler = new URLParamsHandler();


























