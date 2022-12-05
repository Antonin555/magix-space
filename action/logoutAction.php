<?php
require_once("action/CommonAction.php");

class LogoutAction extends CommonAction {
    public function __construct() {
        parent::__construct(CommonAction::$VISIBILITY_MEMBER);
    }

    protected function executeAction() {

        session_start();

        $data = [];
        $data["key"] = $_SESSION["key"];

        parent::callAPI("signout", $data);
        $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
        session_unset();
        session_destroy();
        header("location:login.php");
        exit;
    }

}

