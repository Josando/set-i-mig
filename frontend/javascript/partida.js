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
var Partida = function(jugador1, banca) {
    this.jugador_normal = jugador1;
    this.jugador_banca = banca;

    this.jugador_normal.setPartida(this); //Enregistrem partida del jugador
    this.jugador_banca.setPartida(this); //Enregistrem partida de la banca

    //Creem el motor gràfic
    var motor_grafic = new setimigEngine(this);

    this.getSetimigEngine = function() {
        return motor_grafic;
    }

    this.getJugador = function() {
        return this.jugador_normal;
    }

    this.getBanca = function() {
        return this.jugador_banca;
    }
}

module.exports = Partida;
