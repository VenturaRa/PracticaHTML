   window.addEventListener("load", function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("cabecera").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "nav.html", true);
xhttp.send();
},false);
