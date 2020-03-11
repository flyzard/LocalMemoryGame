$(document).ready(function() {
	if (typeof (Storage) !== "undefined") {
		$("#register").click(function() {
			var name = $("#nome").val();
			var email = $("#email").val();
			var password = $("#password").val();

			if (name != "" && validateEmail(email) && password != "") {
				if (localStorage.getItem(email) != undefined) {
					alert("O utilizador " + email + " já se encontra registado!");	
					return;
				}

				var user = {password: password, name: name, stats: []};
				
				localStorage.setItem(email, JSON.stringify(user));
				window.location.replace("./index.html");
			} else {
				alert("Por favor complete todos os campos de formulário!");
			}
		});

		$("#login").click(function () {
			var email = $("#email").val();
			var password = $("#password").val();

			if (validateEmail(email) && password != "") {
				if (localStorage.getItem(email) == undefined) {
					alert("O utilizador " + email + " não se encontra registado!");
					return;
				}

				var user = JSON.parse(localStorage.getItem(email));
				if (password == user.password) {
					sessionStorage.setItem('name', user.name);
					sessionStorage.setItem('email', email);
					window.location.replace("./menu.html");
				}
			} else {
				alert("Por favor complete todos os campos de formulário!");
			}
		});

	} else {
		// Sorry! No Web Storage support..

		console.log("Este browser não suporta esta aplicação!")
	}

	function validateEmail(mail) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return (true)
		}
		return (false)
	}
});