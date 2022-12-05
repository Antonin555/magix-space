<?php
require_once("action/CommonAction.php");
require_once("action/DAO/ContentDAO.php");


class AjaxBD extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {

        $answers = [];
        $count = 0;
        $numberByCard = [];
        $clearCard = [];
        $ratio = [];

        if (!empty($_POST["id"])) {

            StatsAction::addCard($_POST["id"]);
        }

        $answers = StatsAction::getCardCount();
        $count = StatsAction::countRow();
        $numberByCard = StatsAction::countCard();
        
        $i =0;
        foreach ($numberByCard as $number) {
            $r = $number["count"];
            $totalCards = $count[0]["count"];
            $total = $r / $totalCards * 100;
            $ratio[$i] = round($total, 2);
            $i++;
        }

        
        if (isset($_POST['clear'])){ StatsAction::clearCard(); }

        return compact("answers", "count", "numberByCard", "ratio");

    }


}