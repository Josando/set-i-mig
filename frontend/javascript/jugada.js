"use strict";

//var jugador = require('./jugador');

/**
 * Crea una instància de Jugada. Una jugada està composada per un conjunt de cartes
 *
 * @constructor
 * @this {Jugaa}
 * @param {Carta} carta_ Primera carta que afegirem a la jugada.
 * @param {Jugador} jugador_ Referència al jugador al que pertany la jugada.
 */
function Jugada(carta_, jugador_) {
    var jugador = jugador_;
    var cartes = new Array();
    console.log(jugador_);
    //La primera carta de les jugades obertes la destapem
    if (jugador_.getNumJugades() >= 1 && jugador_.getTipus() == "PLAYER1") {
        carta_.setOculta(false);
        jugador_.getJugada(0).getCarta(0).setOculta(false);

        if (jugador.getPartida() != null) jugador.getPartida().getSetimigEngine().pintarCarta(jugador_.getJugada(0).getCarta(0), 0, 0, "NORMAL");


        //La primera carta de la 1ra jugada la repartim oculta
    } else {
        carta_.setOculta(true);
    }
    cartes[0] = carta_;
    if (jugador.getPartida() != null) {

        jugador.getPartida().getSetimigEngine().pintarJugada(jugador.getNom(), jugador.getTipus(), jugador.getNumJugades());
        jugador.getPartida().getSetimigEngine().pintarCarta(carta_, jugador.getNumJugades(), 0, jugador.getTipus());
    }

    var valida = true;
    var tancada = false;
    //console.log(carta_);
    var puntuacio = carta_.getPuntuacio();
    var quants_asos = 0;

    if (carta_.getNom() == "1") quants_asos = 1;

    this.afegir_carta = function(carta_) {
        console.log(carta_);
        if (valida) {
            cartes[cartes.length] = carta_;
            if (carta_.getNom() == "1") quants_asos += 1;
            puntuacio += carta_.getPuntuacio();

            //Pintem abans de descobrir si la jugada és vàlida o no
            var ja = jugador.getIndexJugadaActual();
            if (!this.hiHaAlgunaCartaOculta() && jugador_.getTipus() == "PLAYER1") carta_.setOculta(true);

            if (jugador.getPartida() != null) jugador.getPartida().getSetimigEngine().pintarCarta(carta_, ja, cartes.length - 1, jugador.getTipus());

            valida = this.checkValidesa();
            if (!valida) {
                this.tancarJugada();
            } else if (puntuacio == 7.5) {
                //Si tenim un 7.5 tanquem la jugada
                this.tancarJugada();
            }
        } else {
            throw new Error("JugadaInvalida");
        }
    }

    this.getNumCartes = function() {
        return cartes.length;
    }

    /**
     * Obtenim una instancia carta d'una jugada a partir d'un index
     *
     * @param {number} index Quina carta volem
     * @throws {IndexOutOfBoundaries} Si intentem accedir a una jugada que no existeix
     * @returns {Carta} Retorna una instancia Carta
     */
    this.getCarta = function(index) {
        if (typeof cartes[index] == 'undefined')
            throw new Error("out of bounds baby");
        else
            return cartes[index];
    }

    this.tancarJugada = function() {
        tancada = true;
        if (jugador_.getTipus() == "PLAYER1") {
            if (!valida) {
                //alert("PAra El carro "+valida);
                if (jugador.getPartida() != null) jugador.getPartida().getSetimigEngine().invalidarJugada(jugador.getIndexJugadaActual(), jugador.getTipus());
            }

            jugador.changeJugadaActual();
            //PAssar a pintar.js

            $("#tancar_jugada").css("left", 50 + jugador.getIndexJugadaActual() * 170);

        } else if (jugador_.getTipus() == "PLAYER2") {
            if (!valida) {
                //alert("PAra El carro "+valida);
                if (jugador.getPartida() != null) jugador.getPartida().getSetimigEngine().invalidarJugada(jugador.getIndexJugadaActual(), jugador.getTipus());
            }

            jugador.changeJugadaActual();
            //PAssar a pintar.js

            $("#tancar_jugada").css("left", 600 + jugador.getIndexJugadaActual() * 170);
        } else if (jugador_.getTipus() == "PLAYER3") {
            if (!valida) {
                //alert("PAra El carro "+valida);
                if (jugador.getPartida() != null) jugador.getPartida().getSetimigEngine().invalidarJugada(jugador.getIndexJugadaActual(), jugador.getTipus());
            }

            jugador.changeJugadaActual();
            //PAssar a pintar.js

            $("#tancar_jugada").css("left", 1140 + jugador.getIndexJugadaActual() * 170);
        } else {
            if (!valida) {
                //alert("PAra El carro "+valida);
                if (jugador.getPartida() != null) jugador.getPartida().getSetimigEngine().invalidarJugada(jugador.getIndexJugadaActual(), jugador.getTipus());
            }

            jugador.changeJugadaActual();
            //PAssar a pintar.js

            $("#tancar_jugada").css("left", 50 + jugador.getIndexJugadaActual() * 170);
        }

    }

    this.esValida = function() {
        return valida;
    }

    this.estaTancada = function() {
        return tancada;
    }

    this.hiHaAlgunaCartaOculta = function() {
        var hiha = false;
        for (var i = 0; i < cartes.length; i++) {
            if (cartes[i].getIsOculta()) {
                hiha = true;
                break;
            }
        }
        return hiha;
    }
    this.checkValidesa = function() {
        if (puntuacio > 7.5 && quants_asos == 0) {
            return false;
        }
        if (puntuacio <= 7.5) {
            return true;
        }
        if (puntuacio > 7.5 && quants_asos > 0) {
            var provable = false;
            for (var i = 0; i < quants_asos; i++) {
                puntuacio = puntuacio - 0.5;
                console.log("MERDA " + quants_asos);
                if (puntuacio <= 7.5) {
                    provable = true;
                }
                if (provable) break;
            }
            return provable;

        }

    }
    this.getPuntuacioJugada = function() {
        return puntuacio;
    }
} //END class Jugada

module.exports = Jugada;
