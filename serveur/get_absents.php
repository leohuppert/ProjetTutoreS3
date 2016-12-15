<?php
session_start();
require_once 'db.php';
header("Access-Control-Allow-Origin: *");

$numcours=0;
if(isset($_SESSION['seance_choisie'])) {
	$numcours = $_SESSION['seance_choisie'];
}

function utf8_converter($array)
{
    array_walk_recursive($array, function(&$item, $key){
        if(!mb_detect_encoding($item, 'utf-8', true)){
                $item = utf8_encode($item);
        }
    });
 
    return $array;
}
$reponse = array();


$req = 'SELECT * FROM `etudiant` e
join seance s
on (
s.no_section=e.no_section AND
(s.no_groupe is NULL OR s.no_groupe=e.no_groupe) AND
(s.no_sous_groupe is NULL OR s.no_sous_groupe=e.no_sous_groupe)
)
where s.no_seance = :numcours';
$result = $objPDO -> prepare($req);
$result -> bindValue('numcours', $numcours, PDO::PARAM_INT);
$result -> execute();
$reponse = $result -> fetchAll();

$test = array('reponse' => $reponse);
$test = utf8_converter($test);
echo json_encode($test);