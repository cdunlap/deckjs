'use strict';

/**
 * A single card
 * @param       {Number} number The number within the suit
 * @param       {String} suit   The suit of the card, see the constants on this class
 * @constructor
 */
function Card(number, suit) {
  if (number === undefined && suit === undefined) {
    number = 0;
    suit = null;
  } else {
    if (number < 1 || number > 13) {
      throw new RangeError('Card number out of range');
    }

    if (suit !== undefined) {
      var suits = [Card.SUIT_SPADE, Card.SUIT_CLUB, Card.SUIT_HEART, Card.SUIT_DIAMOND];
      if (suits.indexOf(suit) === -1) {
        throw new Error('Card suit invalid');
      }
    }
  }

  this.number = number;
  this.suit = suit;
}

/**
 * The string representation of the card plus the suit
 * @return {String} The string representation of the card plus the suit
 */
Card.prototype.toString = function () {
  switch (this.number) {
    case 0: return 'JOKER';
    case 1: return 'A' + this.suit;
    case 11: return 'J' + this.suit;
    case 12: return 'Q' + this.suit;
    case 13: return 'K' + this.suit;
    default: return this.number + this.suit;
  }
};

/**
 * The spade card suit
 * @type {String}
 */
Card.SUIT_SPADE = '♠';
/**
 * The club card suit
 * @type {String}
 */
Card.SUIT_CLUB = '♣';
/**
 * The heart card suit
 * @type {String}
 */
Card.SUIT_HEART = '♥';
/**
 * The diamond card suit
 * @type {String}
 */
Card.SUIT_DIAMOND = '♦';

/**
 * A deck of cards
 * @param       {Object} options The deck options
 * @constructor
 */
function Deck(options) {
  var self = this;
  options = options || {};
  this.options = {
    jokers: options.jokers || false
  };

  this.cards = [];

  // If we're using Jokers, put them in
  if (this.options.jokers) {
    for (var i = 0; i < 2; i++) {
      this.cards.push(new Card());
    }
  }

  // Lets put in the other cards
  var suits = [Card.SUIT_DIAMOND, Card.SUIT_HEART, Card.SUIT_CLUB, Card.SUIT_SPADE];
  suits.forEach(function (suit) {
    for (var i = 1; i <= 13; i++) {
      self.cards.push(new Card(i, suit));
    }
  });
}

/**
 * Shuffles the deck
 * @return {void} Shuffles the cards in the {Deck.cards} array using the Fisher-Yates algorithm
 */
Deck.prototype.shuffle = function () {
  var idx = this.cards.length;
  var rnd;
  var tmp;

  while (idx !== 0) {
    rnd = Math.floor(Math.random() * idx);
    idx -= 1;

    tmp = this.cards[idx];
    this.cards[idx] = this.cards[rnd];
    this.cards[rnd] = tmp;
  }
};

/**
 * Draws a {Card} from the top of the deck
 * @return {Card} The card drawn
 */
Deck.prototype.drawCard = function () {
  return this.cards.shift();
};

/**
 * Replaces a {Card} by putting it at the bottom of the deck
 * @param       {Card} card The card to replace
 * @return {Number} The new size of the deck
 */
Deck.prototype.replaceCard = function (card) {
  return this.cards.push(card);
};

module.exports = {
  Card: Card,
  Deck: Deck
};
