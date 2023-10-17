<?php
require('../cred.php');

$dane = json_decode(file_get_contents('php://input'));

$dbh = new PDO('mysql:host=localhost;dbname=pwa', $login, $pass);

$sth = $dbh->prepare("INSERT INTO todos (title,description) values (?,?)");
$sth->execute([$dane->title,$dane->description]);

?>



