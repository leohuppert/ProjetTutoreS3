$(document).ready(function() {

	var reponse = document.querySelector('#reponse');

	$("#form_connexion").on('submit', function(e) {

		e.preventDefault();

		$('.mdl-spinner').toggleClass('is-active');

		var $this = $(this);

		$.ajax({
			url: urlServeur + $this.attr('action'),
			type: $this.attr('method'),
			data: $this.serialize(),
			dataType: 'json',
			success: function(json) {

				$('.mdl-spinner').toggleClass('is-active');

				if(json.reponse === 'ok')
				{
					$("#connexion").fadeOut(1000);
					window.location.assign("accueil.html");
				}
				else
				{
					var data = {
						message: json.reponse,
						timeout: 2500
					};

					reponse.MaterialSnackbar.showSnackbar(data);
				}
			}
		});
	});
});
