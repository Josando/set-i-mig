"use strict";



//End class baralla

/**
 * Crea una instància de Baralla. Conté un array privat de 40 cartes de la baralla espanyola
 *
 * @constructor
 * @this {}
 * @param {String} nom Nom de la carta (número)
 * @param {String} pal Bastos,oros, copes o espases
 * @param {numero} valor Puntuació de la carta en el 7 i mig
 */
function Carta(nom, pal, valor) {
    var nom = nom;
    var pal = pal;
    var valor = valor;
    var oculta = false;



    this.getPuntuacio = function() {
        return valor;
    }
    this.getPal = function() {
        return pal;
    }
    this.getNom = function() {
        return nom;
    }
    this.getIsOculta = function() {
        return oculta;
    }
    this.setOculta = function(oculta_) {
        oculta = oculta_;
    }

} //End class Carta

module.exports = Carta;
