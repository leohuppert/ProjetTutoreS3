<?php 
session_start();
header("Access-Control-Allow-Origin: *");

if(isset($_SESSION['seance_choisie'])) {
	$numCours = $_SESSION['seance_choisie'];
}

$sql = 'SELECT heure_deb , heure_fin FROM seance WHERE no_seance=:numcours';
try {
	require('db.php');
	global $objPDO;

	$res = $objPDO -> prepare($sql);
	$res -> bindValue('numcours', $numCours, PDO::PARAM_INT);
	$res -> execute();
	$tab = $res -> fetchAll();
} catch(Exception $ex) {
	die($ex);
}

if(!empty($tab)) {
	$reponse = array('reponse' => $tab);
}

echo json_encode($reponse);