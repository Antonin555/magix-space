<?php
    require_once("action/CommonAction.php");
    

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $data =[];
            $action = [];
            $result = [];
            

            if(isset($_SESSION["key"])){
                $result["key"] = $_SESSION["key"];
                $data=parent::callAPI("games/state", $result);
                
                
            }
            
            return compact("data");
        }


    }