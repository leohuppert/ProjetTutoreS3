function selection(idSeance) {

	$(document).ready(function() {

		$.ajax({
			url: 'http://localhost/projetTutore/serveur/select_cours.php',
			type: 'get',
			data: 'id_seance=' + idSeance,
			success: function() {
				window.location.assign('absences.html')
			}
		})
	})
}