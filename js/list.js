



function Start() {

   
    var scores;

    var ref_v = firebase.database().ref("DataQR/" + window.User_ID);

    ref_v.limitToFirst(20).orderByKey().on('value', getData, errData);

    function getData(data){
         scores = data.val();
        var keys = Object.keys(scores);
        console.log(keys);


        var myNode = document.getElementById("nlist");
        myNode.innerHTML = '';




        for (var i = 0; i < keys.length; i++) {
            var k =keys[i];

            var text = scores[k].text;
            var date_v = scores[k].Date;
       
     
        console.log(text);
        console.log(date_v);
        console.log(k);
        

        var para = document.createElement("li");
        var t22 = document.createTextNode(" ");
        para.appendChild(t22); 
        document.getElementById("nlist").appendChild(para);
            
            para.setAttribute('id', k);  
            para.setAttribute('class', "card-panel hoverable"); 


        var text_vl = document.createElement("h5");        
        var t = document.createTextNode(text);       
        text_vl.appendChild(t);                                
        document.getElementById(k).appendChild(text_vl);   


        var date_vl = document.createElement("p");        
        var t = document.createTextNode(date_v);       
        date_vl.appendChild(t);                                
        document.getElementById(k).appendChild(date_vl);   


        var botton_n = document.createElement("a");        
        var t = document.createTextNode("Delete");       
        botton_n.appendChild(t);
        botton_n.setAttribute('class', "waves-effect waves-light btn red botton_n");
        var fu_onclick = "remove('"+ k + "')";
        botton_n.setAttribute('onclick' , fu_onclick);                                
        document.getElementById(k).appendChild(botton_n);


        var botton_nn = document.createElement("a");        
        var t = document.createTextNode("Edit");       
        botton_nn.appendChild(t);
        botton_nn.setAttribute('class', "waves-effect waves-light btn modal-trigger btn botton_n_2");
        var fu_onclick = "edit_Id('"+k+"' , '"+text+"') ";
        botton_nn.setAttribute('onclick' , fu_onclick); 
        botton_nn.setAttribute('href' , '#modal2');                               
        document.getElementById(k).appendChild(botton_nn);

        var botton_nnn = document.createElement("a");        
        var t = document.createTextNode("Show QR Code");       
        botton_nnn.appendChild(t);
        botton_nnn.setAttribute('class', "waves-effect waves-light btn modal-trigger blue botton_n_2");
        
        var fu_onclick = " show_Id('"+k+"' , '"+text+"') ";
        botton_nnn.setAttribute('onclick' , fu_onclick);
         botton_nnn.setAttribute('href' , '#modal1');                               
        document.getElementById(k).appendChild(botton_nnn);





         
        }
    }




    function errData(err){
        console.log('Error!');  
        console.log(err);   
    }



}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  
window.User_ID = user.uid +'/';
Start();
    
  } else {
     window.location.replace('Sign_in.html');
  }
});




function remove(key) {

   var MyPath = firebase.database().ref("DataQR/" + window.User_ID);
MyPath.child(key).remove().then(function() {
    console.log("Delete succeeded.");
    // alert("");
      Materialize.toast('Delete succeeded. ' , 3000);
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });

}


  $("#qr-text").on('change keyup paste', qr_create2);

function qr_create2() {
var text=  $('#qr-text').val();

  $('#output2').empty();
      $('#output2').qrcode({
     width: 200,
     height: 200,
    // correctLevel: 0,
    render: 'canvas',
    fill: '#fff',
    text: text
  });

}


var keyEdit ='';
function edit_Id(key ,text) {

keyEdit = key;

console.log("Ehab");

$('#qr-text').val(text);



  $('#output2').empty();
      $('#output2').qrcode({
     width: 200,
     height: 200,
    // correctLevel: 0,
    render: 'canvas',
    fill: '#fff',
    text: text
  });



/*
var MyPath = firebase.database().ref('DROP3YMbr0XRgMJY9aRgVJy2x7p1/' + key + '/');

MyPath.update(data).then(function() {
    console.log(' succeeded');
  })
  .catch(function(error) {
    console.log(' failed' + error.message);
  });
*/

}


function chlickIdit() {
var d = new Date();
var textDate = d.toDateString();
var text = $('#qr-text').val();

var data = { text: text , Date: textDate };

var MyPath = firebase.database().ref("DataQR/" + window.User_ID + keyEdit + '/');

MyPath.update(data).then(function() {
    console.log(' succeeded');
    $('#modal2').modal('close');
     Materialize.toast('Change to : ' + text, 3000);
      


  })
  .catch(function(error) {
    console.log(' failed' + error.message);
  });
}




  $(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();


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



function show_Id(key ,text) {

// $('#modal1').modal('open');

 $("#textch").text(text);


  $('#output').empty();
      $('#output').qrcode({
     width: 265,
     height: 265,
    // correctLevel: 0,
    render: 'canvas',
    fill: '#fff',
    text: text
  });


}




