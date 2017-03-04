function cocheJour() {
	$.ajax({
		url: urlServeur + 'recupere_jour.php',
		type: 'GET',
		dataType: 'json',
		success: function(json) {
			//On récupère le numero du jour en Session
			//On le cast en number
			var numeroJour = parseInt(json.reponse[0]['no_jour'], 10)

			//On teste la valeur du jour et on colore la bonne case
			switch(numeroJour) {
				case 1:
					$('#btnLun').addClass('mdl-button--colored');
					break;
				case 2:
					$('#btnMar').addClass('mdl-button--colored');
					break;
				case 3:
					$('#btnMer').addClass('mdl-button--colored');
					break;
				case 4:
					$('#btnJeu').addClass('mdl-button--colored');
					break;
				case 5:
					$('#btnVen').addClass('mdl-button--colored');
					break;
				case 6:
					$('#btnSam').addClass('mdl-button--colored');
					break;
			}
		}
	})
}
