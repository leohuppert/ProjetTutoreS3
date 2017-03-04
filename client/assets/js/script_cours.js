
function initSemaine(numero)
{
	function getLundi(d)
	{
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() +(numero) - day + (day == 0 ? -6:1); // si le jour est lundi
		return new Date(d.setDate(diff));
	}

	$('.mdl-spinner').toggleClass('is-active')
	var lundi = getLundi(Date.now())
	var dateLundi = lundi.getFullYear() + '-' +  (lundi.getMonth() + 1) + '-' + lundi.getDate()
	var annee = new Date().getFullYear()

	$.ajax({
		url: urlServeur + 'get_cours.php',
		type: 'get',
		jsonp: 'callback',
		data: 'date=' + dateLundi,
		dataType: 'jsonp',
		success: function(json) {
			if(json.reponse !== 'vide') {

				$('.mdl-spinner').toggleClass('is-active')

				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()
				var dateStamp = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateStamp = new Date(dateStamp.split("-").reverse().join("-")).getTime();
				var dateRentree = "28-08-" + annee;
				var dateRentree = new Date(dateRentree.split("-").reverse().join("-")).getTime();
				var datePremierJanv = "01-01-"+annee;
				var datePremierJanv = new Date(datePremierJanv.split("-").reverse().join("-")).getTime();
				var dateFinSemaine = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateFinSemaine = new Date(dateFinSemaine.split("-").reverse().join("-")).getTime();
				dateFinSemaine +=604798000 /*604798000 durée d'une semaine en timestamp*/

				$("#titre").append('Planning de la semaine du ' + date)

				if ((dateFinSemaine)<Date.now()) {

					$("#btnapres").append('<button onclick ="get_sem_apres(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_right.png"></button>')
				}
				if (dateStamp>datePremierJanv) /* si l'année est différente de celle dans laquelle l'année scolaire a débutée (2016-2017 ici 2017) on ajoute l'équivalent d'une année en timestamp */
				{
					dateStamp +=20649600000

					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button onclick="get_sem_avant(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}
				}
				else /*sinon on enlève la durée d'une année à la date de la rentrée pour faire correspondre la rentrée de l'année de début ici 2016 */
				{
					dateRentree-=31536000000
					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button  onclick="get_sem_avant(' + numero + ')"class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}

				}

				var cours = json.reponse
				for(var i=0; i<cours.length; i++) {
					//TP
					if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] !== null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] +'<br>'	+ cours[i]['nom_section'].substring(0,2) +' - Groupe ' + cours[i]['no_groupe'] + '.' + cours[i]['no_sous_groupe'] + '</div>')
					}
					//TD
					else if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] === null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] +'<br>'+ cours[i]['nom_section'].substring(0,2) +  ' - Groupe ' + cours[i]['no_groupe'] + '</div>') 
					}
					//CM
					else {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] + '<br>' + cours[i]['nom_section'].substring(0,2) + '</div>')
					}
				}

				var arrCours = $('#container_cours').children()

				for(var i=0; i<arrCours.length; i++) {
					arrCours[i].setAttribute('onclick', 'selection(' + arrCours[i].id + ')' )
				}

				coloreCours()

				$("#container_cours").show(500)

			}
			else {
				$('.mdl-spinner').toggleClass('is-active')
				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()

				$("#titre").append('Planning de la semaine du ' + date)
				$("#aucuncours").append('<p>Aucun cours !</p>')

				var dateStamp = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateStamp = new Date(dateStamp.split("-").reverse().join("-")).getTime();
				var dateRentree = "28-08-" + annee;
				var dateRentree = new Date(dateRentree.split("-").reverse().join("-")).getTime();
				var datePremierJanv = "01-01-"+annee;
				var datePremierJanv = new Date(datePremierJanv.split("-").reverse().join("-")).getTime();
				var dateFinSemaine = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateFinSemaine = new Date(dateFinSemaine.split("-").reverse().join("-")).getTime();
				dateFinSemaine +=604798000 /*604798000 durée d'une semaine en timestamp*/

				if ((dateFinSemaine)<Date.now()) {

					$("#btnapres").append('<button onclick ="get_sem_apres(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_right.png"></button>')
				}
				if (dateStamp>datePremierJanv) /* si l'année est différente de celle dans laquelle l'année scolaire a débutée (2016-2017 ici 2017) on ajoute l'équivalent d'une année en timestamp */
				{
					dateStamp +=20649600000

					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button onclick="get_sem_avant(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}
				}
				else /*sinon on enlève la durée d'une année à la date de la rentrée pour faire correspondre la rentrée de l'année de début ici 2016 */
				{
					dateRentree-=31536000000
					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button  onclick="get_sem_avant(' + numero + ')"class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}

				}
			}
		}
	})
}


