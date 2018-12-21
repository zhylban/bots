<?php 
	$mysqli = new mysqli("localhost", "pjesatxu_zhylban", "komissar228A", "pjesatxu_zhylban");
	require_once("../vendor/autoload.php");
$stmt = $mysqli->query("SELECT * FROM `totalb` WHERE id2 = '$data'");
$row = $stmt->fetch_assoc();
$site = $row['link'];

$html = file_get_contents($site);

phpQuery::newDocument($html);
        
        $score1 = pq(".table")->find("tr:eq(1) td:eq(0)")->text();
        $score2 = pq(".table")->find("tr:eq(1) td:eq(2)")->text();
        $time1 = pq(".row")->find(".race-time")->text();
        $time1 = trim($time1);
        $time1 = mb_substr($time1, 0, -1);
        $time1 = substr($time1, 0, 2);
        if($time1 == "") {
                $time1 = " 🏁";
        } else { $time1 = "⏱ ".$time1; }
?>