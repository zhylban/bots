<?php 
require_once("../vendor/autoload.php");
$html = file_get_contents("https://app.bsportsfan.com/event/view?id=$id2&lastUpdated=0");
phpQuery::newDocument($html);

$array = json_decode($html, true); 
    
    $attacks1 = $array['event']['stats']['attacks']['0'];
    $attacks2 = $array['event']['stats']['attacks']['1'];

    $corners_h = $array['event']['stats']['corners']['0'];
    $corners_a = $array['event']['stats']['corners']['1'];

    $corner_h_h = $array['event']['stats']['corner_h']['0'];
    $corner_a_h = $array['event']['stats']['corner_h']['1'];

    $off_target_h = $array['event']['stats']['off_target']['0'];
    $off_target_a = $array['event']['stats']['off_target']['1'];

    $dattacks1 = $array['event']['stats']['dangerous_attacks']['0'];
    $dattacks2 = $array['event']['stats']['dangerous_attacks']['1'];
    
    $on_target_h = $array['event']['stats']['on_target']['0'];
    $on_target_a = $array['event']['stats']['on_target']['1'];

    $pos_h = $array['event']['stats']['possession_rt']['0'];
    $pos_a = $array['event']['stats']['possession_rt']['1'];

    $redcards_h = $array['event']['stats']['redcards']['0'];
    $redcards_a = $array['event']['stats']['redcards']['1'];

    $yellowcards_h = $array['event']['stats']['yellowcards']['0'];
    $yellowcards_a = $array['event']['stats']['yellowcards']['1'];

    $substitutions_h = $array['event']['stats']['substitutions']['0'];
    $substitutions_a = $array['event']['stats']['substitutions']['1'];

    $penalties_h = $array['event']['stats']['penalties']['0'];
    $penalties_a = $array['event']['stats']['penalties']['1'];

    $score_h = $array['event']['scores']['2']['home'];
    $score_a = $array['event']['scores']['2']['away'];

    $score_h_h = $array['event']['scores']['1']['home'];
    $score_a_h = $array['event']['scores']['1']['away'];
?>