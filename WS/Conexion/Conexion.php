<?php


define("database", "mysql:host=localhost;dbname=colegio");
define("usuario", "root");
define("password", "");

try {
	class Conexion
	{
		//@todo para pasarle los parametros de la base da datos
		private static $localhost = database;
		private static $user = usuario;
		private static $pass = password;
		private static $instance;



		public function __construct()
		{
			ini_set('display_errors', 1);
			ini_set('display_startup_errors', 1);
			error_reporting(E_ALL);
		
			$this->con = new PDO(self::$localhost, self::$user, self::$pass);
			$this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}

		public static function getInstance()
		{
			if (!isset(self::$instance)) {
				$object = __CLASS__;
				self::$instance = new $object;
			}
			return self::$instance;
		}

		public function getConnection()
		{
			return $this->con;
		}
        
	}
    //echo 'funciona la conexion';
    //$consulta = $conexion->query('SELECT * FROM alumnos');
    //$resultados = $consulta->fetchAll();
    //var_dump($resultados);

    
} catch (PDOException $e) {
	echo 'Error al conectar con la base de datos: ' . $e->getMessage();
}

$con = null;