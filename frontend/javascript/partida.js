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
var Partida = function(jugador, banca) {

    this.jugador_normal = jugador;
    this.jugador_banca = banca;

    for (var i = 1; i < this.jugador_normal.length; i++) {
        this.jugador_normal[i].partida = this; //Enregistrem partida del jugador
    }

    this.jugador_banca.partida = this;
    //Creem el motor gràfic
    this.motor_grafic = new setimigEngine(this);

    this.getSetimigEngine = function() {
        return this.motor_grafic;
    }

    this.getJugador = function(numerodeljugadoractual) {
        return this.jugador_normal[numerodeljugadoractual];
    }

    this.getBanca = function() {
        return this.jugador_banca;
    }
}

module.exports = Partida;
