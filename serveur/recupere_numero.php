<?php
// récupère la variable en session du numero
header("Access-Control-Allow-Origin: *");
session_start();
$reponse= array();
$numero= 0;

if (isset($_SESSION['num'])) {
	$numero=$_SESSION['num'];
}

$reponse=array('num' => $numero);
echo json_encode($reponse);
