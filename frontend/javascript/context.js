"use strict";


var jugador = require('./jugador');
var partida = require('./partida');
var baralla = require('./baralla');
var jugada = require('./jugada');
var utils = require('./utils');
/**
 * Context prototype.
 * With this object (Singleton) by the way. We manage game context: points, on/off, balls location
 * on screen. It is a bridge that let you traverse whole game objects
 *
 * @constructor
 */

function Context() {

    this.usersname = utils.getCookie("username");
    console.log(this.usersname);
    this.jugador = new Array();
    this.numerodejugadores = 1;
    var self = this;
    this.ContextSelf = function() {
        return self;
    };

    $("#tancar_jugada").click(function() {
        if (self.numerodejugadores == 1) {
            self.jugador[1].getJugadaActual().tancarJugada();
            if (self.jugador[1].estaJugant() == false) {
                if (self.jugador[1].hiHaAlgunaJugadaValida()) {
                    self.banca.getJugada(0).getCarta(0).setOculta(false);
                    self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0, 0, "BANCA");
                    self.jugaBanca();
                }
            }
        } else {
            if (self.jugador[1].estaJugant() == true) {
                self.jugador[1].getJugadaActual().tancarJugada();
            } else {
                self.jugador[2].getJugadaActual().tancarJugada();
                if (self.jugador[2].estaJugant() == false) {
                    if (self.jugador[2].hiHaAlgunaJugadaValida()) {
                        self.banca.getJugada(0).getCarta(0).setOculta(false);
                        self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0, 0, "BANCA");
                        self.jugaBanca();
                    }
                }
            }
        }


        /*
   self.jugador1.getJugadaActual().tancarJugada();
   //Si el jugador ja ha acabat de jugar i ara �s el torn de la banca
   if(self.jugador1.estaJugant()==false){
           if (self.jugador1.hiHaAlgunaJugadaValida()){

           self.banca.getJugada(0).getCarta(0).setOculta(false);
           self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0,0,"BANCA");

             self.jugaBanca();

           }
   }
   */
    });
    /*
     $("#btnAgarraCarta").click( function(){
       if (self.jugador1.getJugadaActual().esValida() && !self.jugador1.getJugadaActual().estaTancada()){
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
    */
    $("#btnAgarraCarta").click(function() {
        if (self.numerodejugadores == 1) {
            if (self.jugador[1].getJugadaActual().esValida() && !self.jugador[1].getJugadaActual().estaTancada()) {
                var carta_aux = self.baralla_.agarraCarta();
                if (self.jugador[1].esPosibleObrir(carta_aux)) {
                    self.partida.getSetimigEngine().obrimJugada(carta_aux, 1);
                } else {
                    self.jugador[1].afegir_carta_a_jugada_actual(carta_aux);
                }
                if (self.jugador[1].estaJugant() == false) {
                    if (self.jugador[1].hiHaAlgunaJugadaValida()) {
                        self.banca.getJugada(0).getCarta(0).setOculta(false);
                        self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0, 0, "BANCA");
                        self.jugaBanca();
                    } else {
                        self.banca.getJugada(0).tancarJugada();
                        alert("La banca guanya directament");
                    }
                }
            } else {
                //alert("nova ronda "+banca.estaJugant());
                if (self.banca.estaJugant() == false) self.nova_ronda();
            }
        } else {
            if (self.jugador[1].estaJugant() == true) {
                if (self.jugador[1].getJugadaActual().esValida() && !self.jugador[1].getJugadaActual().estaTancada()) {
                    var carta_aux = self.baralla_.agarraCarta();
                    if (self.jugador[1].esPosibleObrir(carta_aux)) {

                        self.partida.getSetimigEngine().obrimJugada(carta_aux, 1);
                    } else {
                        self.jugador[1].afegir_carta_a_jugada_actual(carta_aux);
                    }
                }
            } else {
                alert("le toca jugar al jugador2");
                if (self.jugador[2].getJugadaActual().esValida() && !self.jugador[2].getJugadaActual().estaTancada()) {
                    var carta_aux = self.baralla_.agarraCarta();
                    if (self.jugador[2].esPosibleObrir(carta_aux)) {
                        self.partida.getSetimigEngine().obrimJugada(carta_aux, 2);
                    } else {
                        self.jugador[2].afegir_carta_a_jugada_actual(carta_aux);
                    }
                    if (self.jugador[2].estaJugant() == false) {
                        if (self.jugador[1].hiHaAlgunaJugadaValida() || self.jugador[2].hiHaAlgunaJugadaValida()) {
                            self.banca.getJugada(0).getCarta(0).setOculta(false);
                            self.partida.getSetimigEngine().pintarCarta(self.banca.getJugada(0).getCarta(0), 0, 0, "BANCA");
                            self.jugaBanca();
                        } else {
                            self.banca.getJugada(0).tancarJugada();
                            alert("La banca guanya directament");
                        }

                    }

                } else {
                    if (self.banca.estaJugant() == false) self.nova_ronda();
                }
            }
        }
    });


    $(document).on('mouseover', '.carta_meua_oculta',
        function(e) {
            //console.log("mouse");
            var raw_id_carta = $(this).attr('id');
            console.log(raw_id_carta);
            var ids_carta = raw_id_carta.split('_');
            var carta = self.jugador[1].getJugada(ids_carta[1]).getCarta(ids_carta[2]);
            $(this).children(":first").attr('src', 'images/baralla/' + carta.getPal() + '/' + carta.getPal() + '_' + carta.getNom() + '.png');
        }
    );

    $(document).on('mouseover', '.carta_meua_oculta1',
        function(e) {
            //console.log("mouse");
            var raw_id_carta = $(this).attr('id');
            console.log(raw_id_carta);
            var ids_carta = raw_id_carta.split('_');
            var carta = self.jugador[2].getJugada(ids_carta[1]).getCarta(ids_carta[2]);
            $(this).children(":first").attr('src', 'images/baralla/' + carta.getPal() + '/' + carta.getPal() + '_' + carta.getNom() + '.png');
        }
    );

    $(document).on('mouseleave', '.carta_meua_oculta',
        function(e) {
            //console.log("mouse");
            var raw_id_carta = $(this).attr('id');
            var ids_carta = raw_id_carta.split('_');
            var carta = self.jugador[1].getJugada(ids_carta[1]).getCarta(ids_carta[2]);
            //alert("bobo");
            if (carta.getIsOculta())
                $(this).children(":first").attr('src', 'images/baralla/revers_small.png');
        }
    );

    $(document).on('mouseleave', '.carta_meua_oculta1',
        function(e) {
            //console.log("mouse");
            var raw_id_carta = $(this).attr('id');
            var ids_carta = raw_id_carta.split('_');
            var carta = self.jugador[2].getJugada(ids_carta[1]).getCarta(ids_carta[2]);
            //alert("bobo");
            if (carta.getIsOculta())
                $(this).children(":first").attr('src', 'images/baralla/revers_small.png');
        }
    );

    $(document).on('dblclick', '.carta_meua_oculta', function(event) {
        var raw_id_carta = $(this).attr('id');
        var ids_carta = raw_id_carta.split('_');
        var carta = self.jugador[1].getJugada(ids_carta[1]).getCarta(ids_carta[2]);
        $(self).attr("class", "carta_meua");
        $(self).children(":first").attr('src', 'images/baralla/' + carta.getPal() + '/' + carta.getPal() + '_' + carta.getNom() + '.jpg');
        carta.setOculta(false);
    });

    $(document).on('dblclick', '.carta_meua_oculta1', function(event) {
        var raw_id_carta = $(this).attr('id');
        var ids_carta = raw_id_carta.split('_');
        var carta = self.jugador[2].getJugada(ids_carta[1]).getCarta(ids_carta[2]);
        $(self).attr("class", "carta_meua");
        $(self).children(":first").attr('src', 'images/baralla/' + carta.getPal() + '/' + carta.getPal() + '_' + carta.getNom() + '.png');
        carta.setOculta(false);
    });
}

