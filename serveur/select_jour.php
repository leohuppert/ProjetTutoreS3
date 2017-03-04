<?php 
session_start();
require_once 'db.php';
header("Access-Control-Allow-Origin: *");

$jour='';

if(isset($_GET['no'])) {
	$jour = $_GET['no'];
}

$numcours=0;

if(isset($_SESSION['seance_choisie'])) {
	$numcours = $_SESSION['seance_choisie'];
}

/*$no_jour='';
$id=0;
$reponse = array();
$sql = 'SELECT no_jour FROM seance WHERE no_seance=:numcours';
try {
	require('db.php');
	global $objPDO;
	$res = $objPDO->prepare($sql);
	$res -> bindValue('numcours', $numcours, PDO::PARAM_INT);
	$res -> execute();
	$tab = $res -> fetchAll();

} catch(Exception $ex) {
	die($ex);
}*/

$req =' UPDATE seance
SET no_jour =:jour
WHERE no_seance =:numcours';
try {
	require('db.php');
	global $objPDO;
	$res = $objPDO->prepare($req);
	$res -> bindValue('jour', $jour, PDO::PARAM_INT);
	$res -> bindValue('numcours', $numcours, PDO::PARAM_INT);
	$res -> execute();
} catch(Exception $ex) {
	die($ex);
}

//echo json_encode($reponse);