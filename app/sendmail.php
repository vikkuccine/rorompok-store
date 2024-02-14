
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ua', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('vika@saenq.space', 'Форма відправлена' );
$mail->addAddress('kamenkova09@gmail.com');
$mail->Subject = 'Перша відправка форми';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email= $_POST["email"];
    $name = $_POST["name"];
    $cart_list_data = $_POST["cart-list-data"];
    $cart_list = json_decode($cart_list_data, true);
    
    $body = '<h1>Замовлення оформлено</h1><p>'.$name.'</p><p>'.$email.'</p>';

    if (is_array($cart_list)) {
        foreach ($cart_list as $item) {
            $body.= '<p>ID: '.$item["id"].'</p>';
            $body.= '<p>Назва: '.$item["title"].'</p>';
            $body.= '<p>Ціна: '.$item["price"].'</p>';
            $body.= '<p>Кількість: '.$item["quantity"].'</p>';
            $body.= '<p>Ф: '.$item["img"].'</p>';
        }
    } 
    else {
        echo "Помилка розкодування JSON.";
    }
}

$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Помилка!';
} else {
   header('Location: index.html?mailSuccess=true');
   exit();
}

header('Content-type: application/json');
echo ($message);



