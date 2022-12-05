<?php

require_once("action/registerAction.php");

$action = new RegisterAction();
$data = $action->executeAction();

require_once("partial/headerRegister.php");


?>
<div class="btnBack"><a href="./lobby.php">BACK</div>

<iframe class="frame2" src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
</iframe>



<?php
    require_once("partial/footer.php");