<?php
    include("public.php");
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "select * from sorce where username='$username'";

    $res = mysqli_query($con,$sql);

    $arr = mysqli_fetch_assoc($res);

    if(count($arr)){
        echo  json_encode(array(
            "status"=>false,
            "info"=>"用户名重复"
        ));
    }else{
        $register = "insert into sorce (username,password) values ('$username','$password')";
        $res = mysqli_query($con,$register);

        if($res){
            echo json_encode(array(
                "status"=>true,
                "info"=>"注册成功"
            ));
        }
    }
?>