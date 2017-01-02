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
var Carta = function(nom, pal, valor) {
    this.nom = nom;
    this.pal = pal;
    this.valor = valor;
    this.oculta = false;
}


module.exports = Carta;
