<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");


require('../cred.php');



$dbh = new PDO('mysql:host=localhost;dbname=pwa', $login, $pass);

$sth = $dbh->prepare("select * from todos");
$sth->execute();

$rows = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows);




?>