Context.prototype.iniciar_joc = function(numerodejugadores) {

this.numerodejugadores = numerodejugadores;
this.usersname = utils.getCookie("username");

    //Crear jugador humá
    for (var i = 1; i <= this.numerodejugadores; i++) {
        this.jugador[i] = new jugador(this.usersname.split('|')[i-1], "PLAYER" + i, "MANUAL");
    }
    //this.jugador1 = new jugador("Jorge", "PLAYER1" ,"MANUAL");
    //this.jugador2 = new jugador("Pepe", "PLAYER2" ,"MANUAL");
    //La banca se crea siempre
    this.banca = new jugador("Banca", "BANCA", "AUTOMATIC");
    alert("iniciamos partida");
    this.partida = new partida(this.jugador, this.banca);
    //Creem la baralla de cartes
    this.baralla_ = new baralla();

    this.nova_ronda();

}

//Nova ronda. Tornem a repartir cartes
Context.prototype.nova_ronda = function() {
    //var self = this.ContextSelf();
    console.log("empezar ronda");
    //Netegem tapet


    for (var i = 1; i <= this.numerodejugadores; i++) {
        console.log(i);
        this.jugador[i].netejarJugades();
    }

    this.banca.netejarJugades();
    //Barallar Cartes (Array amb elements CARTA)
    this.baralla_.iniciarBaralla();
    this.baralla_.barallar();

    for (var i = 1; i <= this.numerodejugadores; i++) {
        this.jugador[i].afegir_carta_a_jugada_actual(this.baralla_.agarraCarta());
    }

    this.banca.afegir_carta_a_jugada_actual(this.baralla_.agarraCarta());

}

Context.prototype.jugaBanca = function() {
    var continua = false;
    var self = this.ContextSelf();
    if (this.banca.getJugadaActual().getPuntuacioJugada() < 5.5) {
        this.banca.afegir_carta_a_jugada_actual(this.baralla_.agarraCarta());
        setTimeout(function() {
            self.jugaBanca();
        }, 2500);
    } else {
        continua = true;
    }

    if (continua) {
        if (this.banca.getJugadaActual().esValida()) {
            this.banca.getJugadaActual().tancarJugada();
            this.contarPunts();
        } else {
            this.contarPunts();
        }
    }
}

Context.prototype.contarPunts = function() {

    if (!this.banca.estaJugant()) {
        var punts_banca = this.banca.getJugadaActual().getPuntuacioJugada();
        if (!this.banca.getJugadaActual().esValida()) punts_banca = 0;
        for (var j = 1; j <= this.numerodejugadores; j++) {
            for (var i = 0; i < this.jugador[j].getNumJugades(); i++) {
                if (this.jugador[j].getJugada(i).esValida() && this.jugador[j].getJugada(i).estaTancada()) {
                    if (this.jugador[j].getJugada(i).getPuntuacioJugada() > punts_banca) {
                        this.partida.getSetimigEngine().pintarWin(i, this.jugador[j].getTipus());
                    } else {
                        this.partida.getSetimigEngine().invalidarJugada(i, this.jugador[j].getTipus());
                    }
                }
            }
        }
    }
}



module.exports = Context;
