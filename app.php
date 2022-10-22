<?php


if(isset($_POST['codigo']) && isset($_POST['tipo'])){
    //* Conexión a Base de Datos
    $host = "nhg-gt.com"; //* dominio
    $user = "jlima"; //* usuario bd
    $password = "Jlima189*"; //* contraseña bd
    $database = "asistenciaApp"; //* segmento o base de datos

    //* Conectando la base de datos
    $con = new mysqli($host, $user, $password, $database);
    $con->set_charset("utf8");

    //* Resultado conexión
    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }
    date_default_timezone_set("America/Guatemala").
    $codigo = $_POST['codigo'];
    $tipo = $_POST['tipo'];
    $fecha = date('Y-m-d H:i:s');
    $ip = $_POST['ip'];
//190.56.117.158
    if($ip == "190.56.117.158"){
        $query = 'SELECT id, nombre, apellido FROM empleado WHERE codigo ="'. $codigo.'"';
        if (!$result = mysqli_query($con, $query)) {
            exit(mysqli_error($con));
        }
    
        // if query results contains rows then featch those rows 
        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            $query2 = 'INSERT INTO asistencia(empleadoId, tipo, fecha) VALUES('.$row['id'].', '.$tipo.', "'.$fecha.'")';
            if (!$result2 = mysqli_query($con, $query2)) {
                exit(mysqli_error($con));
            }
            echo $row['nombre']." ".$row['apellido'];
        }else{
            echo "no-exists";
        }
    }else{
        echo "ip-no-authorized";
    }
}else{
    echo "no-code";
}



?>