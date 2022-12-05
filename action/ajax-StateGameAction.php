<?php
    require_once("action/CommonAction.php");

    

    class AjaxGameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $result = [];
			$action = [];
			$action["key"] = $_SESSION["key"];
			$action["type"] = $_POST["type"];
            $action["uid"] = $_POST["uid"];
            $action["targetuid"] = $_POST["targetuid"];


            $result = parent::callAPI("games/action", $action);
                
            return compact("result", "action");
        }


    }