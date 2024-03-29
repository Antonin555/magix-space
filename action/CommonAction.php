<?php
session_start();
require_once("action/constants.php");

abstract class CommonAction
{
    protected static $VISIBILITY_PUBLIC = 0;
    protected static $VISIBILITY_MEMBER = 1;

    private $pageVisibility;

    public function __construct($pageVisibility)
    {
        $this->pageVisibility = $pageVisibility;
    }

    public function execute()
    {



        if (empty($_SESSION["visibility"])) {
            $_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;

        }

        if ($_SESSION["visibility"] < $this->pageVisibility) {
            header("location:login.php");
            exit;
        }



        // Design pattern (une solution reconnue pour un problème courant)
        // Template method
        $data = $this->executeAction();
        $data["isLoggedIn"] = $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
        $data["username"] = !empty($_SESSION["username"]) ? $_SESSION["username"] : "Invité";
        return $data;
    }


    public function callAPI($service, array $data)
    {
        $apiURL = "https://magix.apps-de-cours.com/api/" . $service;

        $options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context = stream_context_create($options);
        $result = file_get_contents($apiURL, false, $context);

        if (strpos($result, "<br") !== false) {
            var_dump($result);
            exit;
        }

        return json_decode($result);
    }


    protected abstract function executeAction();
}