<?php
    require_once("action/Ajax-stateAction.php");

    $action = new AjaxAction();
    $data = $action->execute();

    echo json_encode($data["data"]);


    