function get_sem_avant(numero)
{
	numero-=7
	updateNumero(numero)

	$("#container_cours").empty()
	$("#aucuncours").empty()
	$("#titre").empty()
	$("#btnapres").empty()
	$("#btnavant").empty()


	function getLundi(d)
	{
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() +(numero) - day + (day == 0 ? -6:1); // si le jour est lundi
		return new Date(d.setDate(diff));
	}

	$('.mdl-spinner').toggleClass('is-active')
	var lundi = getLundi(Date.now())
	var dateLundi = lundi.getFullYear() + '-' +  (lundi.getMonth() + 1) + '-' + lundi.getDate()
	var annee = new Date().getFullYear()



	$.ajax({
		url: urlServeur + 'get_cours.php',
		type: 'get',
		jsonp: 'callback',
		data: 'date=' + dateLundi,
		dataType: 'jsonp',
		success: function(json) {
			if(json.reponse !== 'vide') {
				$('.mdl-spinner').toggleClass('is-active')

				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()
				var dateStamp = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateStamp = new Date(dateStamp.split("-").reverse().join("-")).getTime();
				var dateRentree = "28-08-" + annee;
				var dateRentree = new Date(dateRentree.split("-").reverse().join("-")).getTime();
				var datePremierJanv = "01-01-"+annee;
				var datePremierJanv = new Date(datePremierJanv.split("-").reverse().join("-")).getTime();

				$("#titre").append('Planning de la semaine du ' + date)
				$("#btnapres").append('<button  onclick = "get_sem_apres(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_right.png"></button>')

				if (dateStamp>datePremierJanv) /* si l'année est différente de celle dans laquelle l'année scolaire a débutée (2016-2017 ici 2017) on ajoute l'équivalent d'une année en timestamp */
				{
					dateStamp +=20649600000

					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button onclick="get_sem_avant(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}
				}
				else /*sinon on enlève la durée d'une année à la date de la rentrée pour faire correspondre la rentrée de l'année de début ici 2016 */
				{
					dateRentree-=31536000000
					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button  onclick="get_sem_avant(' + numero + ')"class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}

				}

				var cours = json.reponse
				for(var i=0; i<cours.length; i++) {
					//TP
					if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] !== null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] +'<br>'+ cours[i]['nom_section'].substring(0,2) + ' - Groupe ' + cours[i]['no_groupe'] + '.' + cours[i]['no_sous_groupe'] + '</div>')
					}
					//TD
					else if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] === null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] +'<br>'+ cours[i]['nom_section'].substring(0,2) +' - Groupe ' + cours[i]['no_groupe'] + '</div>')
					}
					//CM
					else {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] + '<br>' + cours[i]['nom_section'].substring(0,2) + '</div>')
					}
				}

				var arrCours = $('#container_cours').children()

				for(var i=0; i<arrCours.length; i++) {
					arrCours[i].setAttribute('onclick', 'selection(' + arrCours[i].id + ')' )
				}

				coloreCours()

				$("#container_cours").show(500)

			}
			else {
				$('.mdl-spinner').toggleClass('is-active')
				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()

				$("#titre").append('Planning de la semaine du ' + date)
				$("#aucuncours").append('<p>Aucun cours !</p>')

				var dateStamp = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateStamp = new Date(dateStamp.split("-").reverse().join("-")).getTime();
				var dateRentree = "28-08-" + annee;
				var dateRentree = new Date(dateRentree.split("-").reverse().join("-")).getTime();
				var datePremierJanv = "01-01-"+annee;
				var datePremierJanv = new Date(datePremierJanv.split("-").reverse().join("-")).getTime();
				var dateFinSemaine = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateFinSemaine = new Date(dateFinSemaine.split("-").reverse().join("-")).getTime();
				dateFinSemaine +=604798000 /*604798000 durée d'une semaine en timestamp*/

				if ((dateFinSemaine)<Date.now()) {

					$("#btnapres").append('<button onclick ="get_sem_apres(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_right.png"></button>')
				}
				if (dateStamp>datePremierJanv) /* si l'année est différente de celle dans laquelle l'année scolaire a débutée (2016-2017 ici 2017) on ajoute l'équivalent d'une année en timestamp */
				{
					dateStamp +=20649600000

					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button onclick="get_sem_avant(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}
				}
				else /*sinon on enlève la durée d'une année à la date de la rentrée pour faire correspondre la rentrée de l'année de début ici 2016 */
				{
					dateRentree-=31536000000
					if (dateStamp>dateRentree) {
						$("#btnavant").append('<button  onclick="get_sem_avant(' + numero + ')"class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')
					}

				}
			}
		}
	})
}



