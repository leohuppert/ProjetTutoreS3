function updateNumero(numero){
 			$.ajax({
 				url: urlServeur + 'update_numero.php',
 				type: 'POST',
 				dataType: 'json',
 				data: 'num=' + numero

 			});
 		}
