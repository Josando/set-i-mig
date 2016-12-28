"use strict";

var carta = require('./carta');

/**
 * Crea una instància de Baralla. Conté un array privat de 40 cartes de la baralla espanyola
 *
 * @constructor
 * @this {}
 */
function Baralla(){

	this.baralla_priv=new Array();
}

	Baralla.prototype.iniciarBaralla = function(){
		this.baralla_priv=[
		new carta('1', 'bastos',1),
		new carta('2', 'bastos',2),
		new carta('3', 'bastos',3),
		new carta('4', 'bastos',4),
		new carta('5', 'bastos',5),
		new carta('6', 'bastos',6),
		new carta('7', 'bastos',7),
		new carta('10', 'bastos',0.5),
		new carta('11', 'bastos',0.5),
		new carta('12', 'bastos',0.5),
		new carta('1', 'espadas',1),
		new carta('2', 'espadas',2),
		new carta('3', 'espadas',3),
		new carta('4', 'espadas',4),
		new carta('5', 'espadas',5),
		new carta('6', 'espadas',6),
		new carta('7', 'espadas',7),
		new carta('10', 'espadas',0.5),
		new carta('11', 'espadas',0.5),
		new carta('12', 'espadas',0.5),
		new carta('1', 'copas',1),
		new carta('2', 'copas',2),
		new carta('3', 'copas',3),
		new carta('4', 'copas',4),
		new carta('5', 'copas',5),
		new carta('6', 'copas',6),
		new carta('7', 'copas',7),
		new carta('10', 'copas',0.5),
		new carta('11', 'copas',0.5),
		new carta('12', 'copas',0.5),
		new carta('1', 'oros',1),
		new carta('2', 'oros',2),
		new carta('3', 'oros',3),
		new carta('4', 'oros',4),
		new carta('5', 'oros',5),
		new carta('6', 'oros',6),
		new carta('7', 'oros',7),
		new carta('10', 'oros',0.5),
		new carta('11', 'oros',0.5),
		new carta('12', 'oros',0.5)
	   ];
	}

  Baralla.prototype.barallar = function(){
    for(var j, x, i = this.baralla_priv.length; i; j = parseInt(Math.random() * i), x = this.baralla_priv[--i], this.baralla_priv[i] = this.baralla_priv[j], this.baralla_priv[j] = x);
      //return baralla;
  }

  Baralla.prototype.agarraCarta = function(){
    var carta = this.baralla_priv.splice(0,1);
  //console.log(carta[0]+" Ara baralla_priv.length="+baralla_priv.length);
    return carta[0];
  }

  module.exports = Baralla;
