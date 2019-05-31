<?php
 header("content-type:text/html;charset=utf8");//解决中文乱码问题
 //获取服务器的地址
 $db_hostbname="localhost";

 //获取服务器的用户名
 $db_username="root";
 //获取服务器的密码
 $db_password="root";
 //获取需要连接的数据库
 $db_name ="bk-1904";
 //链接数据库
 $con = new mysqli( $db_hostbname, $db_username, $db_password,$db_name);

  if($con->connect_error){
    die('链接失败'.$con->connect_error);
  }
 //设置数据库编码格式
 $con->query("set names utf8");
?>