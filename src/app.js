import { deck, shuffle, deal, cardValues } from './utils/cards'
import {
  guessButton,
  newGameButton,
  guessInputs,
  guessImages,
  response,
} from './utils/DOM'
const cardImages = {
  clubs: require('./cards/clubs/cards.jpg'),
  diamonds: require('./cards/diamonds/cards.jpg'),
  hearts: require('./cards/hearts/cards.jpg'),
  spades: require('./cards/spades/cards.jpg'),
}

const play = () => {
  let deckInPlay = shuffle(deck)
  let cardsInPlay = deal(deckInPlay, 2)

  guessButton.addEventListener('click', e => {
    e.preventDefault()
    displayResults(processGuesses(guessInputs, cardsInPlay))
  })

  guessInputs.forEach(guess => {
    guess.addEventListener('keyup', e => {
      guess.value = guess.value.toUpperCase()
      if (cardValues.filter(value => value.symbol === guess.value).length > 0) {
        cardify(e.target, deckInPlay)
      }
    })
  })

  guessImages.forEach(image => {
    image.addEventListener('click', e => {
      const guessInputIdentifier = e.target.dataset.guessInput
      const guessInput = document.querySelector(`#${guessInputIdentifier}`)
      guessInput.value = ''
      e.target.style.display = 'none'
      guessInput.style.display = 'block'
      guessInput.focus()
      e.target.src = ''
    })
  })
}

const cardify = (guess, deckInPlay) => {
  console.log('guess', guess)
  const card = deckInPlay.filter(value => value.symbol === guess.value)[0]
  const imageReference = guess.dataset.guessImage
  const img = document.querySelector(`#${imageReference}`)
  const suit = card.suit.name
  const transform = card.transform
  const src = cardImages[suit]
  console.log(guess.value, transform, src, card)
  img.src = src
  img.style.transform = transform
  img.style.display = 'block'
  guess.style.display = 'none'
  //   return cardsInPlay
}

const processGuesses = (guessInputs, cardsInPlay) => {
  const guesses = [guessInputs[0].value, guessInputs[1].value]

  return checkGuesses(guesses, cardsInPlay)
}

const displayResults = results => {
  if (results.hits.length === 2) {
    response.textContent = 'You win!'
  } else if (results.hits.length === 1 && results.blows.length === 1) {
    response.textContent = 'You have one hit and one blow!'
  } else if (results.hits.length === 1) {
    response.textContent = 'You have one hit!'
  } else if (results.blows.length === 2) {
    response.textContent = 'You have two blows!'
  } else if (results.blows.length === 1) {
    response.textContent = 'You have one blow!'
  } else {
    response.textContent = 'You have no hits or blows!'
  }
}

const checkGuesses = (guesses, cardsInPlay) => {
  const hits = checkHits(guesses, cardsInPlay)
  const blows = checkBlows(guesses, cardsInPlay, hits)

  return { hits, blows }
}

const checkHits = (guesses, cardsInPlay) => {
  const hits = []
  guesses.forEach((guess, guessIdx) => {
    cardsInPlay.forEach((card, cardIdx) => {
      if (
        hits.filter(hit => hit.card === cardIdx || hit.guess === guessIdx)
          .length === 0
      ) {
        if (guess.toUpperCase() === card.symbol) {
          hits.push({ guess: guessIdx, card: cardIdx })
        }
      }
    })
  })
  return hits
}

const checkBlows = (guesses, cardsInPlay, hits) => {
  const blows = []
  guesses.forEach((guess, guessIdx) => {
    cardsInPlay.forEach((card, cardIdx) => {
      if (
        blows.filter(blow => blow.card === cardIdx || blow.guess === guessIdx)
          .length === 0 &&
        hits.filter(hit => hit.card === cardIdx || hit.guess === guessIdx)
          .length === 0
      ) {
        if (checkBlow(card, guess)) {
          blows.push({ guess: guessIdx, card: cardIdx })
        }
      }
    })
  })
  return blows
}

const checkBlow = (card, guess) => {
  const cardValue = parseInt(card.number)
  const guessValue = cardValues.filter(
    value => value.symbol === guess.toUpperCase()
  )[0].number
  console.log(cardValue, guessValue)
  return (
    (cardValue - 2 <= guessValue && cardValue + 2 >= guessValue) ||
    (cardValue === 1 && guessValue >= 12) ||
    (guessValue === 1 && cardValue >= 12)
  )
}

play()

newGameButton.addEventListener('click', e => {
  e.preventDefault()
  guessInputs.forEach(guess => (guess.value = ''))
  response.textContent = ''
  play()
})
