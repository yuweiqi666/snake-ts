import Snake from './snake'

export default class GameControl {
  snake: Snake
  constructor() {
    this.snake = new Snake()
    this.init()
  }

  init() {
    // 綁定鍵盤事件
    document.addEventListener('keydown', this.keyDownHandler.bind(this))    
  }

  keyDownHandler(event: KeyboardEvent) {
    this.snake.snakeDirect = event.key
  }

}