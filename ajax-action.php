<?php
    require_once("action/ajax-StateGameAction.php");

    $action = new AjaxGameAction();
    $data = $action->execute();

    echo json_encode($data["action"]);
