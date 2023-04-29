const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

export const deck = {
  cards: [],
  drawCard() {
    return this.cards.shift();
  },
  shuffle() {
    const shuffledCards = [];
    const cards = [...this.cards];
    while (cards.length > 0) {
      const index = Math.floor(Math.random() * cards.length);
      const card = cards.splice(index, 1)[0];
      shuffledCards.push(card);
    }
    this.cards = shuffledCards;
  },
  reset() {
    this.cards = [];
    for (let suit of SUITS) {
      for (let rank of RANKS) {
        this.cards.push({ suit, rank });
      }
    }
    this.shuffle();
  },
};

deck.reset();
