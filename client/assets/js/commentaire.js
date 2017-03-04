var inputCommentaire = $('#input-commentaire')
var placeholderCommentaire = $('#label-commentaire')

// Envoi du commentaire saisi par l'enseignant
function envoiCommentaire() {
    if(inputCommentaire[0].value.length > 0) {
        $.ajax({
            url: urlServeur + 'envoi_commentaire.php',
            type: 'POST',
            data: 'commentaire=' + inputCommentaire[0].value,
            dataType: 'json'
        })
    }
}

// Recupère le commentaire de la séance en cours
function recupereCommentaire() {
    $.ajax({
        url: urlServeur + 'recupere_commentaire.php',
        type: 'GET',
        dataType: 'json',
        success: function(json) {
            //SET LA VALUE DU TEXTFIELD
            //RETIRE LE PLACEHOLDER

            if(json.reponse !== 'vide') {
                inputCommentaire[0].value = json.reponse
                placeholderCommentaire[0].textContent = ''
            }
        }
    })
}