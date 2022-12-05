<?php
require_once("action/CommonAction.php");




class LoginAction extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {


        $hasConnectionError = false;

        if (isset($_POST["username"])) {

            $data = [];
            $data["username"] = $_POST["username"];

            $data["password"] = $_POST["password"];

            $result = parent::callAPI("signin", $data);

            if ($result == "INVALID_USERNAME_PASSWORD") {
                // err
                $hasConnectionError = true;
            } else {
                // Pour voir les informations retournées : var_dump($result);exit;
                $key = $result->key; //a stocker dans la variable de session

                $_SESSION["key"] = $key;
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                header("location:lobby.php");
                exit;
            }

        }

        return compact("hasConnectionError");
    }

}