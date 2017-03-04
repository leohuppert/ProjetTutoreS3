//Verifie la saisie des séances
function coloreCours() {

	$('#container_cours .cours').each(function() {
		var div = $(this);

		$.ajax({
			url: urlServeur + 'verifie_saisie.php',
			type: 'get',
			dataType: 'json',
			data: 'no_seance=' + $(this).attr('id'),
			success: function(json) {

				//ROUGE_SAISIE BLOQUEE A AJOUTER

				if(json.reponse === 'saisie') {
					//Orange
					div.addClass('deja-saisi')
				}
				else if(json.reponse === 'pas_saisie') {
					//Vert
					div.addClass('non-saisi')
				}
			}
		})
	})
}
