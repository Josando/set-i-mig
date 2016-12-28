"use strict";

var jugada = require('./jugada');

/**
* Jugador prototype. Creamos la clase jugador, la banca tambien sera un tipo de jugador
*
* @constructor
* @tutorial
*/

function Jugador(nom_, tipus_, mode_joc_ ){

  this.nom = nom_;
	this.tipus = tipus_; //NORMAL o BANCA
	this.mode_joc = mode_joc_ //MANUAL o AUTOMATIC
	this.jugades = new Array(); //Màxim 4 jugades obertes
	this.jugada_actual = 0; //Manté una referència a la jugada actual
	this.partida = null; //Partida a la que està subscrit el jugador
  //console.log("jugades: "+this.jugades);
  /**@public*/
	this.setPartida=function(partida_){
		this.partida=partida_;
	}
	this.getPartida=function(){
		return this.partida;
	}

  /**@public*/
  this.getNumJugades=function(){
  return this.jugades.length;
  }

  /**@public*/
  this.getJugadaActual=function(){
  return this.getJugada(this.jugada_actual);
  }

  /**@public*/
	this.getIndexJugadaActual=function(){
		return this.jugada_actual;
	}

  /**@public*/
  this.getNom=function(){
    return this.nom;
  }

  /**@public*/
   this.setTipus=function(tipus_){
   this.tipus=tipus_;
  }

  /**@public*/
   this.getTipus=function(){
     return this.tipus;
  }

  /**
* Obtenim una instancia jugada d'un jugador a partir s'un index
*
* @param {number} index Quina jugada volem
* @throws {IndexOutOfBoundaries} Si intentem accedir a una jugada que no existeix
* @returns {Jugada} Retorna una instancia jugada
*/
this.getJugada= function(index){
  if (typeof this.jugades[index] == 'undefined')
          throw new Error("out of bounds baby");
  else
    return this.jugades[index];
}

}

Jugador.prototype.afegir_carta_a_jugada_actual = function(carta_){
  if(this.jugades.length==0) this.jugades[0]=new jugada(carta_,this);
  else this.jugades[this.jugada_actual].afegir_carta(carta_);
  if (this.partida != null) this.partida.getSetimigEngine().pintarPuntuacio(this);
}

//Averigua Si hi ha alguna jugada vàlida. De estar totes tancades i cap vàlida, la banca no juga, guanya directament

Jugador.prototype.hiHaAlgunaJugadaValida = function() {
  var valida_=false;
  if (!this.estaJugant()){

    for (var i=0;i<this.jugades.length;i++){
      valida_=this.jugades[i].esValida();
      if (valida_) break;
    }
  }
  return valida_;
}

Jugador.prototype.estaJugant = function(){
		var jugant_=false;
		for (var i=0;i<this.jugades.length;i++){
			var tancada_=this.jugades[i].estaTancada()
			if (tancada_==false) jugant_=true;
			if (jugant_) break;
		}
		return jugant_;
	}

	Jugador.prototype.netejarJugades = function(){
		this.jugada_actual=0;
		this.jugades=new Array();
		$("div#tapet").empty();
	}

  /**
	 * TODO: Cal que siga private
	 *
	 * @private
	 */
	Jugador.prototype.changeJugadaActual = function(){
		if (this.jugada_actual+1 <= this.jugades.length-1) this.jugada_actual+=1;
	}

  /**
	 * Sols podrem crear una nova jugada si és compleixen les condicions per obrir nova jugada. Com a màxim un jugador solament pot obrir 4 jugades
	 *
	 * @param {Carta} carta_ 1ra carta que afegirem a la nova jugada.
	 * @public
	 */
	Jugador.prototype.afegirJugada = function(carta_){

	  //Si la carta que hem extret és 0.5 o 1 i hi ha almenys una jugada i menys de 4 i en l'ultima jugada hi ha solament una carta i aquesta es 0.5 o 1 Aleshores obrim jugada
	  if (carta_.getPuntuacio()<=1 && this.jugades.length>=1 && this.jugades.length<4 && this.jugades[0].getNumCartes()==1 && this.jugades[this.jugades.length-1].getNumCartes()==1 && (this.jugades[this.jugades.length-1].getCarta(0).getPuntuacio()==0.5 || this.jugades[this.jugades.length-1].getCarta(0).getPuntuacio()==1)){
		this.jugades[this.jugades.length]=new jugada(carta_,this);
    console.log("jugades: "+this.jugades.length);
	  //Si no es compleixen les condicions anteriors el que fem es afegir la carta a la jugada actual
	  }else{
	    	this.afegir_carta_a_jugada_actual(carta_);
	  	throw new Error("Sols podem obrir com a màxim 4 jugades i tan sols si la 1ra carta és un 0,5 o un 1 tindrem opció a obrir");
	  }
	}

  Jugador.prototype.esPosibleObrir=function(carta_){
  		 //Si la carta que hem extret és 0.5 o 1 i hi ha almenys una jugada i menys de 4 i
  		//en l'ultima jugada hi ha solament una carta i aquesta es 0.5 o 1 Aleshores obrim jugada
  		if (carta_.getPuntuacio()<=1 && this.jugades.length>=1 && this.jugades.length<4 && this.jugades[0].getNumCartes()==1 && this.jugades[this.jugades.length-1].getNumCartes()==1 && this.jugades[this.jugades.length-1].getCarta(0).getPuntuacio()<=1 ){
  			return true;
  	  	//Si no es compleixen les condicions anteriors el que fem es afegir la carta a la jugada actual
  	  	}else{
  			return false;
  	  	}
  	}

module.exports = Jugador;
