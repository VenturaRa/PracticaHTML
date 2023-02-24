<?php
include __DIR__ ."/Models/User.php";

    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $contraseña = $_POST['contraseña'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $sexo = $_POST['sexo'];

    $usuario = new User($nombre, $apellidos, $contraseña, $telefono, $email, $sexo);

    $txt = fopen('data.txt', 'a+b');
    fwrite($txt, $usuario->toJson());
    fclose($txt);

    echo $usuario->toJson();
?>