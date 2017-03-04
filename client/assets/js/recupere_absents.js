var absentsOnLoad = []

$.ajax({
	url: urlServeur + 'recupere_absents.php',
	type: 'get',
	dataType: 'json',
	success: function(json) {
		for(var i=0; i<json.reponse.length; i++) {
			absentsOnLoad.push(json.reponse[i]['no_etudiant'])
		}
	}
})

function cocheAbsents() {

	$('#donnees tr').each(function() {

		if(($.inArray($(this).attr('id'), absentsOnLoad)) !== -1) {
			compteurAbsents+=0.5
			$(this).find('.mdl-checkbox').click()
		}
	})
}
