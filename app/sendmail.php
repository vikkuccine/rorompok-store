
<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email= $_POST["email"];
    $name = $_POST["name"];
    $cart_list_data = $_POST["cart-list-data"];
    $cart_list = json_decode($cart_list_data, true);
    
    $headers = "From: ";

    
    if (is_array($cart_list)) {
        foreach ($cart_list as $item) {
            echo "ID: " . $item["id"] . "<br>";
            echo "Назва: " . $item["title"] . "<br>";
            echo "Ціна: " . $item["price"] . "<br>";
            echo "Кількість: " . $item["quantity"] . "<br>";
            echo "Ф: " . $item["img"] . "<br>";
            echo "<br>";
        }
    } else {
        echo "Помилка розкодування JSON.";
    }





}
