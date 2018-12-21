<?php 
require_once("../vendor/autoload.php");

$html = file_get_contents("https://app.bsportsfan.com/event/history?id=$id2");

phpQuery::newDocument($html);

$array = json_decode($html, true); 
$n1 = $command1;
$n2 = $command2;
$i = 0;
$goals = 0;
    while($i < 5) {
    $gid2 = $array['history']['home'][$i]['id'];
    $html1 = file_get_contents("https://app.bsportsfan.com/event/view?id=$gid2&lastUpdated=0");
phpQuery::newDocument($html1);
$array1 = json_decode($html1, true); 
$nn1 = $array1['event']['home']['name'];
$nn2 = $array1['event']['away']['name'];
$score_h_h = $array1['event']['scores']['1']['home'];
$score_a_h = $array1['event']['scores']['1']['away'];

if($n1 == $nn1) $goals = $goals + $score_h_h;
if($n1 == $nn2) $goals = $goals + $score_a_h;
    $i++;
    }
    $goals1 = $goals/$i;

    $array = json_decode($html, true); 
    $n1 = $command1;
    $n2 = $command2;
    $i = 0;
    $goals = 0;
    while($i < 5) {
        $gid2 = $array['history']['away'][$i]['id'];
        $html1 = file_get_contents("https://app.bsportsfan.com/event/view?id=$gid2&lastUpdated=0");
    phpQuery::newDocument($html1);
    $array1 = json_decode($html1, true); 
    $nn1 = $array1['event']['home']['name'];
    $nn2 = $array1['event']['away']['name'];
    $score_h_h = $array1['event']['scores']['1']['home'];
    $score_a_h = $array1['event']['scores']['1']['away'];
    
    if($n2 == $nn1) $goals = $goals + $score_h_h;
    if($n2 == $nn2) $goals = $goals + $score_a_h;
        $i++;
        }
        $goals2 = $goals/$i;

        $halfg5 = $goals1+$goals2;
        echo $goals1."+".$goals2;
        echo $halfg5;
?>