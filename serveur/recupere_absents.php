<?php
header("Access-Control-Allow-Origin: *");
session_start();

$id_seance=0;
$reponse = array();

if(isset($_SESSION['seance_choisie'])) {
	$id_seance = $_SESSION['seance_choisie'];
}

$sql = 'SELECT no_etudiant FROM absent WHERE no_seance=:num';

try {
	require('db.php');
	global $objPDO;

	$res = $objPDO -> prepare($sql);
	$res -> bindValue('num', $id_seance, PDO::PARAM_INT);
	$res -> execute();
	$tab = $res -> fetchAll();
} catch(Exception $ex) {
	die($ex);
}

if(count($tab)>0) {
	$reponse = array('reponse' => $tab);
}
else {
	$reponse = array('reponse' => 'vide');
}

echo json_encode($reponse);