"use strict";

var setimigEngine = require('./pintar');

/**
* Crea una instància de partida
*
* @constructor
* @this {Partida}
* @param {Jugador} jugador1 El 1er jugador "normal" (no banca) de la partida
* @param {Jugador} banca El jugador banca de la partida
*/
function Partida(jugador, banca){

	var jugador_normal=jugador;
	var jugador_banca=banca;

	for (var i = 1; i < jugador_normal.length; i++) {
	jugador_normal[i].setPartida(this); //Enregistrem partida del jugador
	}

	jugador_banca.setPartida(this);
	//Creem el motor gràfic
	var motor_grafic= new setimigEngine(this);

	this.getSetimigEngine=function(){
		return motor_grafic;
	}

	this.getJugador=function(numerodeljugadoractual){
		return jugador_normal[numerodeljugadoractual];
	}


	this.getBanca=function(){
		return jugador_banca;
	}

}


module.exports = Partida;
