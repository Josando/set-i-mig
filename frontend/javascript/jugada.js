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
    this.carta_ = carta_;
    this.jugador_ = jugador_;
    this.cartes = new Array();
    this.valida = true;
    this.tancada = false;
    //console.log(carta_);
    this.puntuacio = carta_.valor;
    this.quants_asos = 0;
}
Jugada.prototype.afegir_carta = function(carta_) {

    //La primera carta de les jugades obertes la destapem
    if (this.jugador_.getNumJugades() >= 1 && this.jugador_.getTipus() == "NORMAL") {
        carta_.oculta = false;
        this.jugador_.getJugada(0).getCarta(0).setOculta(false);

        if (jugador.getPartida() != null) this.jugador_.getPartida().getSetimigEngine().pintarCarta(this.jugador_.getJugada(0).getCarta(0), 0, 0, "NORMAL");


        //La primera carta de la 1ra jugada la repartim oculta
    } else {
        carta_.setOculta(true);
    }
    cartes[0] = carta_;
    if (this.jugador_.getPartida() != null) {

        this.jugador_.getPartida().getSetimigEngine().pintarJugada(this.jugador_.getNom(), this.jugador_.getTipus(), this.jugador_.getNumJugades());
        this.jugador_.getPartida().getSetimigEngine().pintarCarta(carta_, this.jugador_.getNumJugades(), 0, this.jugador_.getTipus());
    }

    if (carta_.nom == "1") quants_asos = 1;
    console.log(carta_);
    if (this.valida) {
        cartes[cartes.length] = carta_;
        if (carta_.nom == "1") quants_asos += 1;
        this.puntuacio += carta_.valor;

        //Pintem abans de descobrir si la jugada és vàlida o no
        var ja = this.jugador_.getIndexJugadaActual();
        if (!this.hiHaAlgunaCartaOculta() && this.jugador_.getTipus() == "NORMAL") carta_.oculta = true;

        if (this.jugador_.getPartida() != null) this.jugador_.getPartida().getSetimigEngine().pintarCarta(carta_, ja, cartes.length - 1, this.jugador_.getTipus());

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


/**
 * Obtenim una instancia carta d'una jugada a partir d'un index
 *
 * @param {number} index Quina carta volem
 * @throws {IndexOutOfBoundaries} Si intentem accedir a una jugada que no existeix
 * @returns {Carta} Retorna una instancia Carta
 */
Jugada.prototype.getCarta = function(index) {
    if (typeof cartes[index] == 'undefined')
        throw new Error("out of bounds baby");
    else
        return cartes[index];
}

Jugada.prototype.tancarJugada = function() {
    this.tancada = true;

    if (!this.valida) {
        //alert("PAra El carro "+valida);
        if (this.jugador_.getPartida() != null) this.jugador_.getPartida().getSetimigEngine().invalidarJugada(this.jugador_.getIndexJugadaActual(), jugador.getTipus());
    }

    this.jugador_.changeJugadaActual();
    //PAssar a pintar.js
    $("#tancar_jugada").css("left", 50 + jugador.getIndexJugadaActual() * 170);
}
Jugada.prototype.esValida = function() {
    return valida;
}
Jugada.prototype.estaTancada = function() {
    return this.tancada;
}

Jugada.prototype.hiHaAlgunaCartaOculta = function() {
    var hiha = false;
    for (var i = 0; i < cartes.length; i++) {
        if (cartes[i].getIsOculta()) {
            hiha = true;
            break;
        }
    }
    return hiha;
}
Jugada.prototype.checkValidesa = function() {
    if (this.puntuacio > 7.5 && quants_asos == 0) {
        return false;
    }
    if (this.puntuacio <= 7.5) {
        return true;
    }
    if (this.puntuacio > 7.5 && quants_asos > 0) {
        var provable = false;
        for (var i = 0; i < quants_asos; i++) {
            this.puntuacio = this.puntuacio - 0.5;
            console.log("MERDA " + quants_asos);
            if (this.puntuacio <= 7.5) {
                provable = true;
            }
            if (provable) break;
        }
        return provable;

    }

}

module.exports = Jugada;
