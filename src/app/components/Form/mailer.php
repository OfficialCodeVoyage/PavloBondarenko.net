<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail_to = "bondarenkopavloua@.yahoo.com"; 

    # Получаем данные из формы
    $name = str_replace(array("\r", "\n"), array(" ", " "), strip_tags(trim($_POST["full-name"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST["message"]), ENT_QUOTES, 'UTF-8');

    # Проверяем валидность данных
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    # Содержимое письма
    $content = "Name: $name\n";
    $content .= "Subject: $subject\n\n";
    $content .= "Email: $email\n\n";
    $content .= "Message:\n$message\n";

    # Заголовки письма
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    # Отправка письма
    if (mail($mail_to, $subject, $content, $headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong, we couldn't send your message.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>

