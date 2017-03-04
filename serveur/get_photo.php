<?php

$num_etudiant='';
$tab;
$reponse = array();

if(isset($_GET['num_et'])) {
	$num_etudiant = $_GET['num_et'];
}

$sql = 'SELECT nom_fichier FROM etudiant WHERE no_etudiant=:num';
try {
	require('db.php');
	global $objPDO;

	$res = $objPDO -> prepare($sql);
	$res -> bindValue('num', $num_etudiant, PDO::PARAM_INT);
	$res -> execute();
	$tab = $res -> fetchAll();
} catch(Exception $ex) {
	die($ex);
}

$reponse = array('nom_fichier' => $tab[0]['nom_fichier']);

echo json_encode($reponse);