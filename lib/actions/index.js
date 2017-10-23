'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//Actions to interact with the bot
var feed = exports.feed = function feed() {
  return {
    type: 'FEED'
  };
};

var water = exports.water = function water() {
  return {
    type: 'WATER'
  };
};

var feelPain = exports.feelPain = function feelPain() {
  return {
    type: 'FEEL_PAIN'
  };
};

var feelJoy = exports.feelJoy = function feelJoy() {
  return {
    type: 'FEEL_JOY'
  };
};

var idle = exports.idle = function idle() {
  return {
    type: 'IDLE'
  };
};

var changeDifficulty = exports.changeDifficulty = function changeDifficulty(difficulty) {
  return {
    type: 'CHANGE_DIFFICULTY',
    difficulty: difficulty
  };
};