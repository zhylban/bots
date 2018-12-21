<?php 
$mysqli = new mysqli("localhost", "pjesatxu_zhylban", "komissar228A", "pjesatxu_zhylban");
require_once("../vendor/autoload.php");



if ($stmt = $mysqli->query("SELECT * FROM `totalb` WHERE win = 0 ORDER BY `id` ")) {
    while($row = $stmt->fetch_assoc()){
        $result = time() - strtotime($row['date']." +45 minutes");
        if($result > 0) {
        $html = file_get_contents($row['link']);

        phpQuery::newDocument($html);
        $array = json_decode($html, true); 
        
        $scr1 = $array['event']['scores']['1']['home'];
        $scr2 = $array['event']['scores']['1']['away'];

        $id = $row['id'];
        $ttl = $row['totalwin'];
        $scr = $scr1+$scr2;
        if($ttl < $scr) {
            $winbd = 1;
            $win++;
            $str2 = "Ставка #".$id." - ✅";
            echo "Ставка #".$id." - ✅ Победа<br>";
        }
        if($ttl == $scr) {
            $winbd = 0;
            $voz++;
            $str2 = "Ставка #".$id." - 🔄";
            echo "Ставка #".$id." - 🔄 Возврат<br>";
        }
        if($ttl > $scr) {
            $winbd = 2;
            $min++;
            $str2 = "Ставка #".$id." - ⛔";
            echo "Ставка #".$id." - ⛔<br>";
        }
        $str3 = $str3."
        ".$str2;
      $mysqli->query("UPDATE `totalb` SET `win` = '$winbd' WHERE id = '$id'");
    }
}
}  
    $all = $min + $win;
    $p2 = (100-($min/$all)*100);
    $p3 = round($p2);
    $str3 = "📈 Статистика за прошедшие сутки:
".$str3."

    Проходимость ".$p3."%
    ✅: ".$win." ⛔: ".$min;
    $token = "583906260:AAHVQvXqqED6YgffIxGeRsUDq-mYhGQT6E8";
    $bot = new \TelegramBot\Api\Client($token,null);
    $bot->sendMessage("-1001165261807", $str3);//

echo "проходимость".$p2;
echo "<br>Побед:".$win." Проигрышей ".$min;


?>