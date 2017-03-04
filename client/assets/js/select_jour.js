var no_jour;

$(document).ready(function(){
  // Bind click event on all the buttons inside .card
  $(".btnJour button").click(function() {
        // Check if the clicked button has class `btn_s`
        if ($(".btnJour button").hasClass('mdl-button--colored')) {
        	$(".btnJour button").removeClass('mdl-button--colored');
        };
        $(this).addClass('mdl-button--colored');
    });
});

//Envoi le numéro de jour
function envoiJour() {

	$('#boutons-jours').children().each(function() {

		if($('#btnLun').hasClass('mdl-button--colored')) {
			no_jour = 1
		}
		else if($('#btnMar').hasClass('mdl-button--colored')) {
			no_jour = 2
		}
		else if($('#btnMer').hasClass('mdl-button--colored')) {
			no_jour = 3
		}
		else if($('#btnJeu').hasClass('mdl-button--colored')) {
			no_jour = 4
		}
		else if($('#btnVen').hasClass('mdl-button--colored')) {
			no_jour = 5
		}
		else if($('#btnSam').hasClass('mdl-button--colored')) {
			no_jour = 6
		}
	})

	$.ajax({
		url: urlServeur + 'select_jour.php',
		type: 'GET',
		data: 'no=' + no_jour,
		dataType: 'json'
	})
}

var hdeb=0;
$( '.datepicker_hdeb' ).pickatime({
	onSet: function(context) {
		heure = Math.trunc((context.select)/60)
		minute = (context.select)%60
		hdeb = heure+":"+ minute
	}
})

var hfin=0;
$( '.datepicker_hfin' ).pickatime({
	onSet: function(context) {
		heure = Math.trunc((context.select)/60)
		minute = (context.select)%60
		hfin = heure+":"+ minute
	}
})

function envoiHeure(h_deb, h_fin)
{
	$.ajax({
		url: urlServeur + 'envoi_heure.php',
		type: 'POST',
		data: {hdeb: h_deb, hfin: h_fin},
		dataType: 'json',
		success: function() {
		}
	})

}
