<?php
header("Access-Control-Allow-Origin: *");
session_start();
$heureDebut=0;
$heureFin=0;

if (isset($_POST['hdeb'])) 
{
	$heureDebut= $_POST['hdeb'];

}

if (isset($_POST['hfin'])) 
{
	$heureFin= $_POST['hfin'];

}

if (isset($_SESSION['seance_choisie']))
{
	$numCours= $_SESSION['seance_choisie'];

}

$req =' UPDATE seance
SET heure_deb =:heureDebut, heure_fin =:heureFin
WHERE no_seance =:numCours';
try {
	require('db.php');
	global $objPDO;
	$res = $objPDO->prepare($req);
	$res -> bindValue('heureDebut', $heureDebut, PDO::PARAM_STR);
	$res -> bindValue('heureFin', $heureFin, PDO::PARAM_STR);
	$res -> bindValue('numCours', $numCours, PDO::PARAM_INT);
	$res -> execute();
} catch(Exception $ex) {
	die($ex);
}


