<?php
require_once("action/CommonAction.php");




class RegisterAction extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_MEMBER);
    }

    function executeAction()
    {

        return [];
    }

}