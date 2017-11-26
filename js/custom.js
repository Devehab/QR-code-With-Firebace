
var size= 128;
 var textL;
$(document).ready(function(){
  $('#create').on('click', qr_create);
  $("#qr-text").on('change keyup paste', qr_create);
$('#qr-text').trigger('autoresize');
 $('select').material_select();





$('select').on('change', function() {
textL = $('#qr-text').val().length;
 // alert( this.value );
 console.log(this.value);
 var num = this.value;
 var textN = $("#qr-text").val();

  console.log(textL);

  switch(num) {
    case '1':
    size= 128;

if (textL > 100) {

Materialize.toast('QRCode size does not fit with text!', 4000);

}
   

    break;
    case '2':
    size= 256;
    if (textL > 200) {

Materialize.toast('QRCode size does not fit with text!', 4000);

}
    break;
    case '3':
    size= 512;
    if (textL > 300) {

Materialize.toast('QRCode size does not fit with text!', 4000);

}
    break;
  
}
    $('#output').empty();
      $('#output').qrcode({
     width: size,
     height: size,
    // correctLevel: 0,
    render: 'canvas',
    fill: '#fff',
    text: textN
  });

})
 



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  
    
  } else {
     window.location.replace('Sign_in.html');
  }
});









  $( "#SaveDevice2" ).click(function() {
var d = new Date();
var n = d.toDateString();
var filename = 'QRCode - '+ n+' - '+size+'PX';

$( "#output canvas" ).attr('id', 'my-canvas');

  var canvas = document.getElementById("my-canvas"), ctx = canvas.getContext("2d");
// draw to canvas...
canvas.toBlob(function(blob) {
    saveAs(blob, filename);
});

});


  $( "#Save" ).click(function() {
var d = new Date();
var n = d.toDateString();
var filename = 'QRCode - '+ n+' - '+size+'PX';

$( "#output canvas" ).attr('id', 'my-canvas');

  var canvas = document.getElementById("my-canvas"), ctx = canvas.getContext("2d");
// draw to canvas...
canvas.toBlob(function(blob) {
    saveAs(blob, filename);
});

});

  
});







var storage = {
  get: (function(key) {
    return JSON.parse(localStorage.getItem(key));
  }),

  set: (function(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
    // var data = {};
    // data[key] = value;
    // chrome.storage.sync.set(data);
  }),

  has: (function(key) {
    if(localStorage.hasOwnProperty(key)) {
      return true;
    } else {
      return false;
    }
  }),

  remove: (function(key) {
    if(localStorage.hasOwnProperty(key)) {
      localStorage.removeItem(key);
      // chrome.storage.sync.remove(key);
    }
  }),
};

var qr_text = 'qr.text';

// Convert UTF-16 charset to UTF-8
// Reference: http://suflow.iteye.com/blog/1687396
function utf16to8(str) {
    var out, i, len, c;
    out = '';
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
          out += str.charAt(i);
      } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
          out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
          out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      } else {
          out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
          out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
      }
    }
    return out;
}

function qr_create() {
  var text = '';
  if(storage.has(qr_text)) {
    text = storage.get(qr_text);
    $('textarea#qr-text').val(text);
  } else {
    text = $('textarea#qr-text').val();
  }
  text = utf16to8(text).trim();
  if(text.length > 1276 || text == '') {
    text = chrome.i18n.getMessage('invalid_text');
    $('textarea#qr-text').val(text);
  }

  // console.log(text)
  $('#output').empty();
  $('#output').qrcode({
     width: size,
     height: size,
    // correctLevel: 0,
    render: 'canvas',
    fill: '#fff',
    text: text
  });
  storage.remove(qr_text);
}


function init_qr_create() {
  var text = ' ';


  // console.log(text)
  $('#output').empty();
  $('#output').qrcode({
     width: size,
     height: size,
    // correctLevel: 0,
    render: 'canvas',
    fill: '#fff',
    text: 'Hello'
  });
  storage.remove(qr_text);
}



$(function(){
  qr_create();
  
});




  $( "#SaveDevice" ).click(function() {
var d = new Date();
var textDate = d.toDateString();
var filename = 'QRCode - '+ textDate +' - '+size+'PX';

var text = $('#qr-text').val();
var user = firebase.auth().currentUser;
 var uid = user.uid;

if(text.trim().length < 1)
{
    alert("Please Enter Text...");
    return; 
}else{

  var data = { text: text , Date: textDate };
var MyPath = firebase.database().ref("DataQR/" +uid + '/');
MyPath.push(data)
  .then(function() {
    console.log('succeeded');
   window.location.replace('list.html');
  })
  .catch(function(error) {
    console.log("failed: " + error.message);
     alert (error);
  });
}

});






function Scroll(){
var footer_M = document.getElementById('footer_M');

var nlist = document.getElementById('nlist');
var nlistLen = nlist.offsetHeight;

var yscreen =window.innerHeight;
var chyscreen = yscreen - 660 + "px";
var chyscreen2 = yscreen - 660 ;
//console.log(chyscreen);

if(0<chyscreen2){
  footer_M.style.marginTop = chyscreen ;
}

}

Scroll();
window.addEventListener("resize",Scroll);


function signOut() {
  firebase.auth().signOut().then(function() {
  window.location.replace('Sign_in.html');
}, function(error) {
  console.log(' An error happened.' , error);
   alert (error);
});
}



// $("#selectid").val("81")

// var selectid = document.getElementById("selectid");
// selectid.value = "81";


init_qr_create();




