"use strict";
/*jslint browser:true */
/*jslint node:true */
/*global $ */

/**
 * Utils module.
 * @module utils
 * @see module:utils
 */

//var singleContext = require('./patterns/singleton/singletonContext');
var main = require('./main');

function setCookie(cname, cvalue, exdays) {
    if (cvalue && cvalue !== "") {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getModalTemplate(idTemplate, callback) {
    //If exists in the DOM tree we don't call via ajax again
    $("#scorePlayer1").hide();
    $("#scorePlayer2").hide();
    $("#scorePlayer3").hide();
    if ($('#' + idTemplate).length) {
        $('#' + idTemplate).show();
        callback($('#' + idTemplate));
    } else {
        $.ajax({
            url: "template/" + idTemplate,
            type: 'GET',
            success: function(data) {
                $('body').append(data);
                $('#' + idTemplate).fadeIn("slow");
                callback($('#' + idTemplate));
            },
            error: function(data) {
                console.log('woops ERROR calling! ' + idTemplate); //or whatever
            }
        });
    }
}

/**
 * Show nickname name and/or image if profile has been defined
 * @returns {Boolean}
 */

function showPlayerProfile() {
    var user = getCookie("username");

    var user1 = user.split('|')[0];
    var user2 = user.split('|')[1];
    var user3 = user.split('|')[2];
    var flag = false;

    if (user2 == 'null') {
        if (user1 && user1 !== "") {

            $('#player1').append(user1);

            var dataImage = localStorage.getItem('imgData');
            if (dataImage) {
                var profileImg = $('<img id="p1">');
                profileImg.attr('src', "data:image/jpg;base64," + dataImage);

                profileImg.width = 48;
                profileImg.height = 64;

                $('#player1').after(profileImg);

            }
            flag = true;
            $("#scorePlayer1").show();
        }
    } else if (user3 == 'null') {
        if (user1 && user1 !== "") {

            $('#player1').append(user1);
            var dataImage = localStorage.getItem('imgData');
            if (dataImage) {
                var profileImg = $('<img id="p1">');
                profileImg.attr('src', "data:image/jpg;base64," + dataImage);

                profileImg.width = 48;
                profileImg.height = 64;

                $('#player1').after(profileImg);
            }
            $('#player2').append(user2);
            var dataImage2 = localStorage.getItem('imgData2');
            if (dataImage2) {
                var profileImg2 = $('<img id="p2">');
                profileImg2.attr('src', "data:image/jpg;base64," + dataImage2);

                profileImg2.width = 48;
                profileImg2.height = 64;

                $('#player2').after(profileImg2);
            }
            flag = true;
            $("#scorePlayer1").show();
            $("#scorePlayer2").css("display", "block");
            $("#scorePlayer2").show();
        }
    } else {
        if (user1 && user1 !== "") {

            $('#player1').append(user1);
            var dataImage = localStorage.getItem('imgData');
            if (dataImage) {
                var profileImg = $('<img id="p1">');
                profileImg.attr('src', "data:image/jpg;base64," + dataImage);

                profileImg.width = 48;
                profileImg.height = 64;

                $('#player1').after(profileImg);
            }
            $('#player2').append(user2);
            var dataImage2 = localStorage.getItem('imgData2');
            if (dataImage2) {
                var profileImg2 = $('<img id="p2">');
                profileImg2.attr('src', "data:image/jpg;base64," + dataImage2);

                profileImg2.width = 48;
                profileImg2.height = 64;

                $('#player2').after(profileImg2);
            }

            $('#player3').append(user3);
            var dataImage3 = localStorage.getItem('imgData3');
            if (dataImage3) {
                var profileImg3 = $('<img id="p3">');
                profileImg3.attr('src', "data:image/jpg;base64," + dataImage3);

                profileImg3.width = 48;
                profileImg3.height = 64;

                $('#player3').after(profileImg3);
            }

            flag = true;
            $("#scorePlayer1").show();
            $("#scorePlayer2").show();
            $("#scorePlayer3").show();

        }

    }
    return flag;
}

/** Check if there is a cookie and/or image profile defined to identify user. If not we force definition */
function checkIfProfileHasBeenDefined(numberOfPlayers) {

    var user = getCookie("username");

    if (numberOfPlayers == 1) {
        getModalTemplate("modal-player-profile", function($template) {
            $("#blah").hide();
            $("#form2").hide();
            $("#form3").hide();

            var $nickname = $("#nickname_");
            $("#submitPlayerInformation").click(function() {

                if ($nickname.val()) {
                    setCookie("username", $nickname.val() + "|null|null", 365)
                }

                if (showPlayerProfile()) {
                    $template.hide();
                    main.singletonContext.getInstance().iniciar_joc(1);
                    $("#linkestilo").attr("href", "styles/my_style0.css");
                    // $("#tancar_jugada").css("left", 543);
                    ////////////////////////////////////////////////////////////
                  /*  //Carta1
                       //cartes
                       document.getElementById('meua_jugada0').style.top = '180px';
                       document.getElementById('meua_jugada0').style.left = '543px'; //30 - 513

                       if(document.getElementById('meua_jugada1')){
                           document.getElementById('meua_jugada1').style.top = '180px';
                           document.getElementById('meua_jugada1').style.left = '713px'; //30
                       }

                       if(document.getElementById('meua_jugada2')){
                           document.getElementById('meua_jugada2').style.top = '180px';
                           document.getElementById('meua_jugada2').style.left = '883px'; //30
                       }

                       if(document.getElementById('meua_jugada3')){
                           document.getElementById('meua_jugada3').style.top = '180px';
                           document.getElementById('meua_jugada3').style.left = '1053px'; //30
                       }

                       document.getElementById('p1').style.top = '60px';
                       document.getElementById('p1').style.left = '680px';

                       //puntuacio
                       document.getElementById('scorePlayer1').style.top = '55px';
                       document.getElementById('scorePlayer1').style.left = '520px';

                       //boto tancar jugada
                       document.getElementById('tancar_jugada').style.top = '130px';
                       document.getElementById('tancar_jugada').style.left = '530px';

                       //nom
                       document.getElementById('player1').style.top = '55px';
                       document.getElementById('player1').style.left = '570px';
                   *///
                }
            });

            $("#imgProfile").change(function() {
                readFileAndPreviewFromLocalFileSystem(this, 1);
            });

        });

    }

    if (numberOfPlayers == 2) {
        getModalTemplate("modal-player-profile", function($template) {
            $("#blah").hide();
            $("#blah2").hide();
            $("#form3").hide();

            var $nickname = $("#nickname_");
            var $nickname2 = $("#nickname_2");
            $("#submitPlayerInformation").click(function() {
                console.log($nickname.val() + " " + $nickname2.val());
                if ($nickname.val() && $nickname2.val()) {
                    setCookie("username", $nickname.val() + "|" + $nickname2.val() + "|null", 365)

                }

                if (showPlayerProfile()) {
                    $template.hide();
                    main.singletonContext.getInstance().iniciar_joc(2);
                    $("#linkestilo").attr("href", "styles/my_style1.css");
                    $("#tancar_jugada").css("left", 543);
                }
            });

            $("#imgProfile").change(function() {
                readFileAndPreviewFromLocalFileSystem(this, 1);
            });
            $("#imgProfile2").change(function() {
                readFileAndPreviewFromLocalFileSystem(this, 2);

            });

        });

    }

    if (numberOfPlayers == 3) {
        getModalTemplate("modal-player-profile", function($template) {
            $("#blah").hide();
            $("#blah2").hide();
            $("#blah3").hide();

            var $nickname = $("#nickname_");
            var $nickname2 = $("#nickname_2");
            var $nickname3 = $("#nickname_3");
            $("#submitPlayerInformation").click(function() {

                console.log($nickname.val() + " " + $nickname2.val() + " " + $nickname3.val());

                if ($nickname.val() && $nickname2.val() && $nickname3.val()) {
                    setCookie("username", $nickname.val() + "|" + $nickname2.val() + "|" + $nickname3.val(), 365)
                }

                if (showPlayerProfile()) {
                    $template.hide();
                    main.singletonContext.getInstance().iniciar_joc(3);
                }
            });

            $("#imgProfile").change(function() {
                readFileAndPreviewFromLocalFileSystem(this, 1);
            });
            $("#imgProfile2").change(function() {
                readFileAndPreviewFromLocalFileSystem(this, 2);

            });

            $("#imgProfile3").change(function() {
                readFileAndPreviewFromLocalFileSystem(this, 3);
            });

        });

    }

}

//Encode an image using base64 previously to store it on LocalStorage
//Note: In HTML the img tag can load an image pointing src attribute to an URL or putting there the image in base64
function getBase64Image(img) {

    var $canvas = $("<canvas/>").attr("width", img.width).attr("height", img.height);

    var ctx = $canvas[0].getContext("2d");
    ctx.drawImage(img, 0, 0, 48, 64);
    var dataURL = $canvas[0].toDataURL("image/jpg");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
//We convert before saving to base64
function saveImageToLocalStorage(numberOfPlayers) {
    switch (numberOfPlayers) {
        case 1:
            var imgData = getBase64Image($('#blah')[0]);
            localStorage.setItem("imgData", imgData);
            break;
        case 2:
            var imgData2 = getBase64Image($('#blah2')[0]);
            localStorage.setItem("imgData2", imgData2);
            break;
        case 3:
            var imgData3 = getBase64Image($('#blah3')[0]);
            localStorage.setItem("imgData3", imgData3);
            break;
    }

}

//We choose a image profile from local system and we do a preview
function readFileAndPreviewFromLocalFileSystem(input, players) {

    if (players == 1) {
        if (input.files && input.files[0]) {
            $('#blah').show();
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#blah').attr('src', e.target.result);
                saveImageToLocalStorage(1);
            };
            reader.readAsDataURL(input.files[0]);
        }
    } else if (players == 2) {
        if (input.files && input.files[0]) {
            $('#blah2').show();
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#blah2').attr('src', e.target.result);
                saveImageToLocalStorage(2);
            };
            reader.readAsDataURL(input.files[0]);
        }
    } else if (players == 3) {
        if (input.files && input.files[0]) {
            $('#blah3').show();
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#blah3').attr('src', e.target.result);
                saveImageToLocalStorage(3);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
}

function chooseGameMode(context_) {
    if (!context_) context_ = main.singletonContext.getInstance(); //EXAM
    getModalTemplate("modal-game-mode", function($template) {

        $("#single").click(function() {
            //checkIfProfileHasBeenDefined(main.singletonContext.getInstance().iniciar_joc(1), 1);
            checkIfProfileHasBeenDefined(1);
            $template.fadeOut("slow");
        });
        $("#two").click(function() {
            //checkIfProfileHasBeenDefined(main.singletonContext.getInstance().iniciar_joc(2), 2);
            checkIfProfileHasBeenDefined(2);
            $template.fadeOut("slow");
        });
        $("#three").click(function() {
            //checkIfProfileHasBeenDefined(main.singletonContext.getInstance().iniciar_joc(3), 3);
            checkIfProfileHasBeenDefined(3);
            $template.fadeOut("slow");
        });

    });
}

/** Before start any game we check if user has defined a profile. */
module.exports.checkIfProfileHasBeenDefined = checkIfProfileHasBeenDefined;
module.exports.getModalTemplate = getModalTemplate;
module.exports.chooseGameMode = chooseGameMode;
module.exports.getCookie = getCookie;
