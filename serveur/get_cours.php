<?php
header("Access-Control-Allow-Origin: *");
session_start();

/*
http://nazcalabs.com/blog/convert-php-array-to-utf8-recursively/
*/
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
$login='';
$id=0;
$date='';

if(isset($_SESSION['id'])) {
	$login = $_SESSION['id'];
}

if(isset($_GET['date'])) {
	$datesemaine = $_GET['date'];
}

$sql = 'SELECT no_prof FROM prof WHERE login=:login';

try {
	require('db.php');
	global $objPDO;
	$res = $objPDO->prepare($sql);
	$res -> bindValue('login', $login, PDO::PARAM_INT);
	$res -> execute();
	$tab1 = $res -> fetchAll();
	$id = $tab1[0]['no_prof'];
} catch(Exception $ex) {
	die($ex);
}


/*$sql = 'SELECT seance.date_debut, section.no_section, no_groupe, type.nom AS \'nom_type\', matiere.nom FROM seance, prof, cours, section, type , matiere WHERE prof.no_prof=:id AND cours.no_prof = prof.no_prof AND seance.no_cours = cours.no_cours AND section.no_section=seance.no_section AND type.no_type= cours.no_type AND cours.no_matiere=matiere.no_matiere ORDER BY cours.no_type DESC';*/

$sql = 'SELECT seance.no_seance, seance.date_debut, section.no_section, no_groupe, no_sous_groupe, type.nom
AS \'nom_type\', matiere.nom AS \'nom_matiere\', section.nom AS \'nom_section\'
FROM seance, prof, cours, section, type , matiere
WHERE prof.no_prof=:id
AND WEEK(seance.date_debut)=WEEK(:datesemaine)
AND cours.no_prof = prof.no_prof
AND seance.no_cours = cours.no_cours
AND section.no_section=seance.no_section
AND type.no_type= cours.no_type
AND cours.no_matiere=matiere.no_matiere
ORDER BY cours.no_type DESC, seance.date_debut ASC';

try {
	require('db.php');
	global $objPDO;
	$res = $objPDO->prepare($sql);
	$res -> bindValue('id', $id, PDO::PARAM_INT);
	$res -> bindValue('datesemaine',$datesemaine, PDO::PARAM_STR);
	$res -> execute();
	$tab = $res -> fetchAll();
} catch(Exception $ex) {
	die($ex);
}

if(!empty($tab)) {
	$reponse = array('reponse' => $tab);
}
else {
	$reponse = array('reponse' => 'vide');
}

/*for($i=0; $i<count($reponse['reponse']); $i++) {
	$reponse['reponse'][$i]['nom'] = utf8_encode($tab[$i]['nom']);
	$reponse['reponse'][$i]['4'] = utf8_encode($tab[$i]['nom']);
}*/

/*$requete_date = 'SELECT date(curdate()-DAYOFWEEK(curdate()-2)) AS date';
try {
	require('db.php');
	global $objPDO;
	$res = $objPDO -> prepare($requete_date);
	$res -> execute();
	$tab = $res -> fetchAll();
	if ($tab!==null) {
		$date = $tab[0]['date'];
		$reponse['date'] = $date;
	}

} catch(Exception $ex) {
	die($ex);
}*/

$reponse = utf8_converter($reponse);

$json =  json_encode($reponse);

//JSONP
echo $_GET['callback'].'('.$json.')';