function get_sem_apres(numero)
{
	numero+=7
	updateNumero(numero)


	$("#container_cours").empty()
	$("#aucuncours").empty()
	$("#titre").empty()
	$("#btnapres").empty()
	$("#btnavant").empty()


	function getLundi(d)
	{
		d = new Date(d);
		var day = d.getDay(),
		diff = d.getDate() +(numero) - day + (day == 0 ? -6:1); // si le jour est lundi
		return new Date(d.setDate(diff));
	}

	$('.mdl-spinner').toggleClass('is-active')
	var lundi = getLundi(Date.now())
	var dateLundi = lundi.getFullYear() + '-' +  (lundi.getMonth() + 1) + '-' + lundi.getDate()
	var annee = new Date().getFullYear()

	$.ajax({
		url: urlServeur + 'get_cours.php',
		type: 'get',
		jsonp: 'callback',
		data: 'date=' + dateLundi,
		dataType: 'jsonp',
		success: function(json) {
			if(json.reponse !== 'vide') {

				$('.mdl-spinner').toggleClass('is-active')

				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()
				var dateStamp = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateStamp = new Date(dateStamp.split("-").reverse().join("-")).getTime();
				var dateFinSemaine = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateFinSemaine = new Date(dateFinSemaine.split("-").reverse().join("-")).getTime();
				dateFinSemaine +=604798000 /*604798000 durée d'une semaine en timestamp*/

				$("#titre").append('Planning de la semaine du ' + date)
				$("#btnavant").append('<button  onclick = "get_sem_avant(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')

				if ((dateFinSemaine)<Date.now()) {

					$("#btnapres").append('<button onclick ="get_sem_apres(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_right.png"></button>')
				}

				var cours = json.reponse
				for(var i=0; i<cours.length; i++) {
					//TP
					if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] !== null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] +'<br>' + cours[i]['nom_section'].substring(0,2) +' - Groupe ' + cours[i]['no_groupe'] + '.' + cours[i]['no_sous_groupe'] + '</div>') 
					}
					//TD
					else if(cours[i]['no_groupe'] !== null && cours[i]['no_sous_groupe'] === null) {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] +'<br>'	 + cours[i]['nom_section'].substring(0,2) + ' - Groupe ' + cours[i]['no_groupe'] + '</div>')
					}
					//CM
					else {
						$("#container_cours").append('<div id="' + cours[i]['no_seance'] +  '" class="cours"><strong>' + cours[i]['nom_type'] + '</strong><br>' + cours[i]['nom_matiere'] + '<br>' + cours[i]['nom_section'].substring(0,2) + '</div>')
					}
				}

				var arrCours = $('#container_cours').children()

				for(var i=0; i<arrCours.length; i++) {
					arrCours[i].setAttribute('onclick', 'selection(' + arrCours[i].id + ')' )
				}

				coloreCours()

				$("#container_cours").show(500)

			}
			else {
				$('.mdl-spinner').toggleClass('is-active')
				var date = lundi.getDate() + '/' + (lundi.getMonth() + 1) + '/' +  lundi.getFullYear()

				$("#titre").append('Planning de la semaine du ' + date)
				$("#aucuncours").append('<p>Aucun cours !</p>')

				var dateStamp = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateStamp = new Date(dateStamp.split("-").reverse().join("-")).getTime();
				var dateFinSemaine = lundi.getDate() + '-' + (lundi.getMonth() + 1) +'-' + lundi.getFullYear()
				var dateFinSemaine = new Date(dateFinSemaine.split("-").reverse().join("-")).getTime();
				dateFinSemaine +=604798000 /*604798000 durée d'une semaine en timestamp*/

				if ((dateFinSemaine)<Date.now()) {

					$("#btnapres").append('<button onclick ="get_sem_apres(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_right.png"></button>')
				}
				$("#btnavant").append('<button  onclick = "get_sem_avant(' + numero + ')" class="mdl-button mdl-js-button mdl-button--icon"><img src="assets/img/chevron_left.png"></button>')

			}
		}
	})
}
