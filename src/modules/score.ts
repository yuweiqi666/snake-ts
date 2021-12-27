export default class Score {
  score = 0
  level = 1
  maxLevel: number
  upScore: number
  scoreEle: HTMLElement
  levelEle: HTMLElement
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.querySelector('.score-num-text')!
    this.levelEle = document.querySelector('.score-level-text')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }
  // 增加分數的方法
  addScore() {
    // 分數加一
    this.scoreEle.innerHTML = ++this.score + '';
    (this.score % this.upScore === 0) && this.levelUp()
  }
  // 提升等級的方法
  levelUp() {
    this.level < this.maxLevel && (this.levelEle.innerHTML = ++this.level + '')
  }
}


