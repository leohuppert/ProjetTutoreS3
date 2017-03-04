<?php // FONCTION QUI MET LE NUMERO EN VARIABLE SESSION
header("Access-Control-Allow-Origin: *");
session_start();

$numero=0;

if(isset($_GET['semaine'])) {
	$numero = $_GET['semaine'];
}

$_SESSION['semaine'] = $numero;
echo ($_SESSION['semaine'] );