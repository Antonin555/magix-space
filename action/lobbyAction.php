
<?php
    require_once("action/CommonAction.php");


class LobbyAction extends CommonAction {

    public function __construct() {
        parent::__construct(CommonAction::$VISIBILITY_MEMBER);
    }

    protected function executeAction(){
        $resultTraining= [];
        $resultPVP = [];
        $data = [];
        $dataPVP = [];
        $_SESSION["currentState"] = "ok";
        $data["key"] = $_SESSION["key"];
        
        $connectionGame = true;
        $connectionPVP = true;

        
       if(isset($_POST["pvp"])  ){
            $_SESSION["currentState"] = "PVP";
            $data["type"] = "PVP";
            $resultPVP = parent::callAPI("games/auto-match", $data);
            header("location:board.php");
            exit;


       } else if(isset($_POST["training"])){
            $_SESSION["currentState"] = "TRAINING";
            $data["type"] = "TRAINING";
            $resultTraining = parent::callAPI("games/auto-match", $data);


       }

       if($resultTraining == "JOINED_TRAINING" ){ 
            $_SESSION["currentState"] = "TRAINING";
            header("location:board.php");
            exit;
       
       }
       else if ($resultTraining =="LAST_GAME_WON"){


            echo $resultTraining;

       }else if ($resultTraining == "LAST_GAME_LOST") {
            echo $resultTraining;
		}
		else if ($resultTraining == "INVALID_KEY") {
			echo $resultTraining;
		}
		else if ($resultTraining == "NOT_IN_GAME"){
			echo $resultTraining;

		
		} else if ($resultTraining  != "WAITING" && $resultTraining  != null) {
				
            echo $resultTraining;
			}

       return compact("resultTraining", "resultPVP");
    }

}




    