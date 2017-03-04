var absents = []

$(document).ready(function() {

	// Bouton retour vers l'accueil
	$('#btnRetour').on('click', function() {
		window.location.assign('accueil.html')
	})

	// Bouton pas d'absent
	$('#switch-absent').on('click', function() {
		var switchPasAbsent = $('#switch-absents').find('.mdl-switch');
		var switchTrombi = $('#div-switch-trombi').find('.mdl-switch');
		var tableListe = $('#liste').find('.mdl-data-table');
		var tableTrombi = $('#trombi').find('.mdl-data-table');

		if(switchPasAbsent.hasClass('is-checked') && !switchTrombi.hasClass('is-checked')) {
			tableListe.fadeIn(100);
		}
		else if(!switchPasAbsent.hasClass('is-checked') && !switchTrombi.hasClass('is-checked')) {

			tableListe.fadeOut(100);

			$('#donnees tr').each(function() {
				if($(this).hasClass('is-selected')) {
					//$(this).removeClass('is-selected');
					//$(this).find('.is-checked').removeClass('is-checked');
					$(this).find('.is-checked').click()
				}
			})

			// Réinitialisation du compteur
			compteurAbsents = 0
			$('#compteur-absents').html(compteurAbsents)
		}
		else if(switchPasAbsent.hasClass('is-checked') && switchTrombi.hasClass('is-checked')) {
			tableTrombi.fadeIn(100);
		}
		else if(!switchPasAbsent.hasClass('is-checked') && switchTrombi.hasClass('is-checked')) {

			tableTrombi.fadeOut(100);

			$('#donnees-trombi .photo').each(function() {
				if($(this).hasClass('photo-selected')) {
					$(this).removeClass('photo-selected')
				}
			})

			// Réinitialisation du compteur
			compteurAbsentsTrombi = 0
			$('#compteur-absents').html(compteurAbsentsTrombi)
		}
	})

	var dialog = document.querySelector('dialog')
	var showDialogButton = document.querySelector('#btnValider')

	if (! dialog.showModal) {
		dialogPolyfill.registerDialog(dialog);
	}

	//Bouton Valider
	$('#btnValider').on('click', function() {

		var saisieValide = false
		var boutonValide = false
		var heureValide = false
		var message = ''

		var reponse = document.querySelector('#reponse');

		$('#boutons-jours').children().each(function() {
			if($(this).hasClass('mdl-button--colored')) {
				boutonValide = true
			}
		})

		if(hdeb !== 0 && hfin !== 0) {
			heureValide = true
		}

		if(boutonValide && heureValide) {
			saisieValide = true
		}
		else if(boutonValide && !heureValide) {
			message = 'Veuillez choisir les heures'
		}
		else if(!boutonValide && heureValide) {
			message = 'Veuillez choisir le jour de la semaine'
		}
		else {
			message = 'Veuillez choisir le jour et les heures'
		}

		// Si on a saisi le jour de la semaine ainsi que les heures de début et fin du cours
		if(saisieValide) {
			absents = []
			var btnTrombi = $('#div-switch-trombi').find('.mdl-switch')

			if((!btnTrombi.hasClass('is-checked'))) {

				$('#donnees tr').each(function() {
					if($(this).hasClass('is-selected')) {

						var personne = {
							id: $(this).attr('id'),
							nom: $(this).find('.nom').html(),
							prenom: $(this).find('.prenom').html(),
						}

						absents.push(personne)
					}
				})
			} else {
				$('#donnees-trombi tr').each(function() {
					if($(this).find('.photo').hasClass('photo-selected')) {
						var personne = {
							id: $(this).attr('id'),
							nom: $(this).find('.nom').html(),
							prenom: '',
						}

						absents.push(personne)
					}
				})
			}

			$('#contenu_dialog').empty()

			if(absents.length>0) {
				$('#contenu_dialog').append('<p>Nombre d\'absents : ' +
					absents.length)
				for(var i=0; i<absents.length; i++) {
					if(i===0) {
						$('#contenu_dialog').append('<br>' + absents[i]['nom'] +
							' ' + absents[i]['prenom'])
					}
					else if(i===absents.length) {
						$('#contenu_dialog').append('<br>' + absents[i]['nom'] +
							' ' + absents[i]['prenom'] + '</p>')
					}
					else {
						$('#contenu_dialog').append('<br>' +
							absents[i]['nom'] +
							' ' + absents[i]['prenom'])
					}
				}
			}
			else {
				$('#contenu_dialog').append('<p>Aucun absent</p>')
			}

			//Affiche l'alerte
			dialog.showModal();

			//Valide l'alerte
			dialog.querySelector('.valider').addEventListener('click', function() {

						//ENVOI DES ABSENTS DE LA SEANCE CHOISIE
				//A AJOUTER : UPDATE SEANCE
				if(absents.length>=0) {

					//UPDATE LES HEURES
					if (hdeb==0 || hfin==0) {

						$.ajax({
							url: urlServeur + 'recupere_heure.php',
							type: 'GET',
							dataType: 'json',
							success: function(json) {

									hdeb=json.reponse[0]['heure_deb']
									hfin=json.reponse[0]['heure_fin']
									envoiHeure(hdeb,hfin);
							}

						})

					}
					else{
						envoiHeure(hdeb,hfin);
					}

					//UPDATE LE NUMERO JOUR
					envoiJour()

					//ENVOIE/UPDATE LE COMMENTAIRE
					envoiCommentaire()

					//ENVOI DES ABSENTS
					$.ajax({
						url: urlServeur + 'envoi_absents.php',
						type: 'POST',
						data: {"data" : JSON.stringify(absents), "nb_absents" : absents.length},
						success: function(json) {
							window.location.assign('accueil.html')
						}
					})
				}
			});
		}
		else {
			//Snackbar
			var data = {
				message: message,
				timeout: 3000
			};

			reponse.MaterialSnackbar.showSnackbar(data);
		}
	})

	dialog.querySelector('.close').addEventListener('click', function() {
		dialog.close();
	});
})
