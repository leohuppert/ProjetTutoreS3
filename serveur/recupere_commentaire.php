<?php
header("Access-Control-Allow-Origin: *");
session_start();

$comment = '';
$num_seance = 0;
$reponse = array();

if(isset($_SESSION['seance_choisie'])) {
    $num_seance = $_SESSION['seance_choisie'];
}

$sql = 'SELECT commentaire FROM seance WHERE no_seance=:id_seance';

try {
    require 'db.php';
    global $objPDO;

    $query = $objPDO -> prepare($sql);
    $query -> bindValue('id_seance', $num_seance, PDO::PARAM_INT);
    $query -> execute();
    
    $res = $query -> fetch(PDO::FETCH_ASSOC);;
} catch(Exception $ex) {
    die($ex);
}

$comment = $res['commentaire'];

if(strlen($comment) == 0) {
    $reponse = array('reponse' => 'vide');
} else {
    $reponse = array('reponse' => $comment);
}

echo json_encode($reponse);