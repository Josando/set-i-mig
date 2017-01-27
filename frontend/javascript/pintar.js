"use strict";

/**
 * Crea una instància d'un motor "gràfic" del set i mig per tot el que estiga relacionat en dibuixar sobre la pantalla
 * Dibuixar carta, jugada, puntuacions etc.
 *
 * @constructor
 * @this {setimigEngine}
 * @param {Partida} partida_ Referència a la partida sobre la qual dibuixarà
 */
function setimigEngine(partida_) {

    var partida = partida_;

    this.render = function() {


    }

    /**
     * Funció pintarCarta. Encarregada de dibuixar pel navegador dins d'una jugada concreta una carta oculta o visible
     * El posicionament CSS de les capes on van les cartes és Absolut. Faltaria afegir num_jugador per a que fora més genèrica
     *
     * @param {Carta} carta L'objecte carta que anem a dibuixar.
     * @param {numeric} num_jugada Sobre quina jugada anem a dibuixar la carta. La primera jugada és 0
     * @param {numeric} index Dins de la jugada quina posició ocupa la carta. La primera carta de la jugada és 0
     * @param {string} tipus_jugador En funció de si el jugador és NORMAL o BANCA dibuixarem les cartes en una orientació diferent.
     */
    this.pintarCarta = function(carta, num_jugada, index, tipus_jugador) {
        console.log(tipus_jugador, index);

        if (tipus_jugador == "PLAYER1") {
            var capa_id = "#meua_jugada" + num_jugada;
            var carta_class = "carta_meua";
            var carta_id = "PLAYER1_" + num_jugada + "_" + index;
            var left_inc = index * 20;
            var top_inc = index * 40;
        }

        if (tipus_jugador == "BANCA") {
            capa_id = "#banca_jugada";
            left_inc = index * 70;
            top_inc = "0px";
            carta_class = "carta_banca";
            carta_id = "BANCA_" + num_jugada + "_" + index;
        }

        if (tipus_jugador == "PLAYER2") {
            var capa_id = "#Player2_jugada" + num_jugada;
            var carta_class = "carta_meua";
            var carta_id = "PLAYER2_" + num_jugada + "_" + index;
            var left_inc = index * 50;
            var top_inc = index * 40;
        }


        if (tipus_jugador == "PLAYER3") {
            var capa_id = "#Player3_jugada" + num_jugada;
            var carta_class = "carta_meua";
            var carta_id = "PLAYER3_" + num_jugada + "_" + index;
            var left_inc = index * 80;
            var top_inc = index * 40;
        }


        if (carta.oculta) {

            if (tipus_jugador == "PLAYER1") {
                carta_class = "carta_meua_oculta";
            } else if (tipus_jugador == "PLAYER2") {
                carta_class = "carta_meua_oculta1";
            } else if (tipus_jugador == "PLAYER3") {
                carta_class = "carta_meua_oculta2";
            } else {
                carta_class = "carta_banca_oculta";
            }

            //tipus_jugador=="PLAYER1"?carta_class="carta_meua_oculta":carta_class="carta_banca_oculta";
            //	if(tipus_jugador=="PLAYER_2");carta_class="carta_meua_oculta1";
            //	tipus_jugador=="PLAYER_2"?carta_class="carta_meua_oculta";
            var img_carta = "images/baralla/revers_small.png";

        } else {
            img_carta = 'images/baralla/' + carta.pal + '/' + carta.pal + '_' + carta.nom + '.png';
        }

        var $d = $("<div>");
        $d.addClass(carta_class)
            .attr('id', carta_id)
            .appendTo(capa_id);

        $("<img>").attr('width', '150px')
            .attr('src', img_carta)
            .appendTo($d)
            .fadeOut('slow')
            .fadeIn('slow');

        $d.css("left", left_inc);
        $d.css("top", top_inc);
        return $d; //Added simply for testing purpose
    }


    /**
     * Funció pintarPuntuació. Encarregada de dibuixar la puntuació de cadascuna de les jugades d'un jugador
     * No m'agrada com està pq les capesHTML estan HARD WIRED al codi
     *
     * @param {Jugador} jugador_ Jugador del qual volem pintar puntuació
     */
    this.pintarPuntuacio = function(jugador_) {
        var $d = $("<span>");
        if (jugador_.tipus == "PLAYER1") {
            var isbuit = $("#punts_jugador1").length == 0;

            if (isbuit) {
                $d.attr('id', "punts_jugador1")
            } else {
                $d = $("#punts_jugador1");
            }
            $d.empty();
            for (var i = 0; i < jugador_.jugades.length; i++) {
                $d.append(jugador_.nom + " Jugada " + (i + 1) + " = " + jugador_.getJugada(i).puntuacio + "<br>");
            }

        } else if (jugador_.tipus == "PLAYER2") {
            var isbuit = $("#punts_jugador2").length == 0;
            if (isbuit) {
                $d.attr('id', "punts_jugador2")
            } else {
                $d = $("#punts_jugador2");
            }
            $d.empty();
            for (var i = 0; i < jugador_.jugades.length; i++) {
                $d.append(jugador_.nom + " Jugada " + (i + 1) + " = " + jugador_.getJugada(i).puntuacio + "<br>");
            }
        } else if (jugador_.tipus == "PLAYER3") {
            var isbuit = $("#punts_jugador3").length == 0;
            if (isbuit) {
                $d.attr('id', "punts_jugador3")
            } else {
                $d = $("#punts_jugador3");
            }
            $d.empty();
            for (var i = 0; i < jugador_.jugades.length; i++) {
                $d.append(jugador_.nom + " Jugada " + (i + 1) + " = " + jugador_.getJugada(i).puntuacio + "<br>");
            }
        } else {
          console.log(jugador_);
            var isbuit = $("#punts_banca").length == 0;
            $("#punts_banca").empty();

            if (isbuit) {
                $d.attr('id', "punts_banca")
            } else {
                $d = $("#punts_banca");
            }
            try {
                if (!partida.getJugador(1).estaJugant() && !partida.getJugador(2).estaJugant() && !partida.getJugador(3).estaJugant()) $d.html("Banca  = " + jugador_.jugades[jugador_.jugada_actual].puntuacio);
                console.log();
                //  console.log("mgder->" + $d.html());
            } catch (e) {
                if (!partida.getJugador(1).estaJugant())
                    $d.html( jugador_.nom + " = " + jugador_.jugades[jugador_.jugada_actual].puntuacio);
                //  console.log("mgder->" + $d.html());
            }
        }
        return $d;
    }

    this.pintarJugada = function(jugador_nom, tipus_jugador, ultima_jugada) {
        if (tipus_jugador === "PLAYER1") {
            var $d2 = $("<div>");
            $d2.addClass("jugador_" + jugador_nom)
                .attr('id', 'meua_jugada' + ultima_jugada)
                .appendTo("#tapet");
        } else if (tipus_jugador === "PLAYER2") {
            var $d2 = $("<div>");
            $d2.addClass("jugador_" + jugador_nom)
                .attr('id', 'Player2_jugada' + ultima_jugada)
                .appendTo("#tapet");

        } else if (tipus_jugador === "PLAYER3") {
            var $d2 = $("<div>");
            $d2.addClass("jugador_" + jugador_nom)
                .attr('id', 'Player3_jugada' + ultima_jugada)
                .appendTo("#tapet");
        } else {
            var $d2 = $("<div>");
            $d2.addClass("jugador_" + jugador_nom)
                .attr('id', 'banca_jugada')
                .appendTo("#tapet");
        }
    }

    this.obrimJugada = function(carta_aux2, numerodeljugadoractual) {
        console.log(numerodeljugadoractual);
        var $elmeudialeg = $("#dialog-modal").dialog({
            autoOpen: false,
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "Obrir nova jugada": function() {
                    //alert("Obrir carta="+carta_aux2.getPal());
                    console.log(partida.getJugador(numerodeljugadoractual));
                    //alert(numerodeljugadoractual);
                    partida.getJugador(numerodeljugadoractual).afegirJugada(carta_aux2);
                    $(this).dialog("close");
                    return true;
                },
                "Continuar amb la mateixa": function() {
                  //alert(numerodeljugadoractual);
                    partida.getJugador(numerodeljugadoractual).afegir_carta_a_jugada_actual(carta_aux2);
                    $(this).dialog("close");
                    return false;
                }
            }
        });
        return $elmeudialeg.dialog('open');
    }

    this.invalidarJugada = function(index_jugada, tipus_jugador) {
        var top = "490px";
        var left = "540px";
        if (tipus_jugador == "PLAYER1") {
            top = "170px";
            left = 50 + index_jugada * 170;
        } else if (tipus_jugador == "PLAYER2") {
            top = "170px";
            left = left = 600 + index_jugada * 170;
        } else if (tipus_jugador == "PLAYER3") {
            top = "170px";
            left = left = 1140 + index_jugada * 170;
        } else {
            top = "490px";
            left = "540px";
        }
        var $d = $("<div>")
            .css('position', 'absolute')
            .css('z-index', '5')
            .css('top', top)
            .css('left', left)
            .appendTo('#tapet');

        $("<img>").attr('width', '150px')

        .attr('title', 'valida')
            .attr('src', 'images/x.png')
            .appendTo($d)

    }
    this.pintarWin = function(index_jugada, tipus_jugador) {
        var top = "490px";
        var left = "540px";
        if (tipus_jugador == "PLAYER1") {
            top = "170px";
            left = 50 + index_jugada * 170;
        } else if (tipus_jugador == "PLAYER2") {
            top = "170px";
            left = 600 + index_jugada * 170;
        } else if (tipus_jugador == "PLAYER3") {
            top = "170px";
            left = 1140 + index_jugada * 170;
        } else {
            top = "490px";
            left = "540px";
        }
        var $d = $("<div>")
            .css('position', 'absolute')
            .css('z-index', '5')
            .css('top', top)
            .css('left', left)
            .appendTo('#tapet');

        $("<img>").attr('width', '150px')

        .attr('title', 'valida')
            .attr('src', 'images/check.png')
            .appendTo($d)
    }

} //End class setimigEngine

module.exports = setimigEngine;
