<?php 
require_once("../vendor/autoload.php");
$html = file_get_contents("https://app.bsportsfan.com/event/odds?id=$id2");

phpQuery::newDocument($html);


$array = json_decode($html, true); 
foreach($array['odds'] as $key => $item) {
    $cf1 = $item['end']['1_1']['home_od'];
    $cf2 = $item['end']['1_1']['draw_od'];
    $cf3 = $item['end']['1_1']['away_od'];
    if($key == "Bet365") {
    $cf1 = $item['end']['1_1']['home_od'];
    $cf2 = $item['end']['1_1']['draw_od'];
    $cf3 = $item['end']['1_1']['away_od']; 
    }
}
?>