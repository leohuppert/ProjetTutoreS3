var absents = [];

$(document).ready(function() {

 	$(document).on('click', '.mdl-checkbox', function() {
 		var _tableRow = $(this).parents("tr:first");
  		if ($(this).hasClass("is-checked") === false) {
    	_tableRow.addClass("is-selected");
  		} else {
    	_tableRow.removeClass("is-selected");
 		 }
 	})

 	$('#btn').on('click', function() {

		$('#donnees tr').each(function() {
		 	if($(this).hasClass('is-selected')) {
		 		var id = $(this).attr('id')
		 		var nom = $(this).find('.nom').html()
		 		var prenom = $(this).find('.prenom').html()

		 		var personne = {
		 			id: id,
		 			nom: nom,
		 			prenom: prenom,
		 		}

		 		absents.push(personne)
		 	}
		 })

		var message = 'Absents saisis :\n\n';
		for(var i=0; i<absents.length; i++) {
			message += absents[i]['nom'] + ' ' + absents[i]['prenom'] + '\n'
		}
		
		//Alerte Cordova
		/*navigator.notification.alert(
			message,
			function() {

			},
			'Confirmation',
			'OK');*/
	})

	$.ajax({
		url: 'http://localhost/projetTutore/serveur/get_absents.php',
		type: 'get',
		dataType: 'json',
		success: function(json) {
			var table = $('#donnees');
			var lignes = '';

			for(var i=0; i<json.reponse.length; i++) {

					lignes = '<tr id="' + json.reponse[i]['no_etudiant'] + '">' +
					'<td>' +
					'<label ' +
					'class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select"' +
					' for="et' + json.reponse[i]['no_etudiant'] + '">' +
					'<input type="checkbox" id="et' + json.reponse[i]['no_etudiant'] + '" class="mdl-checkbox__input" />' +
					'</label>' +
					'</td>' +
					'<td class="mdl-data-table__cell--non-numeric nom">' + json.reponse[i]['nom'] + '</td>' +
					'<td class="mdl-data-table__cell--non-numeric prenom">' + json.reponse[i]['prenom'] + '</td>' +
					'</tr>'

					$('#donnees').append(lignes)

					componentHandler.upgradeAllRegistered()
			}

			$('.mdl-spinner').toggleClass('is-active')
		}
	})
})