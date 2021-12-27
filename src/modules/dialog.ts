import GameControl  from "./gameControl"
export default class Dialog {
  isVisable: boolean
  element: HTMLElement
  textEle: HTMLElement
  constructor() {
    this.isVisable = false
    this.element = document.querySelector('.dialog')!
    this.textEle = this.element.querySelector('div')!
    this.init()
  }

  init() {
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  handleClick() {
    console.log("点击");
    this.isOpen = false
    new GameControl()
  }


  set isOpen(value: boolean) {
    if(value) {
      this.element.style.display = 'block'
      this.isVisable = true
    } else {
      this.element.style.display = 'none'
      this.isVisable = false
    }
  }

  handleReset(text: string) {
    this.textEle.innerHTML = text
    this.isOpen = true
  }


}