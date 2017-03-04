<?php 
session_start();
header("Access-Control-Allow-Origin: *");

/*$jour='';

if(isset($_GET['no'])) {
	$jour = $_GET['no'];
}

$numcours=0;

if(isset($_SESSION['seance_choisie'])) {
	$numcours = $_SESSION['seance_choisie'];
}



$no_jour='';
$id=0;
$reponse = array();
$sql = 'SELECT no_jour FROM seance WHERE no_seance=:numcours AND no_jour>=1';
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

$jour = 0;
$numCours=0;
$reponse = array();

if(isset($_GET['no'])) {
	$jour = $_GET['no'];
}

if(isset($_SESSION['seance_choisie'])) {
	$numCours = $_SESSION['seance_choisie'];
}

$sql = 'SELECT no_jour FROM seance WHERE no_seance=:no_cours';
try {
	require('db.php');
	global $objPDO;

	$res = $objPDO -> prepare($sql);
	$res -> bindValue('no_cours', $numCours, PDO::PARAM_INT);
	$res -> execute();
	$tab = $res -> fetchAll();
} catch(Exception $ex) {
	die($ex);
}

if(!empty($tab)) {
	$reponse = array('reponse' => $tab);
}

echo json_encode($reponse);