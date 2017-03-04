$(document).ready(function() {

 	$(document).on('click', '.mdl-checkbox', function() {
 		var _tableRow = $(this).parents("tr:first")

  		if ($(this).hasClass("is-checked") === false) {
    		_tableRow.addClass("is-selected")

        compteurAbsents+=0.5
        $('#compteur-absents').html(compteurAbsents)
  		}
 		 else {
    		_tableRow.removeClass("is-selected")

        compteurAbsents-=0.5
        $('#compteur-absents').html(compteurAbsents)
 		 }
 	})

 	$.ajax({
		url: urlServeur + 'recupere_numero.php',
		type: 'GET',
		dataType: 'json',
		success: function(json){
			numero =parseInt(json.num,10)
			d=Date.now()
			d=new Date(d)
			var day = d.getDay()
			diff = d.getDate() +(numero) - day + (day == 0 ? -6:1);
			diff = new Date(d.setDate(diff))
			var date = diff.getDate() + '/' + (diff.getMonth() + 1) + '/' +  diff.getFullYear()
			$('#titre').append('<h1> Semaine du ' + date + '</h1>')

		}
	});

	$.ajax({
		url: urlServeur + 'get_absents.php',
		type: 'GET',
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

			//APPELLE LA FONCTION DU SCRIPT RECUPERE_ABSENTS.JS
			cocheAbsents()
			//RECUPERE_JOUR.JS
			cocheJour()
			//RECUPERE_HEURE.JS
			afficheHeure()
			//Affiche le commentaire du cours si un commentaire a déjà été rentré
			recupereCommentaire()

			$('.mdl-spinner').toggleClass('is-active')
		}
	})
})