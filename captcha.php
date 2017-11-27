<?php
	if (isset($_POST['g-recaptcha-response']) && $_POST['g-recaptcha-response']) {
		// var_dump($_POST);
		$secret = "6LfxCjcUAAAAAG_gTLq2j9drl7ShNCDP3Irt1sHh";
		$ip = $_SERVER['REMOTE_ADDR'];
		$captcha = $_POST['g-recaptcha-response'];
		$res = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$captcha&remoteip=$ip");
		var_dump($res);
		$arr = json_decode($res,TRUE);
		if($arr['success']){
			echo "Done";
		}
		else
		{
			echo "Spam";
		}
	}
	// echo $_POST["inp"];
?>