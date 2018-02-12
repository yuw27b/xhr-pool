<?php
	$data = array(
		'timestamp' => time()
	);

	sleep(5);

	header("Content-Type: application/json; charset=utf-8");
	echo json_encode($data);
	die();
