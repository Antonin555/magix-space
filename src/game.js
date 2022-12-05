let uidPlayer = [];
let uidTarget = [];
let selectUid = null;
let heroPowerUsed = false;

let surrender = document.getElementById("surrender");
let endTurn = document.getElementById("endTurn");
let heroPower = document.getElementById("heroPower");
let chat = document.getElementById("chat");
let frameChat = document.getElementById("frame1");

window.addEventListener("load", () => {
	setTimeout(gameStateUpdate, 1000);
});


surrender.onclick = () => {
	clearGame();
	gameAction("SURRENDER", null, null);
	window.location.href = "lobby.php";
}


endTurn.onclick = () => {
	gameAction("END_TURN", null, null);
}

heroPower.onclick = () => {
	if(heroPowerUsed == true) {

		gameAction("HERO_POWER", null, null);
		heroPowerUsed = true;
		fadeOutEffect();
	}

}




function clearGame() {

	document.getElementById("gridPlayer").innerHTML = "";
	document.getElementById("gridBoardOpponent").innerHTML = "";
	document.getElementById("gridBoardPlayer").innerHTML = "";
	document.querySelector(".mini-card").innerHTML = "";
}


function createCards(board, div, state) {


	for (let card in board) {

		let cardPlayer = document.createElement('div');
		cardPlayer.className = "cardPlayer";
		let divImg = document.createElement('div');
		divImg.className = "divImg";
		let divContenantInfo = document.createElement('div');
		divContenantInfo.className = "divContenant";
		let divHp = document.createElement('div');
		divHp.className = "divHp";
		let divAtk = document.createElement('div');
		divAtk.className = "divAtk";
		let divMCS = document.createElement('div');
		divMCS.className = "divMCS";
		let divContenantMcs = document.createElement('div');
		divContenantMcs.className = "divContenantMcs";
		let divCost = document.createElement('div');
		divCost.className = "divCost";
		let imgId = board[card]["id"];


		if (div == document.getElementById("gridPlayer")) {

			uidPlayer = board[card]["uid"];

			divHp.innerHTML += board[card]["hp"];
			divAtk.innerHTML += board[card]["atk"];
			divCost.innerHTML += board[card]["cost"];
			divMCS.innerHTML += board[card]["mechanics"];
			divImg.style.backgroundImage = "url(../img/planets/" + imgId + ".png)";

			divContenantInfo.append(divAtk, divHp, divCost);
			divContenantMcs.append(divMCS)

			cardPlayer.append(divImg, divContenantInfo, divContenantMcs);

			cardPlayer.onclick = () => {

				selectUid = board[card]["uid"];
				gameAction("PLAY", selectUid, null);
				gameStats(board[card]["id"]);

				//divBoardPlayer.append(cardPlayer);
			}
			if (state.yourTurn == true) {
				heroPowerUsed = true;
				document.getElementById("gridBoardOpponent").style.boxShadow = "0 0 0";
				document.getElementById("gridBoardPlayer").style.boxShadow = "0 0 65px #ffffff";

			} else {
				heroPowerUsed = false;
				document.getElementById("gridBoardPlayer").style.boxShadow = "0 0 0";
				document.getElementById("gridBoardOpponent").style.boxShadow = "0 0 65px #ffffff";

			}


			if (state.hand[card].cost <= state["mp"]) {

				cardPlayer.style.boxShadow = "0 0 55px #de0d91";

			} else {

				cardPlayer.style.backgroundColor = "transparent";
				divContenantInfo.style.backgroundColor = "transparent";
				divContenantMcs.style.backgroundColor = "transparent";

			}


		} else if (div == document.getElementById("gridBoardOpponent")) {


			divHp.innerHTML += board[card]["hp"];
			divAtk.innerHTML += board[card]["atk"];
			divCost.innerHTML += board[card]["cost"];
			divMCS.innerHTML += board[card]["mechanics"];
			divImg.style.backgroundImage = "url(../img/planets/" + imgId + ".png)";

			divContenantInfo.append(divAtk, divHp, divCost);
			divContenantMcs.append(divMCS)

			cardPlayer.append(divImg, divContenantInfo, divContenantMcs);
			let tuid = board[card]["uid"];

			cardPlayer.onclick = () => {

				if (selectUid) {
					gameAction("ATTACK", selectUid, tuid);

				}

			}

			document.querySelector("#imgOpponent").onclick = () => {

				if (selectUid) {
					gameAction("ATTACK", selectUid, 0);

				}

			}


		} else if (div == document.getElementById("gridBoardPlayer")) {

			divHp.innerHTML += board[card]["hp"];
			divAtk.innerHTML += board[card]["atk"];
			divCost.innerHTML += board[card]["cost"];
			divMCS.innerHTML += board[card]["mechanics"];
			divImg.style.backgroundImage = "url(../img/planets/" + imgId + ".png)";
			divContenantInfo.append(divAtk, divHp, divCost);
			divContenantMcs.append(divMCS)
			cardPlayer.append(divImg, divContenantInfo, divContenantMcs);

			cardPlayer.onclick = () => {
				selectUid = board[card]["uid"];

			}

		}

		if (state.hand[card]["mechanics"] == "Taunt") {

			cardPlayer.style.boxShadow = "0 0 65px #ff6600";

		}
		else if (state.hand[card]["mechanics"] == "Stealth") {

			cardPlayer.style.boxShadow = "0 0 65px #fcf75e";
		}

		div.append(cardPlayer);
	}
}


