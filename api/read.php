<?php

$dbh = new PDO('mysql:host=localhost;dbname=pwa','root','');

$sth = $dbh->prepare("select * from todos");
$sth->execute();

$rows = $sth->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows);

?>