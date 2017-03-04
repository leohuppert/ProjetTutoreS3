<?php
header("Access-Control-Allow-Origin: *");
session_start();

$id_seance='';
if(isset($_GET['id_seance']) && !empty($_GET['id_seance']) && is_numeric($_GET['id_seance'])) {
	$id_seance = $_GET['id_seance'];
	$_SESSION['seance_choisie'] = $id_seance;
}