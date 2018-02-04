/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Furry = function() {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}
//moneta pojawia się na losowym polu planszy
var Coin = function() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);

}
//konstruktor obiektu Game
var Game = function() {
  this.board = document.querySelectorAll('#board div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  this.index = function(x, y) {
    return x + (y * 10);
  }
  this.showFurry = function() {
    this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    this.hideVisibleFurry();
    this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

  };
  this.showCoin = function() {
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
  }
  var self = this;
  this.moveFurry = function() {
    if (this.furry.direction === "right") {
      this.furry.x = this.furry.x + 1;
    } else if (this.furry.direction === "left") {
      this.furry.x = this.furry.x - 1;
    } else if (this.furry.direction === "up") {
      this.furry.y = this.furry.y - 1;
    } else if (this.furry.direction === "down") {
      this.furry.y = this.furry.y + 1;

    }
    this.checkCoinColision();
    this.gameOver();
  };
  this.startGame = function() {
    this.idSetInterval = setInterval(function() {
      self.moveFurry();
      self.hideVisibleFurry();
      self.showFurry();
    }, 250);
  };

  this.hideVisibleFurry = function() {
    var visibleFurry = document.querySelector('.furry')
    visibleFurry.classList.remove('furry');
  }

  // var turnFurry = function(event) {
  //   left: false;
  //   up: false;
  //   right: false;
  //   down: false;
  //
  // };
  window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37: // Left
        self.furry.direction = "left";
        break;

      case 38: // Up
        self.furry.direction = "up";
        break;

      case 39: // Right
        self.furry.direction = "right";
        break;

      case 40: // Down
        self.furry.direction = "down";
        break;
    }
  }, false);
  this.checkCoinColision = function() {
    if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
      this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
      this.coin = new Coin();
      this.score++;
      var scoreBlock = document.querySelector("#score strong");
      scoreBlock.innerText = this.score;
      this.showCoin();
    }
  };
  this.gameOver = function() {
    if ((this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9)) {
      this.hideVisibleFurry();
      clearInterval(this.idSetInterval);
      var gameOver = document.querySelector("#over");
      gameOver.classList.remove("invisible");
      var gameOverBlock = document.createElement("div");
      gameOver.appendChild(gameOverBlock);
      var gameOverScore = document.querySelector("#score strong");
      if (gameOverScore.innerText == 0) {
        gameOverBlock.innerText = "Your score is " + gameOverScore.innerText + ". You suck."
      }
      else if (gameOverScore.innerText == 4) {
        gameOverBlock.innerText = "Your score is " + gameOverScore.innerText + ", but can you make more?"
      }
      else if (gameOverScore.innerText == 7) {
        gameOverBlock.innerText = "Your score is " + gameOverScore.innerText + ". I think I'm in heaven."
      }
      else if (gameOverScore.innerText == 8) {
        gameOverBlock.innerText = "Your score is " + gameOverScore.innerText + ". Keep going, mate."
      }
      else {
        gameOverBlock.innerText = "Your score is " + gameOverScore.innerText;
      }

    }
  }

}
//koniec konstruktora obiektu Game
//stworzenie obiektu game i wywołanie jego metod showCoin i showFurry
var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();


//37 l 38 u 39 r 40 d


/***/ })
/******/ ]);