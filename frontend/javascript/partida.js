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
function Partida(jugador1,banca){

	var jugador_normal=jugador1;
	var jugador_banca=banca;

	jugador_normal.setPartida(this); //Enregistrem partida del jugador
	jugador_banca.setPartida(this); //Enregistrem partida de la banca

	//Creem el motor gràfic
	var motor_grafic= new setimigEngine(this);

	this.getSetimigEngine=function(){
		return motor_grafic;
	}

	this.getJugador=function(){
		return jugador_normal;
	}

	this.getBanca=function(){
		return_banca;
	}

}


module.exports = Partida;
