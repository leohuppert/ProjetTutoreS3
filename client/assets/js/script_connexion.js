$(document).ready(function() {


	var reponse = document.querySelector('#reponse');
	var $login = $("#login");
	var $pass = $("#password");
	var urlServeur = 'http://localhost/projetTutore/serveur/';

	$("#form_connexion").on('submit', function(e) {

		e.preventDefault();

		var $this = $(this);

		console.log($this.serialize());

		$.ajax({

			url: urlServeur + $this.attr('action'),
			type: $this.attr('method'),
			data: $this.serialize(),
			dataType: 'json',
			success: function(json) {

				if(json.reponse === 'ok')
				{
					$("#connexion").append("<p>Connexion réussie</p>");
				}
				else
				{
					var data = {
						message: json.reponse,
						timeout: 4000
					};

					reponse.MaterialSnackbar.showSnackbar(data);
				}
			}
		});
	});
});