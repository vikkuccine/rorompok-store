
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