<?php
 
    require_once("action/boardAction.php");
    require_once("partial/headerBoard.php");
    $action = new boardAction();
    $data = $action->execute();
   

?>



<div class="grid-container">
  <div class="gridInfo">


      <div id="chat">chat</div>
        <div class="scorePlayer">
          <div id="user"><?=$data["username"]?></div>
          <div id ="scoreP"></div>
          <div class="mp"></div> 
        </div>
        
        <div class="timeOpponent"></div>
        <div id="imgOpponent"></div>
        <div class="scoreOpponent">
          <div id="usernameOpponent"></div>
          <div id ="scoreO"></div>
      
        </div>
        <div class="mini-card"></div>
        

  </div>



  <div id="gridOpponent">
      <div id="surrender"><h1>S</h1></div>
      <div id="endTurn">END TURN</div>
      <div id="heroPower">HERO POWER</div>

  </div>
  <div id="gridBoardOpponent"></div>  
  <div id="gridBoardPlayer"></div>  

  
  <div id="gridPlayer"></div>




</div>

<div class="lobby">
    <iframe class="frame1" src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
    </iframe>


<div class="circle"></div>
<div class="circle2"></div>








