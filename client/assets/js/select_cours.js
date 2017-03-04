function selection(idSeance) {
	$.ajax({
		url: urlServeur + 'select_cours.php',
		type: 'get',
		data: 'id_seance=' + idSeance,
		success: function() {
			window.location.assign('absences.html')
		}
	})
}
