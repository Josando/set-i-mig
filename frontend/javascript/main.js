"use strict";

/**
 * Set i mig  main entry script
 *  @author Jorge Sanchis
 *  @version 0.0.1
 */

/** Prototype where all game objects are present and could be accessed */
var singletonContext = require('./patterns/singleton/singletonContext');

window.onload=function(){

var GameContext_ = singletonContext.getInstance();

//Se inicia la Partida
GameContext_.iniciar_joc();

//Se empieza una ronda

}
