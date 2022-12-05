<?php

require_once("action/LoginAction.php");

$action = new LoginAction();
$data = $action->execute();

require_once("partial/headerIndex.php");

?>
<form action="" method="post" autocomplete="off">

    <?php
        if ($data["hasConnectionError"]) {
        ?>
    <div class="error-div">Erreur : Connexion erronée</div>
    <?php
        }
                    ?>
    <div class="sign-in-input-group">
        <img id="logo" src="img/logo.png">
        <div id="Name">SPACE MAGIX</div>
        <div class="container">
            <img class="icon" src="img/icon-username.png">
            <input type="text" name="username" placeholder="username" required>
        </div>
        <div class="container">
            <img class="icon" src="img/icon-password.png">
            <input type="password" name="password" placeholder="password" required>
        </div>
        <button class="button" name="signin">login</button>



    </div>
</form>

<?php
    require_once("partial/footer.php");