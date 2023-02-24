<?php

include __DIR__ . '/Conexion/Conexion.php';
include __DIR__ . '/Models/User.php';

$id_user = isset($_GET['id']) ? $_GET['id'] : null;

$bdSingleton = Conexion::getInstance();
$conexion = $bdSingleton->getConnection();

if (!$id_user) {
    $sql = "SELECT * FROM alumno";
    $result = $conexion->prepare($sql);
    $result->execute();
    $datos = $result->fetchAll();
    $json_usuarios = [];
    foreach ($datos as $dat) {

        $user = new User($dat['id'], $dat['nombre'], $dat['apellidos'], $dat['password'], $dat['telefono'], $dat['email'], $dat['sexo'], $dat['fecha_nacimiento']);
        $json_usuarios[] = $user->toJSON();
    }
    echo '[' . implode(',', $json_usuarios). ']';
    return;
}

$sql = "SELECT * FROM alumno where id =" . $id_user;
$result = $conexion->prepare($sql);
$result->execute();
$datos = $result->fetch(PDO::FETCH_ASSOC);

$user = new User($datos['id'], $datos['nombre'], $datos['apellidos'], $datos['password'], $datos['telefono'], $datos['email'], $datos['sexo'], $datos['fecha_nacimiento']);
$json_usuarios = $user->toJSON();

$texto_usuario = 'Usuario con ID: ' . $id_user;

if (isset($datos['id'])){
    $sql_select = "SELECT * FROM alumno where id =" . $id_user;
    $result = $conexion->prepare($sql_select);
    $result->execute();
    $message = $texto_usuario . ' Obtenido Correctamente';
} else{
    $message = $texto_usuario . 'Usuario No encontrado';
}
$json_result = $user->resultado_json($json_usuarios, $message, null);

echo $json_result;