<?php

//informations de connexion dans un fichier ini
$conf = parse_ini_file('../db.ini');

try {
	$objPDO = new PDO("mysql:host=".$conf['host'].";dbname=".$conf['dbname'], $conf['user'], $conf['password']);
} catch(Exception $ex) {
	echo $ex->getMessage();
}