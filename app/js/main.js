
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



const dotsBtn = document.querySelectorAll('.dots__item')

dotsBtn.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const activeDot = event.target.parentElement.querySelector('.dots__item--active')
    activeDot.classList.remove('dots__item--active')
    event.target.classList.add('dots__item--active')
  })

})


