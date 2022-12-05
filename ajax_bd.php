<?php
    require_once("action/ajax-action-bd.php");

    $action = new AjaxBD();
    $data = $action->execute();

    echo json_encode($data["action"]);
