<?php

	$mysqli = new mysqli("localhost", "pjesatxu_zhylban", "komissar228A", "pjesatxu_zhylban");
require_once("../vendor/autoload.php");

// создаем переменную бота
$token = "583906260:AAHVQvXqqED6YgffIxGeRsUDq-mYhGQT6E8";
$bot = new \TelegramBot\Api\Client($token,null);

//парсинг
if($_GET['pars'] == 1) {

$html = file_get_contents("https://app.bsportsfan.com/events/inplay");

$array = json_decode($html, true); 
    
foreach($array['results'] as $key => $item) {
	$sport_id = $item['sport_id'];
	$league = $item['league']['name'];
	$id2 = $item['id'];
	$time = $item['timer']['tm'];
	$score1 = $item['scores']['2']['home'];
	$score2 = $item['scores']['2']['away'];
	if($time <= '16' and $time >= '8')
	{ 
	if($sport_id == 1 and $league !== "Beach Soccer - 36 mins play") {
	$command1 = $item['home']['name'];
	$command2 = $item['away']['name'];
	$url = "https://app.bsportsfan.com/event/view?id=$id2&lastUpdated=0";

		include "pars.php";
		include "cf2.php";
		
        echo $id2." ".$command1." - ".$command2." Время:".$time."<br>";
        $result = $mysqli->query("SELECT 'id2' FROM `totalb` WHERE id2 = '$id2'");
        $result->fetch_assoc();
        if($result->num_rows == 0) 
             {
            $atk = 1.5*$time;
            $atk2 = $attacks1+$attacks2; //общее кол-во атак
            $datk = $dattacks1+$dattacks2; //общее кол-во опасных атак
            $d = $atk2-$datk; //разница между атаками
			$p1 = (100-($d/$atk2)*100); //процент опасных атак
			include "halfg.php";
            echo "halfg5 = ".$halfg5."<br>";
            
			$propusk = 0;
            if($halfg5 >= 2) {
				$propusk = 1;			
            }
			$totalb = $score1+$score2+0.5;

			if($atk <= $atk2 and $p1 >= 70 and $propusk == 1) {

			if($dattacks1 > $dattacks2) { $datk1 = $dattacks1 / $dattacks2; }
			if($dattacks2 > $dattacks1) { $datk2 = $dattacks2 / $dattacks1; }

			if($datk1 >= 2) {
				if($on_target1 > $on_target2) $strategy = 2;
			}
			if($datk2 >= 2) {
				if($on_target1 < $on_target2) $strategy = 2;
			}

				$mysqli->query("INSERT INTO `totalb` (`id2`, `link`, `league`, `command1`, `command2`, `score1`, `score2`, `halfg5`, `time`, `attacks1`, `attacks2`, `dattacks1`, `dattacks2`, `totalwin`) VALUES ('$id2', '$url', '$league', '$command1', '$command2', '$score1', '$score2', '$halfg5', '$time', '$attacks1', '$attacks2', '$dattacks1', '$dattacks2', '$totalb')");
					
				$stmt = $mysqli->query("SELECT * FROM `totalb` WHERE id2 = $id2");
				$row = $stmt->fetch_assoc();
				$id = $row['id'];
				//отправка события в телеграмм
				$soccer = "⚽";
				$cft2 = rtrim($cft2, ',');
	//Флаги стран
	include "../flags.php";

$str1 = $soccer." Ставка #".$id."
			
".$flags.$league."
".$command1." - ".$command2." (".$row['score1'].":".$row['score2'].") (".$time." минута)
				
📢 Тотал (".$totalb.") больше
Коэф.: П1: ".$cf1." Н: ".$cf2." П2: ".$cf3;
$keyboard = new \TelegramBot\Api\Types\Inline\InlineKeyboardMarkup(
	[
		[
			['callback_data' => ''.$id2, 'text' => '⚽ Счёт']
		]
	]
);

$bot->sendMessage("-1001165261807", $str1, false, null,null,$keyboard);

if($strategy == 2){
	$str1 = $soccer." Ставка #".$id."
			
	".$flags.$league."
	".$command1." - ".$command2." (".$score1.":".$score2.") (".$time1." минута)
					
	📢 Тотал (".$totalb.") больше
	Коэф.: П1: ".$cft1." Н: ".$cft2." П2: ".$cft3;
	$keyboard = new \TelegramBot\Api\Types\Inline\InlineKeyboardMarkup(
		[
			[
				['callback_data' => ''.$id2, 'text' => '⚽ Счёт']
			]
		]
	);
	
	$bot->sendMessage("-1001315238596", $str1, false, null,null,$keyboard);
}
	} } }
 }
 	if($time >= '40' && $time <= '55')
 {
 if($sport_id == 1 and $league !== "Beach Soccer - 36 mins play") {
 $command1 = $item['home']['name'];
 $command2 = $item['away']['name'];
 $url = "https://app.bsportsfan.com/event/view?id=$id2&lastUpdated=0";

	 include "pars.php";
	 include "cf2.php";
	 
	 if($dattacks1 > $dattacks2) { $datk1 = $dattacks1 / $dattacks2; }
     if($dattacks2 > $dattacks1) { $datk2 = $dattacks2 / $dattacks1; }
	 
	 $propusk = "1";
	if(isset($datk1) && $pos_h >= "60" && $on_target_h >= $on_target_a) {
		if($datk1 >= "2" && $attacks1 > $attacks2) { // && $dattacks2 <= $dtime1
			if($score_h < $score_a) {
		$wincom = "1x";
		$wincom1 = "1";
		$propusk = "2"; 
	} } }
	if(isset($datk2) && $pos_a >= "60" && $on_target_a >= $on_target_h) {
		if($datk2 >= "2" && $attacks2 > $attacks1) { // && $dattacks1 <= $dtime1
			if($score_a < $score_h) {
		$wincom = "2x";
		$wincom1 = "2";
		$propusk = "2";
	} } }
	 
	 echo $id2." ".$command1." - ".$command2." Время:".$time."<br>";
	 
	 if($propusk == "2") {
	 $result = $mysqli->query("SELECT 'id2' FROM `totalb2` WHERE id2 = '$id2'");
	 $result->fetch_assoc();
	 if($result->num_rows == 0) 
		  {
			 $mysqli->query("INSERT INTO `totalb2` (`id2`, `link`, `league`, `command1`, `command2`, `score1`, `score2`, `time`) VALUES ('$id2', '$url', '$league', '$command1', '$command2', '$score1', '$score2', '$time')");
				 
			 $stmt = $mysqli->query("SELECT * FROM `totalb2` WHERE id2 = $id2");
			 $row = $stmt->fetch_assoc();
			 $id = $row['id'];
			 //отправка события в телеграмм
			 $soccer = "⚽";
			 $cft2 = rtrim($cft2, ',');
 //Флаги стран
 include "../flags.php";

$str1 = $soccer." Ставка #".$id."
		 
".$flags.$league."
".$command1." - ".$command2." (".$row['score1'].":".$row['score2'].") (".$time." минута)";
			 
/*Атаки: ".$row['attacks1']." - ".$row['attacks2']."
О.Атаки: ".$row['dattacks1']." - ".$row['dattacks2']."
Владение: ".$row['pos1']."% - ".$pos2."%
К.Карты: ".$rcard1." - ".$rcard2."
Удар в створ: ".$row['on_target1']." - ".$row['on_target2']."
Удар мимо: ".$row['off_target1']." - ".$row['off_target2'];
 Угловые: ".$row['corners1']." - ".$row['corners2']*/
$keyboard = new \TelegramBot\Api\Types\Inline\InlineKeyboardMarkup(
 [
	 [
		 ['callback_data' => ''.$id2, 'text' => '⚽ Счёт']
	 ]
 ]
);

$bot->sendMessage("-1001227411456", $str1, false, null,null,$keyboard);
 } } }
}
} } 

   // Обработка кнопок у сообщений
$bot->on(function($update) use ($bot, $callback_loc, $find_command){
	$callback = $update->getCallbackQuery();
	$message = $callback->getMessage();
	$chatId = $message->getChat()->getId();
	$data = $callback->getData();
	$message_id = $message->getChat()->messageId();
	
	include "live.php";
	$bot->editMessageText("-1001165261807", $message_id, "test");
	$bot->answerCallbackQuery( $callback->getId(), $mes, false);
    

}, function($update){
	$callback = $update->getCallbackQuery();
	if (is_null($callback) || !strlen($callback->getData())) 
		return false;
    return true; 
    
});
// запускаем обработку
$bot->run();
 ?>