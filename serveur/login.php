<?php
session_start();
require_once 'db.php';

$reponse = array();

if(!empty($_POST))
{
	if (isset($_POST['login']) && isset($_POST['password']))
	{
		$user = trim($_POST['login']);
		$pass = trim($_POST['password']);

		if(!empty($user) && !empty($pass))
		{
			try
			{
				$sql = 'SELECT * FROM prof WHERE login=:login';
				$stmt = $objPDO -> prepare($sql);
				$stmt -> execute(array(":login"=>$user));
				$row = $stmt -> fetch(PDO::FETCH_ASSOC);
				$count = $stmt -> rowCount();

				//Si une ligne est trouvée
				if($count>0)
				{
					if($row['password'] == $pass)
					{
						$reponse = array('reponse' => 'ok');
					}
					else
					{
						$reponse = array('reponse' => 'Mot de passe incorrect');
					}
				}
				else
				{
					$reponse = array('reponse' => 'Identifiant incorrect');
				}
			}
			catch(Exception $ex)
			{
				die($ex->getMessage());
			}
		}
		else
		{
			$reponse = array('reponse' => 'Champs vides');
		}
	}
	else
	{
		$reponse = array('reponse' => 'Champs vides');
	}
}

echo json_encode($reponse);
?>