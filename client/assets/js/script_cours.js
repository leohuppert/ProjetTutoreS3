$(document).ready(function() {

	function getLundi(d) {
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6:1); // si le jour est lundi
		return new Date(d.setDate(diff));
	}

	$('.mdl-spinner').toggleClass('is-active')

	$.ajax({
		url: 'http://localhost/projetTutore/serveur/get_cours.php',
		type: 'get',
		jsonp: 'callback',
		dataType: 'jsonp',
		success: function(json) {
			if(json.reponse !== 'vide') {
				$('.mdl-spinner').toggleClass('is-active')

				var lundi = getLundi(Date.now())
				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()

				$("#titre").append(' du ' + date)

				var cours = json.reponse
				for(var i=0; i<cours.length; i++) {
					//TP
					if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] !== null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] + '<br>Groupe ' + cours[i]['no_groupe'] + '.' + cours[i]['no_sous_groupe'] + '</div>')
					}
					//TD
					else if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] === null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] + '<br>Groupe ' + cours[i]['no_groupe'] + '</div>')
					}
					//CM
					else {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] + '<br>' + cours[i]['nom_section'] + '</div>')
					}
				}
				
				var arrCours = $('#container_cours').children()
				
				for(var i=0; i<arrCours.length; i++) {
					arrCours[i].setAttribute('onclick', 'selection(' + arrCours[i].id + ')' )
				}

				$("#container_cours").show(500)
			}
			else {
				$('.mdl-spinner').toggleClass('is-active')
				$("#planning").append('<p>Aucun cours !</p>')
			}
		}
	});
});