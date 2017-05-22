const assert = require('assert');
const deckjs = require('../index.js');

describe('deckjs', function () {
  describe('Card', function () {
    it('Creates a Joker', function () {
      var card = new deckjs.Card();
      assert(card.toString() === 'JOKER', 'Card should be the JOKER');
      assert(card.number === 0, 'Card number should be 0');
      assert(card.suit === null, 'Card suit should be undefined');
    });

    it('Creates a suited card', function () {
      var card = new deckjs.Card(1, deckjs.Card.SUIT_HEART); // Ace of hearts
      assert(card.number === 1, 'Card number should be 1 (Ace)');
      assert(card.suit === deckjs.Card.SUIT_HEART, 'Card should be Hearts');
    });
  });

  describe('Deck', function () {
    it('Creates a deck without jokers', function () {
      var deck = new deckjs.Deck();
      assert(deck.cards.length === 52, 'Deck should contain 52 cards');
    });

    it('Creates a deck with jokers', function () {
      var deck = new deckjs.Deck({jokers: true});
      assert(deck.cards.length === 54, 'Deck should be 54 cards');
      assert(deck.cards[0].toString() === 'JOKER', 'First card in deck should be a Joker');
      assert(deck.cards[1].toString() === 'JOKER', 'Second card in the deck should be a Joker');
    });
  });
});
