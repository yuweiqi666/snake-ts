import Food from './food'

import Score from './score'


export default class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement
  direction: string
  food: Food
  score: Score
  lived: boolean
  constructor() {
    this.food = new Food()
    this.score = new Score()
    this.element = document.querySelector('.snake')!
    this.head = document.querySelector('.snake>div')!
    this.bodies = this.element.getElementsByTagName('div')
    // 蛇的状态（死亡/存活）
    this.lived = true

    // 蛇的移動方向
    this.direction = 'ArrowRight'

    // 讓蛇開始移動
    setTimeout(this.move.bind(this), 300)

  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  } 
  // 獲取蛇的移動方向
  get snakeDirect() {
    return this.direction
  }

  set X(value: number) {
    // 水平方向蛇撞墙的情况
    this.isHitWall(value)    
    // 蛇进行X反方向的移动
    if(this.bodies[1] && (value === (this.bodies[1] as HTMLElement).offsetLeft)) {      
      if(value > this.X) {
        // 向右反方向移动
        value -= 20
      }else if(value < this.X) {
        // 向左反方向移动
        value += 20
      }
    }
    
    this.moveBodies()

    this.head.style.left = value + 'px'

    this.check()
  }

  set Y(value: number) {
    // 水平方向蛇撞墙的情况
    this.isHitWall(value)

    // 蛇进行Y反方向的移动
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      
      // 向右反方向移动
      if(value > this.Y) {
        value -= 20
      }else if(value < this.Y) {
        value += 20
      }
    }

    this.moveBodies()

    this.head.style.top = value + 'px'

    this.check()
  }
  // 改變蛇的移動方向
  set snakeDirect(value: string) {
    this.direction = value
  }

  // 蛇的移動
  move() {    
    this.isEatFood()

    try { 
      switch (this.snakeDirect) {
        case 'ArrowUp':
        case 'up':
        case 'w':
          this.Y -= 10 
          break;
        case 'ArrowDown':
        case 'down':
        case 's':
          this.Y += 10
          break;
        case 'ArrowLeft':
        case 'left':
        case 'a':
          this.X -= 10
          break;
        case 'ArrowRight':
        case 'right':
        case 'd':
          this.X += 10
          break
        default:
          break;
      }
    } catch(error) {
      alert((error as any).message + ' Game Over');
      this.lived = false
    }

    this.lived && setTimeout(this.move.bind(this), 300 - (this.score.level) * 30)

  }

  // 蛇身體長度增加
  addBody() {
    this.element.insertAdjacentHTML('beforeend', `<div></div>`)

  }

  // 判断蛇有没有吃到食物
  isEatFood() {
    if(this.X === this.food.X && this.Y === this.food.Y) {
      // 增加蛇的身体
      this.addBody()
      // 改变食物的位置
      this.food.change()
      // 增加分数
      this.score.addScore()
    }
  }

  // 判断蛇是否撞墙
  isHitWall(value: number) {
    if (value < 0 || value > 290) throw new Error('蛇撞墙了')
  }

  // 控制蛇的身体移动
  moveBodies() {
    for(let i = this.bodies.length -1; i > 0; i--) {
      (this.bodies[i] as HTMLElement).style.left = (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px';
      (this.bodies[i] as HTMLElement).style.top = (this.bodies[i - 1] as HTMLElement).offsetTop + 'px';
    }
  }

  // 判断是否撞到自己
  check() {
    for(let i = this.bodies.length - 1; i > 0; i-- ) {
      if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
        throw new Error('撞到自己了')
      }
    }
  }

}

