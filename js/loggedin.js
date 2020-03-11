$(document).ready(function() {
    document.getElementById("welcome").innerHTML = "Bem vindo " + sessionStorage.getItem("name") + "!";

    $("#exit").click(function () {
        sessionStorage.clear();
        window.location.replace("./index.html");
    })
})