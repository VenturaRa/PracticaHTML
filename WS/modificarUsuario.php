<?php

include __DIR__ . '/Conexion/Conexion.php';
include __DIR__ . '/models/User.php';

$bdSingleton = Conexion::getInstance();
$conexion = $bdSingleton->getConnection();

$id_user = isset($_GET['id']) ? $_GET['id'] : null;
if (!$id_user) {
    $user = new User(null, null, null, null, null, null, null, null);
    $message = 'ERROR No se ha pasado un ID correcto';
    $json_result = $user->resultado_json(null, $message, null);
    echo $json_result;
    return;
}

$sql_user = "SELECT * FROM alumno where id = " . $id_user;
$result = $conexion->prepare($sql_user);
echo $sql_user;
$result->execute();
$datos = $result->fetch(PDO::FETCH_ASSOC);


$sql = "UPDATE alumno SET nombre=:nombre, apellidos=:apellidos, password=:password, telefono=:telefono,
email=:email, sexo=:sexo  WHERE id=" . $id_user;

$params[':nombre'] = isset($_POST['nombre']) ? $_POST['nombre'] : $datos['nombre'];
$params[':apellidos'] = isset($_POST['apellidos']) ? $_POST['apellidos'] : $datos['apellidos'];
$params[':password'] = isset($_POST['password']) ? $_POST['password'] : $datos['password'];
$params[':telefono'] = isset($_POST['telefono']) ? $_POST['telefono'] : $datos['telefono'];
$params[':email'] = isset($_POST['email']) ? $_POST['email'] : $datos['email'];
$params[':sexo'] = isset($_POST['sexo']) ? $_POST['sexo'] : $datos['sexo'];


$insercion = $conexion->prepare($sql);

$ejecucion = $insercion->execute($params);

$json_usuarios = json_encode($params);

($ejecucion == 1) ? $message = 'Usuario actualizado correctamente' : $message = 'ERROR: Ocurrio algun fallo, por favor intentelo de nuevo o mas tarde.';

$user = new User(null, null, null, null, null, null, null, null);

$json_result = $user->resultado_json($json_usuarios, $message, null);

echo $json_result;