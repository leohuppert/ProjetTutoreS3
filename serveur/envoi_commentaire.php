<?php
header("Access-Control-Allow-Origin: *");
session_start();

$comment = '';
$num_seance=0;

if(isset($_POST['commentaire'])) {
    $comment = $_POST['commentaire'];
}

if(isset($_SESSION['seance_choisie'])) {
    $num_seance = $_SESSION['seance_choisie'];
}

$sql = 'UPDATE seance SET commentaire = :commentaire WHERE no_seance = :id_seance';

try {
    require 'db.php';
    global $objPDO;

    $res = $objPDO -> prepare($sql);
    $res -> bindValue('commentaire', $comment, PDO::PARAM_STR);
    $res -> bindValue('id_seance', $num_seance, PDO::PARAM_INT);
    $res -> execute();
} catch(Exception $ex) {
    die($ex);
}