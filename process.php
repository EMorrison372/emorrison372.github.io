<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

echo "<p>$name sent the following message to the author:</p>";
echo "<p>Subject: $subject</p>";
echo "<p>$message</p>";
echo "<p>I will reply to you at $email.</p>";
echo "<p>Thanks for reaching out!</p>";

?>