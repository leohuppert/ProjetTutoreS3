function afficheHeure()
{

	$.ajax({
		url: urlServeur + 'recupere_heure.php',
		type: 'GET',
		dataType: 'json',
		success: function(json) {

			if (json.reponse[0]['heure_deb'] != "00:00:00" && json.reponse[0]['heure_fin']!= "00:00:00") {


				hdeb= json.reponse[0]['heure_deb']
				hdeb= hdeb.substring(0,5)
				hfin= json.reponse[0]['heure_fin']
				hfin= hfin.substring(0,5)

				$('#input_hdeb').val(hdeb)
				$('#input_hfin').val(hfin)
			}
		}

	})
}
