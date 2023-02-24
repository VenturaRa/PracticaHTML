<?php
include __DIR__ ."/../Interface/IToJson.php";

class User implements IToJson{

    public $id;
    public $nombre;
    public $apellidos;
    public $contraseña;
    public $telefono;
    public $email;
    public $sexo;

    public function __construct($id,$nombre, $apellidos, $contraseña, $telefono, $email, $sexo){
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setApellidos($apellidos);
        $this->setContraseña($contraseña);
        $this->setTelefono($telefono);
        $this->setEmail($email);
        $this->setSexo($sexo);

    }

    public function getId()
    {
        return $this->id;
    }

 
    public function setId($id)
    {
        $this->id = $id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function getApellidos()
    {
        return $this->apellidos;
    }

 
    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    public function getContraseña()
    {
        return $this->contraseña;
    }

 
    public function setContraseña($contraseña)
    {
        $this->contraseña = $contraseña;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

 
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;
    }

    public function getEmail()
    {
        return $this->email;
    }

 
    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getSexo()
    {
        return $this->sexo;
    }

 
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
    }

    public function toJson(){
        return json_encode([
            'id' => $this->getId(),
            'nombre' => $this->getNombre(),
            'apellidos' => $this->getApellidos(),
            'contraseña' => $this->getContraseña(),
            'telefono' => $this->getTelefono(),
            'email' => $this->getEmail(),
            'sexo' => $this->getSexo()
        ]);
    }
    
    public function resultado_json($usuarios, $mensaje, $ejecucion)
    {
        $jsondata = array();
        $usuario_decode =  json_decode($usuarios);

        if (isset($usuario_decode->id) || $ejecucion == 1) {
            $jsondata['success'] = true;
            $jsondata['message'] = $mensaje;
            $jsondata['data'] = json_decode($usuarios);
            return json_encode($jsondata);
        } else {
            $jsondata['success'] = false;
            $jsondata['message'] = $mensaje;
            $jsondata['data'] = null;
            return json_encode($jsondata);
        }
    }
}
    
?>