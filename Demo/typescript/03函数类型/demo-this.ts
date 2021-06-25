interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(): () => Card
}

let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  // this: void 就表示函数中的 this 是 void，因为显示地说明了，你就不能用 this.xxx，这样就避免了运行时的一些 bug。
  createCardPicker: function (this: Deck) {
    // this采用箭头函数方式可以采用父级作用域，而当前执行是没有作用域的
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log('card: ' + pickedCard.card + 'of' + pickedCard)