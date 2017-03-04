$(document).ready(function() {

	$('#switch-trombi').on('click', function() {
		var btnTrombi = $('#div-switch-trombi').find('.mdl-switch');

		//Si le trombi n'a pas encore été initialisé
		if((!btnTrombi.hasClass('is-checked')) && ($('#donnees-trombi').children().length === 0)) {
			$('#liste').hide();

			$('.mdl-spinner').toggleClass('is-active');
			//Charge les noms + photos
			//Quand fini, arrete le spinner
			$.ajax({
				url: urlServeur + 'get_absents.php',
				type: 'get',
				dataType: 'json',
				success: function(json) {
					var lignes = '';
					var nom_photo='';

					for(var i=0; i<json.reponse.length; i++) {

						//Si l'étudiant n'a pas de photo enregistrée dans la base, on charge un fichier par défaut
						if(json.reponse[i]['nom_fichier'] === undefined || json.reponse[i]['nom_fichier'] === '')
							nom_photo = 'default.jpg';
						else
							nom_photo = json.reponse[i]['nom_fichier'];

						lignes = '<tr id="' + json.reponse[i]['no_etudiant'] + '">' +
						'<td class="mdl-data-table__cell--non-numeric nom">' + json.reponse[i]['nom'] + ' ' + json.reponse[i]['prenom'] + '</td>' +
						'<td class="mdl-data-table__cell--non-numeric">' +
						'<img class="photo" width="120" height="100" src="' + urlServeur + 'photos/' + nom_photo + '"/>' + '</td>' +
						'</tr>';

						$('#donnees-trombi').append(lignes);

						componentHandler.upgradeAllRegistered();
					}

					$('.mdl-spinner').toggleClass('is-active');

					//Coche les photos
					cochePhotos();
				}
			})

			$('#trombi').show();

			compteurAbsentsTrombi = compteurAbsents
			$('#compteur-absents').html(compteurAbsentsTrombi)
		}
		//Si on a déja chargé le trombi
		else if((!btnTrombi.hasClass('is-checked')) && ($('#donnees-trombi').children().length > 0)) {
			$('#liste').hide();
			//Coche les photos
			cochePhotos();
			$('#trombi').show();

			compteurAbsentsTrombi = compteurAbsents
			$('#compteur-absents').html(compteurAbsentsTrombi)
		}
		//Si le trombi est en cours d'affichage => on revient vers l'affichage classique
		else {
			$('#trombi').hide();
			cocheListe();
			$('#liste').show();

			compteurAbsents = compteurAbsentsTrombi
			$('#compteur-absents').html(compteurAbsents)
		}
	})

	$('body').on('click', '.photo', function() {
		if($(this).hasClass('photo-selected') === false) {
			compteurAbsentsTrombi++
			$('#compteur-absents').html(compteurAbsentsTrombi)
		} else {
			compteurAbsentsTrombi--
			$('#compteur-absents').html(compteurAbsentsTrombi)
		}
		$(this).toggleClass('photo-selected');
	})

	//Regarde dans la liste classique les élèves cochés, puis coche dans le trombi
	function cochePhotos() {
		//Décoche les photos auparavant cochées
		$('#donnees-trombi tr').each(function() {
				$(this).find('.photo').removeClass('photo-selected');
		})

		//Cherche les absents cochés dans la liste
		var absentsCoches = [];

		$('#donnees tr').each(function() {
			if($(this).hasClass('is-selected')) {
				absentsCoches.push($(this).attr('id'));
			}
		})

		$('#donnees-trombi tr').each(function() {
			if(($.inArray($(this).attr('id'), absentsCoches)) !== -1) {
				$(this).find('.photo').addClass('photo-selected');
			}
		})
	}


	//Regarde dans le trombi les élèves cochés, puis coche dans la liste classique
	function cocheListe() {
		//Decoche les eleves
		$('#donnees tr').each(function() {
			if($(this).hasClass('is-selected')) {
				$(this).find('.mdl-checkbox').click()
			}
		})

		//Cherche les absents cochés dans le trombi
		var photosCochees = [];

		$('#donnees-trombi tr').each(function() {
			if($(this).find('.photo').hasClass('photo-selected')) {
				photosCochees.push($(this).attr('id'));
			}
		})

		$('#donnees tr').each(function() {
			if(($.inArray($(this).attr('id'), photosCochees)) !== -1) {
				$(this).find('.mdl-checkbox').click()
			}
		})
	}
})
