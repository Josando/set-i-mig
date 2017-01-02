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
    if (cvalue && cvalue!== ""){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

function getModalTemplate(idTemplate,callback){
  //If exists in the DOM tree we don't call via ajax again
  alert(idTemplate);

  if ($('#'+idTemplate).length){
      $('#'+idTemplate).show();
      callback($('#'+idTemplate));
  }else{
      $.ajax({
            url: "template/"+idTemplate,
            type: 'GET',
            success: function(data){
                $('body').append(data);
                $('#'+idTemplate).fadeIn("slow");
                callback($('#'+idTemplate));
            },
            error: function(data) {
                console.log('woops ERROR calling! '+idTemplate); //or whatever
            }
        });
   }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
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

/**
 * Show nickname name and/or image if profile has been defined
 * @returns {Boolean}
 */

function showPlayerProfile(){
  var user = getCookie("username");

  var user1 = user.split('|')[0];
  var user2 = user.split('|')[1];
  var user3 = user.split('|')[2];
  var flag = false;

if(user2 == 'null'){
  if (user1 && user1!==""){
    //var $nicknameElement=$("#playerLeft"); EXAM LEAVE
    //$nicknameElement.text(user);EXAM LEAVE
    var dataImage = localStorage.getItem('imgData');
    if (dataImage){
      var $profile=$('#profileImg');
      $profile.css("position","absolute").hide();//EXAM
      $profile.attr("src","data:image/jpg;base64," + dataImage).width(48).height(64);
      //$("body").prepend($profileImg); EXAM LEAVE
    }
    flag = true;
  }
}else if(user3 == 'null'){
  if (user1 && user1!==""){
    //var $nicknameElement=$("#playerLeft"); EXAM LEAVE
    //$nicknameElement.text(user);EXAM LEAVE
    var dataImage = localStorage.getItem('imgData');
    if (dataImage){
      var $profile=$('#profileImg');
      $profile.css("position","absolute").hide();//EXAM
      $profile.attr("src","data:image/jpg;base64," + dataImage).width(48).height(64);
      //$("body").prepend($profileImg); EXAM LEAVE
    }
    var dataImage2 = localStorage.getItem('imgData2');
    if (dataImage2){
      var $profile2=$('#profileImg2');
      $profile2.css("position","absolute").hide();//EXAM
      $profile2.attr("src","data:image/jpg;base64," + dataImage2).width(48).height(64);
      //$("body").prepend($profileImg); EXAM LEAVE
    }
    flag = true;
  }
}else{
  if (user1 && user1!==""){
    //var $nicknameElement=$("#playerLeft"); EXAM LEAVE
    //$nicknameElement.text(user);EXAM LEAVE
    var dataImage = localStorage.getItem('imgData');
    if (dataImage){
      var $profile=$('#profileImg');
      $profile.css("position","absolute").hide();//EXAM
      $profile.attr("src","data:image/jpg;base64," + dataImage).width(48).height(64);
      //$("body").prepend($profileImg); EXAM LEAVE
    }

    var dataImage2 = localStorage.getItem('imgData2');
    if (dataImage2){
      var $profile2=$('#profileImg2');
      $profile2.css("position","absolute").hide();//EXAM
      $profile2.attr("src","data:image/jpg;base64," + dataImage2).width(48).height(64);
      //$("body").prepend($profileImg); EXAM LEAVE
    }

    var dataImage3 = localStorage.getItem('imgData2');
    if (dataImage3){
      var $profile3=$('#profileImg3');
      $profile3.css("position","absolute").hide();//EXAM
      $profile3.attr("src","data:image/jpg;base64," + dataImage3).width(48).height(64);
      //$("body").prepend($profileImg); EXAM LEAVE
    }

    flag = true;
  }

}
    return flag;
}

/** Check if there is a cookie and/or image profile defined to identify user. If not we force definition */
function checkIfProfileHasBeenDefined(numberOfPlayers) {

    var user = getCookie("username");

    /*if (user !== "" && numberOfPlayers == 1) {
        showPlayerProfile();
        callBackFunction;
    } else */if(numberOfPlayers == 1){
        getModalTemplate("modal-player-profile",function($template){
            $("#blah").hide();
            $("#form2").hide();
            $("#form3").hide();

            var $nickname = $("#nickname_");
            $( "#submitPlayerInformation" ).click(function() {
              if($nickname.val()){ setCookie("username", $nickname.val()+"|null|null", 365) }

              if (showPlayerProfile()){
                $template.hide();
                main.singletonContext.getInstance().iniciar_joc(1);
              }
            });

            $("#imgProfile").change(function(){
              readFileAndPreviewFromLocalFileSystem(this);
            });

        });

    }

    if(numberOfPlayers == 2){
        getModalTemplate("modal-player-profile",function($template){
            $("#blah").hide();
            $("#blah2").hide();
            $("#form3").hide();

            var $nickname = $("#nickname_");
            var $nickname2 = $("#nickname_2");
            $( "#submitPlayerInformation" ).click(function() {
              console.log($nickname.val() + " " + $nickname2.val());
              if($nickname.val() && $nickname2.val()){
                setCookie("username", $nickname.val()+"|"+$nickname2.val()+"|null", 365)

              }

              if (showPlayerProfile()){
                $template.hide();
                main.singletonContext.getInstance().iniciar_joc(2);
              }
            });

            $("#imgProfile").change(function(){
              readFileAndPreviewFromLocalFileSystem(this);
            });

        });

    }


    if(numberOfPlayers == 3){
        getModalTemplate("modal-player-profile",function($template){
            $("#blah").hide();
            $("#blah2").hide();
            $("#blah3").hide();

            var $nickname = $("#nickname_");
            var $nickname2 = $("#nickname_2");
            var $nickname3 = $("#nickname_3");
            $( "#submitPlayerInformation" ).click(function() {

              console.log($nickname.val() + " " + $nickname2.val() + " " + $nickname3.val());

              if($nickname.val() && $nickname2.val() && $nickname3.val()){
                setCookie("username", $nickname.val()+"|"+$nickname2.val()+"|" + $nickname3.val(), 365)
              }

              if (showPlayerProfile()){
                $template.hide();
                main.singletonContext.getInstance().iniciar_joc(3);
              }
            });

            $("#imgProfile").change(function(){
              readFileAndPreviewFromLocalFileSystem(this);
            });

        });

    }

}

//Encode an image using base64 previously to store it on LocalStorage
//Note: In HTML the img tag can load an image pointing src attribute to an URL or putting there the image in base64
function getBase64Image(img) {

    var $canvas = $("<canvas/>").attr("width",img.width).attr("height",img.height);

    var ctx = $canvas[0].getContext("2d");
    ctx.drawImage(img, 0, 0,48,64);
    var dataURL = $canvas[0].toDataURL("image/jpg");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
//We convert before saving to base64
function saveImageToLocalStorage(){
  var imgData = getBase64Image($('#blah')[0]);
  localStorage.setItem("imgData", imgData);
}

//We choose a image profile from local system and we do a preview
function readFileAndPreviewFromLocalFileSystem(input) {
  if (input.files && input.files[0]) {
      $('#blah').show();
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#blah').attr('src',e.target.result);
        saveImageToLocalStorage();
      };
      reader.readAsDataURL(input.files[0]);
  }
}

function chooseGameMode(context_){
    if (!context_) context_ = main.singletonContext.getInstance(); //EXAM
    getModalTemplate("modal-game-mode",function($template){

        $( "#single" ).click(function() {
            //checkIfProfileHasBeenDefined(main.singletonContext.getInstance().iniciar_joc(1), 1);
            checkIfProfileHasBeenDefined(1);
            $template.fadeOut("slow");
        });
        $( "#two" ).click(function() {
            //checkIfProfileHasBeenDefined(main.singletonContext.getInstance().iniciar_joc(2), 2);
            checkIfProfileHasBeenDefined(2);
            $template.fadeOut("slow");
        });
        $( "#three" ).click(function() {
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
