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
var Jugada = function(carta_, jugador_) {
    this.jugador = jugador_;
    this.cartes = new Array();
    this.valida = true;
    this.tancada = false;
    //console.log(carta_);
    this.puntuacio = carta_.valor;
    this.quants_asos = 0;

    if (this.jugador.jugades.length >= 1 && this.jugador.tipus == "PLAYER1") {
        carta_.oculta = false;
        this.jugador.getJugada(0).getCarta(0).oculta = false;

        if (this.jugador.partida != null) this.jugador.partida.getSetimigEngine().pintarCarta(this.jugador.getJugada(0).getCarta(0), 0, 0, "NORMAL");


        //La primera carta de la 1ra jugada la repartim oculta
    } else {
        carta_.oculta = true;
    }
    this.cartes[0] = carta_;
    if (this.jugador.partida != null) {

        this.jugador.partida.getSetimigEngine().pintarJugada(this.jugador.nom, this.jugador.tipus, this.jugador.jugades.length);
        this.jugador.partida.getSetimigEngine().pintarCarta(carta_, this.jugador.jugades.length, 0, this.jugador.tipus);
    }

    if (carta_.nom == "1") this.quants_asos = 1;
}

Jugada.prototype.afegir_carta = function(carta_) {
    if (this.valida) {
        this.cartes[this.cartes.length] = carta_;
        if (carta_.nom == "1") this.quants_asos += 1;
        this.puntuacio += carta_.valor;

        //Pintem abans de descobrir si la jugada és vàlida o no
        var ja = this.jugador.jugada_actual;
        if (!this.hiHaAlgunaCartaOculta() && this.jugador.tipus == "PLAYER1") carta_.oculta = true;

        if (this.jugador.partida != null) this.jugador.partida.getSetimigEngine().pintarCarta(carta_, ja, this.cartes.length - 1, this.jugador.tipus);

        this.valida = this.checkValidesa();
        if (!this.valida) {
            this.tancarJugada();
        } else if (this.puntuacio == 7.5) {
            //Si tenim un 7.5 tanquem la jugada
            this.tancarJugada();
        }
    } else {
        throw new Error("JugadaInvalida");
    }
}
Jugada.prototype.getNumCartes = function() {
    return this.cartes.length;
}

/**
 * Obtenim una instancia carta d'una jugada a partir d'un index
 *
 * @param {number} index Quina carta volem
 * @throws {IndexOutOfBoundaries} Si intentem accedir a una jugada que no existeix
 * @returns {Carta} Retorna una instancia Carta
 */
Jugada.prototype.getCarta = function(index) {
    if (typeof this.cartes[index] == 'undefined')
        throw new Error("out of bounds baby");
    else
        return this.cartes[index];
}
Jugada.prototype.tancarJugada = function() {
    this.tancada = true;
    if (this.jugador.tipus == "PLAYER1") {
        if (!this.valida) {
            //alert("PAra El carro "+valida);
            if (this.jugador.partida != null) this.jugador.partida.getSetimigEngine().invalidarJugada(this.jugador.jugada_actual, this.jugador.tipus);
        }

        this.jugador.changeJugadaActual();
        //PAssar a pintar.js

        $("#tancar_jugada").css("left", 50 + this.jugador.jugada_actual * 170);

    } else if (this.jugador.tipus == "PLAYER2") {
        if (!this.valida) {
            //alert("PAra El carro "+valida);
            if (this.jugador.partida != null) this.jugador.partida.getSetimigEngine().invalidarJugada(this.jugador.jugada_actual, this.jugador.tipus);
        }

        this.jugador.changeJugadaActual();
        //PAssar a pintar.js

        $("#tancar_jugada").css("left", 600 + this.jugador.jugada_actual * 170);
    } else if (this.jugador.tipus == "PLAYER3") {
        if (!this.valida) {
            //alert("PAra El carro "+valida);
            if (this.jugador.partida != null) this.jugador.partida.getSetimigEngine().invalidarJugada(this.jugador.jugada_actual, this.jugador.tipus);
        }

        this.jugador.changeJugadaActual();
        //PAssar a pintar.js

        $("#tancar_jugada").css("left", 1140 + this.jugador.jugada_actual * 170);
    } else {
        if (!this.valida) {
            //alert("PAra El carro "+valida);
            if (this.jugador.partida != null) this.jugador.partida.getSetimigEngine().invalidarJugada(this.jugador.jugada_actual, this.jugador.tipus);
        }

        this.jugador.changeJugadaActual();
        //PAssar a pintar.js

        $("#tancar_jugada").css("left", 50 + this.jugador.jugada_actual * 170);
    }

}
Jugada.prototype.hiHaAlgunaCartaOculta = function() {
    var hiha = false;
    for (var i = 0; i < this.cartes.length; i++) {
        if (this.cartes[i].oculta) {
            hiha = true;
            break;
        }
    }
    return hiha;
}
Jugada.prototype.checkValidesa = function() {
    if (this.puntuacio > 7.5 && this.quants_asos == 0) {
        return false;
    }
    if (this.puntuacio <= 7.5) {
        return true;
    }
    if (this.puntuacio > 7.5 && this.quants_asos > 0) {
        var provable = false;
        for (var i = 0; i < this.quants_asos; i++) {
            this.puntuacio = this.puntuacio - 0.5;
            console.log("MERDA " + this.quants_asos);
            if (this.puntuacio <= 7.5) {
                provable = true;
            }
            if (provable) break;
        }
        return provable;

    }

}


module.exports = Jugada;
