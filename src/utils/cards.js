export let deck = []
export const cardValues = [
  {
    number: 1,
    name: 'Ace',
    symbol: 'A',
    transform: 'translate(-0.97em, -0.85em)',
  },
  {
    number: 2,
    name: 'Two',
    symbol: '2',
    transform: 'translate(-10.825em, -0.85em)',
  },
  {
    number: 3,
    name: 'Three',
    symbol: '3',
    transform: 'translate(-20.68em, -0.85em)',
  },
  {
    number: 4,
    name: 'Four',
    symbol: '4',
    transform: 'translate(-30.535em, -0.85em)',
  },
  {
    number: 5,
    name: 'Five',
    symbol: '5',
    transform: 'translate(-40.39em, -0.85em)',
  },
  {
    number: 6,
    name: 'Six',
    symbol: '6',
    transform: 'translate(-50.245em, -.85em)',
  },
  {
    number: 7,
    name: 'Seven',
    symbol: '7',
    transform: 'translate(-60.1em, -0.85em)',
  },
  {
    number: 8,
    name: 'Eight',
    symbol: '8',
    transform: 'translate(-.97em, -14.5em)',
  },
  {
    number: 9,
    name: 'Nine',
    symbol: '9',
    transform: 'translate(-10.825em, -14.5em)',
  },
  {
    number: 10,
    name: 'Ten',
    symbol: '10',
    transform: 'translate(-20.68em, -14.5em)',
  },
  {
    number: 11,
    name: 'Jack',
    symbol: 'J',
    transform: 'translate(-30.535em, -14.5em)',
  },
  {
    number: 12,
    name: 'Queen',
    symbol: 'Q',
    transform: 'translate(-40.39em, -14.5em)',
  },
  {
    number: 13,
    name: 'King',
    symbol: 'K',
    transform: 'translate(-50.245em, -14.5em)',
  },
]

//   transform: translate(-10px, -14.5em);
/* transform: translate(-137px, -9px); */
/* transform: translate(-10px, -9px); */
const cardSuits = [
  { name: 'spades', symbol: '♠', color: 'black' },
  { name: 'hearts', symbol: '♥', color: 'red' },
  { name: 'diamonds', symbol: '♦', color: 'red' },
  { name: 'clubs', symbol: '♣', color: 'black' },
]

cardValues.forEach(value => {
  cardSuits.forEach(suit => {
    deck.push({ ...value, suit })
  })
})

export const shuffle = deck => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
  return deck
}

export const deal = (deck, numCards) => {
  let dealtCards = []
  for (let i = 0; i < numCards; i++) {
    dealtCards.push(deck.pop())
  }
  return dealtCards
}
