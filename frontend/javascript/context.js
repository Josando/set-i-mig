"use strict";


var jugador = require('./jugador');
var partida = require('./partida');
var baralla = require('./baralla');
var jugada = require('./jugada');
/**
 * Context prototype.
 * With this object (Singleton) by the way. We manage game context: points, on/off, balls location
 * on screen. It is a bridge that let you traverse whole game objects
 *
 * @constructor
 */

 function Context(){
   //Crear jugador humá
  this.jugador1 = new jugador("Jorge", "NORMAL" ,"MANUAL");
	//Crear JUGADOR banca
	this.banca = new jugador("Banca", "BANCA", "AUTOMATIC");
  var self = this;
  this.ContextSelf = function(){return self;};

  $("#tancar_jugada").click( function(){
   self.jugador1.getJugadaActual().tancarJugada();
   //Si el jugador ja ha acabat de jugar i ara �s el torn de la banca
   if(self.jugador1.estaJugant()==false){
           if (self.jugador1.hiHaAlgunaJugadaValida()){

           self.banca.getJugada(0).getCarta(0).setOculta(false);
           self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0,0,"BANCA");

             self.jugaBanca();

           }
   }
 });

 $("#btnAgarraCarta").click( function(){
   if (self.jugador1.getJugadaActual().esValida() && !self.jugador1.getJugadaActual().estaTancada()){
     ;
     var carta_aux=self.baralla_.agarraCarta();
     if (self.jugador1.esPosibleObrir(carta_aux)) {

       self.partida.getSetimigEngine().obrimJugada(carta_aux);
     }else{
       self.jugador1.afegir_carta_a_jugada_actual(carta_aux);
     }

     if(self.jugador1.estaJugant()==false){
         if (self.jugador1.hiHaAlgunaJugadaValida()){
           self.banca.getJugada(0).getCarta(0).setOculta(false);
           self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0,0,"BANCA");
             self.jugaBanca();
           }else{
             self.banca.getJugada(0).tancarJugada();
             alert("La banca guanya directament");
           }

       }
   }else{
     //alert("nova ronda "+banca.estaJugant());
     if (self.banca.estaJugant()==false) self.nova_ronda();
   }
 });


 $(document).on('mouseover','.carta_meua_oculta',
     function (e) {
       //console.log("mouse");
       var raw_id_carta=$(this).attr('id');
       //console.log(raw_id_carta);
       var ids_carta=raw_id_carta.split('_');
       var carta=self.jugador1.getJugada(ids_carta[1]).getCarta(ids_carta[2]);
       $(this).children(":first").attr('src','images/baralla/'+carta.getPal()+'/'+carta.getPal()+'_'+carta.getNom()+'.jpg');
     }
   );

   $(document).on('mouseleave','.carta_meua_oculta',
     function (e) {
       //console.log("mouse");
       var raw_id_carta=$(this).attr('id');
       var ids_carta=raw_id_carta.split('_');
       var carta=self.jugador1.getJugada(ids_carta[1]).getCarta(ids_carta[2]);
       //alert("bobo");
       if (carta.getIsOculta())
         $(this).children(":first").attr('src','images/baralla/revers_small.jpg');
     }
 );

 $(document).on('dblclick','.carta_meua_oculta',function(event){
     var raw_id_carta=$(this).attr('id');
     var ids_carta=raw_id_carta.split('_');
     var carta=self.jugador1.getJugada(ids_carta[1]).getCarta(ids_carta[2]);
       $(self).attr("class","carta_meua");
       $(self).children(":first").attr('src','images/baralla/'+carta.getPal()+'/'+carta.getPal()+'_'+carta.getNom()+'.jpg');
     carta.setOculta(false);
 });


 }

 Context.prototype.iniciar_joc = function(){

  console.log("iniciamos partida");

	this.partida=new partida(this.jugador1,this.banca);
	//Creem la baralla de cartes
	this.baralla_ = new baralla();

  this.nova_ronda();

 }

//Nova ronda. Tornem a repartir cartes
 Context.prototype.nova_ronda = function(){
   //var self = this.ContextSelf();
   console.log("empezar ronda");
   //Netegem tapet
 		this.jugador1.netejarJugades();
 		this.banca.netejarJugades();
 		//Barallar Cartes (Array amb elements CARTA)
 		this.baralla_.iniciarBaralla();
 		this.baralla_.barallar();

 		this.jugador1.afegir_carta_a_jugada_actual(this.baralla_.agarraCarta());
 		this.banca.afegir_carta_a_jugada_actual(this.baralla_.agarraCarta());
 	}

  Context.prototype.jugaBanca = function(){
	     var continua=false;
       var self = this.ContextSelf();
		if (this.banca.getJugadaActual().getPuntuacioJugada()<5.5){
			this.banca.afegir_carta_a_jugada_actual(this.baralla_.agarraCarta());
			setTimeout( function() { self.jugaBanca( ); }, 2500 );
		}else{
			continua=true;
		}

		if (continua){
			if (this.banca.getJugadaActual().esValida()){
				this.banca.getJugadaActual().tancarJugada();
				this.contarPunts();
			}else{
				this.contarPunts();
			}
		}
	}

  Context.prototype.contarPunts = function(){

		if (!this.banca.estaJugant()){
			var punts_banca=this.banca.getJugadaActual().getPuntuacioJugada();
			if (!this.banca.getJugadaActual().esValida()) punts_banca=0;
			for (var i=0;i<this.jugador1.getNumJugades();i++){
				if (this.jugador1.getJugada(i).esValida() && this.jugador1.getJugada(i).estaTancada()){
					if (this.jugador1.getJugada(i).getPuntuacioJugada()>punts_banca){
						this.partida.getSetimigEngine().pintarWin(i,this.jugador1.getTipus());
					}else{
						this.partida.getSetimigEngine().invalidarJugada(i,this.jugador1.getTipus());
					}
				}
			}
		}
	}



module.exports = Context;
