<?php
header("Access-Control-Allow-Origin: *");
session_start();

$reponse = array();

if(isset($_POST['data']) && isset($_POST['nb_absents'])) {
	
	$absents = json_decode($_POST['data']);
	$nb_absents = $_POST['nb_absents'];
	$num_seance = $_SESSION['seance_choisie'];
	$reponse = array('reponse' => 'ok');

	//echo '1 : Nom => '.$absents[0]->nom.' / Prénom => '.$absents[0]->prenom;

	require("db.php");
	global $objPDO;

	//On vide les absences déjà saisies
	$req = 'DELETE FROM absent WHERE no_seance=:num_seance';

	try {
		$res = $objPDO -> prepare($req);
		$res -> bindValue('num_seance', $num_seance, PDO::PARAM_INT);
		$res -> execute();
	} catch(Exception $ex) {
		die($ex);
	}
	

	//Insertion des absents pour la séance choisie
	$sql = 'INSERT INTO absent(no_etudiant, no_seance, absence) VALUES (:id_etud, :num_seance, 1)';

	for($i=0; $i<$nb_absents; $i++) {
		try {
			$res = $objPDO -> prepare($sql);
			$res -> bindValue('id_etud', $absents[$i]->id, PDO::PARAM_INT);
			$res -> bindValue('num_seance', $num_seance, PDO::PARAM_INT);
			$res -> execute();
		} catch(Exception $ex) {
			die($ex);
		}
	}
}
else
{
	$reponse = array('reponse' => 'failed');
}

echo json_encode($reponse);