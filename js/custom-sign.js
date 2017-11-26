
      //---------------------------- Check User

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     window.location.replace('index.html');
    
//   } else {
//      console.log("User is signed out .");
//   }
// });


function Scroll(){
var footer_M = document.getElementById('footer_M');
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