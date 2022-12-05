<?php
    require_once("action/logoutAction.php");

    $action = new LogoutAction();
    $data = $action -> execute();

    require_once("partial/headerLobby.php");

    ?>
    Vous êtes déconnecté...
    <?php
    require_once("partial/footer.php");