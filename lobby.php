<?php

require_once("action/lobbyAction.php");

$action = new LobbyAction();
$data = $action->execute();

require_once("partial/headerLobby.php");


?>


	
    <div class="container2">


    
    <nav class="navbar">
    
            <ul class="navlink">
                
                <li><a href="./stats.php">Stats</a></li>
                <li><a href="./register.php">Deck</a></li>
                <li><a href="./logout.php">Logout</a></li>
                
            </ul>
        </nav>
        
    </div>
    <div class="anim">
    <div class="main">
        <div class="container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
    </div>
    </div>
    <h2>Welcome : <?= $data["username"] ?> </h2>
    
    <div class="main2">
        <div class="container2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
    </div>
    </div>
</div>

    <form action="" method="POST">
        
        <button class="bouton1" type="submit" name="training">TRAINING</button>
        <button class="bouton1" type="submit" name="pvp">PVP</button>
          
    </form>
    
    
    

    <div class="lobby">
    <iframe class="frame1" src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
    </iframe>
    
    
    </div>


   

	<?php

    require_once("partial/footer.php");