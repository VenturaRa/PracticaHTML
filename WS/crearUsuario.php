<?php
include __DIR__ ."/Models/User.php";

    $nombre = $_POST['usuario_nombre'];
    $apellidos = $_POST['usuario_apellidos'];
    $contraseña = $_POST['usuario_contraseña'];
    $telefono = $_POST['usuario_telefono'];
    $email = $_POST['usuario_email'];
    $sexo = $_POST['usuario_sexo'];

    $usuario = new User($nombre, $apellidos, $contraseña, $telefono, $email, $sexo);

    $txt = fopen('data.txt', 'a+b');
    fwrite($txt, $usuario->toJson());
    fclose($txt);

    echo $usuario->toJson();
?>