const gameAction = (type, uid, targetuid) => {

	let formData = new FormData();

	formData.append("type", type);
	formData.append("uid", uid);
	formData.append("targetuid", targetuid);

	fetch("ajax-action.php", {

		method: "POST",
		body: formData,

	})

}

function gameStats(card) {


	let formData = new FormData();

	formData.append("id", card);

	fetch("ajax_bd.php", {

		method: "POST",
		body: formData
	})

}


const gameStateUpdate = () => {

	let formData = new FormData();
	fetch("ajax-state.php", {

		method: "POST",
		body: formData
	})
		.then(response => response.json())
		.then(data => {

			if (data == "LAST_GAME_WON") {
				clearGame();
				create_marquee("LAST GAME WON");


				setTimeout(() => {
					window.location.href = "lobby.php";
				}, 5000);
			}
			else if (data == "LAST_GAME_LOST") {

				clearGame();
				create_marquee("YOU LOOSE");


				setTimeout(() => {
					window.location.href = "lobby.php";
				}, 5000);

			}
			else if (data == "INVALID_KEY") {
				window.location.href = "logout.php";
			}
			else if (data == "NOT_IN_GAME") {

				window.location.href = "lobby.php";

			}
			else if (data == "WAITING") {

				create_marquee("WAIT...");

			}
			else if (data != "WAITING" && data != null) {

				clearGame();
				updateGame(data)

			}
			setTimeout(gameStateUpdate, 1000);
		});
}




const updateGame = data => {

	// update HUD :

	document.querySelector("#scoreP").innerHTML = data["hp"];

	document.querySelector(".timeOpponent").innerHTML = data["remainingTurnTime"];

	document.querySelector("#scoreO").innerHTML = data.opponent["hp"];

	document.querySelector(".mp").innerHTML = data["mp"];

	document.getElementById("usernameOpponent").innerHTML = data.opponent["username"];

	let divCardsHandOpponnent = document.querySelector(".mini-card");

	for (let i = 0; i < data.opponent.handSize; i++) {

		let div = document.createElement('div');
		div.className = "mini-carddiv";

		divCardsHandOpponnent.append(div);
	}



	let divHandPlayer = document.getElementById("gridPlayer");
	let divBoardOpponent = document.getElementById("gridBoardOpponent");
	let divBoardPlayer = document.getElementById("gridBoardPlayer");


	// create cards :
	createCards(data.hand, divHandPlayer, data);
	createCards(data.opponent.board, divBoardOpponent, data);
	createCards(data.board, divBoardPlayer, data);


}


const marquee_attributes = (ele, message) => {

	ele.direction = 'left';
	ele.width = '100%';
	ele.behavior = 'scroll';

	ele.setAttribute('scrollamount', '65');
	ele.setAttribute('style', 'color: red; font-family: nasa; font-size:150px;');

	ele.innerHTML = message;

	let div = document.getElementById('gridBoardOpponent');
	div.appendChild(ele);
}

//   create marquee element.
const create_marquee = (message) => {

	let el = document.createElement('marquee');


	marquee_attributes(el, message);


}


function fadeOutEffect() {
	var fadeTarget = document.getElementById("canvas");
	var fadeEffect = setInterval(function () {
		if (!fadeTarget.style.opacity) {
			fadeTarget.style.opacity = 1;

		}
		if (fadeTarget.style.opacity > 0) {
			fadeTarget.style.opacity -= 0.1;

		} else {
			fadeTarget.style.opacity = 1;
			clearInterval(fadeEffect);
		}
	}, 10);
}











