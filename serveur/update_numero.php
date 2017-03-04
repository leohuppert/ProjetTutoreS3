<?php
header("Access-Control-Allow-Origin: *");
session_start();

if (isset($_POST['num'])) 
{
	$_SESSION['num']= $_POST['num'];

}
echo ($_SESSION['num']);