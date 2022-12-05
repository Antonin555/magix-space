<?php

require_once("action/ajax-action-bd.php");
require_once("partial/headerStats.php");
$action = new AjaxBD();
$data = $action->execute();

?>

<div class="grid-stats">
    <h1>STATS PLAYER : <?= $_SESSION["username"] ?>
    </h1>
</div>

<div class="totalCards">Total cartes jouées : <?= $data["count"][0]["count"] ?></div>

<div class="gridInfoStats">
    <div class="title">ID cartes :</div>
    <div class="title">Nombres de fois jouées :</div>
    <div class="title">Ratio :</div>

</div>



<?php

if (!empty($data["answers"])) {

?>

<div class="gridCarteStats">

    <div class="gridCarteID">

        <?php
    foreach ($data["answers"] as $item) {
    ?>
        <div class="answer">
            <div class="text">
                <?= $item["cardid"]; ?>
            </div>
        </div>
        <?php
    }
        ?>
    </div>
    <?php
}
    ?>
    <div class="gridCarteNumber">

        <?php
foreach ($data["numberByCard"] as $item) {
?>
        <div class="answer">
            <div class="text">
                <?= $item["count"]; ?>

            </div>

        </div>
        <?php
}
        ?>
    </div>
    <?php
    ?>

    <div class="gridRatio">

        <?php
foreach ($data["ratio"] as $item) {
?>
        <div class="answer">
            <div class="text">
                <?= $item . " %"; ?>

            </div>

        </div>
        <?php
}
        ?>
    </div>
    <?php
    ?>


</div>

<div class="formDiv">
<form action="" method="POST">

    <button class="btnClear" type="submit" name="clear">CLEAR ALL</button>

</form>

<div class="btnBack"><a href="./lobby.php">BACK</div>

</div>