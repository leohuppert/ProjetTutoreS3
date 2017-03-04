<?php
header("Access-Control-Allow-Origin: *");
session_start();

$num_seance=0;
$reponse = array();

if(isset($_GET['no_seance'])) {
	$num_seance = $_GET['no_seance'];

	$sql = 'SELECT no_jour FROM seance WHERE no_seance=:num';

	try {
		require('db.php');
		global $objPDO;

		$res = $objPDO -> prepare($sql);
		$res -> bindValue('num', $num_seance, PDO::PARAM_INT);
		$res -> execute();
		$tab = $res -> fetchAll();
	}
	catch(Exception $ex) {
		die($ex);
	}

	if(!empty($tab)) {
		$jour = $tab[0]['no_jour'];

		if($jour > 0 && $jour != NULL) {
			$reponse = array('reponse' => 'saisie');
		}
		else if($jour == NULL || $jour == 0) {
			$reponse = array('reponse' => 'pas_saisie');
		}
	}
}

//A AJOUTER => VERIFICATION DE SAISIE_BLOQUEE

echo json_encode($reponse);