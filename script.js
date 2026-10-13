

let jungleFound = false;
let caveFound = false;
let shipFound = false;
let treasureFound = false;

function showScene(sceneName) {

    let scenes = document.getElementsByClassName("scene");

    for (let i = 0; i < scenes.length; i++) {
        scenes[i].classList.remove("active");
    }

    document.getElementById(sceneName).classList.add("active");

    updateMap();

    window.scrollTo(0, 0);
}


function jungleChoice(choice) {

    if (choice === "compass") {

        jungleFound = true;

        document.getElementById("jungleResult").innerHTML =
            "Correct! You discovered the first map fragment!";

    } else {

        document.getElementById("jungleResult").innerHTML =
            "Not quite! Try examining another object.";

    }

    saveProgress();
}

function checkRiddle() {

    let answer = document.getElementById("riddleAnswer").value;

    answer = answer.toLowerCase().trim();

    if (answer === "clock" || answer === "a clock") {

        caveFound = true;

        document.getElementById("caveResult").innerHTML =
            "Correct! The stone door opens and reveals a map fragment!";

    } else {

        document.getElementById("caveResult").innerHTML =
            "Incorrect! Think about something that tells time.";

    }

    saveProgress();
}

function shipChoice(choice) {

    if (choice === "west") {

        shipFound = true;

        document.getElementById("shipResult").innerHTML =
            "You opened the correct chest! You found the third fragment!";

    } else {

        document.getElementById("shipResult").innerHTML =
            "This chest is empty. Think about where the sun sets.";

    }

    saveProgress();
}

function updateMap() {

    let total = 0;
    let collection = "";

    if (jungleFound) {
        total++;
        collection += "Jungle Fragment | ";
    }

    if (caveFound) {
        total++;
        collection += "Cave Fragment | ";
    }

    if (shipFound) {
        total++;
        collection += "Shipwreck Fragment | ";
    }

    document.getElementById("progress").innerHTML =
        "Map fragments: " + total + " / 3";

    if (total === 0) {

        document.getElementById("collectedItems").innerHTML =
            "No fragments collected yet.";

    } else {

        document.getElementById("collectedItems").innerHTML =
            collection;

    }

    if (total === 3) {

        document.getElementById("templeButton").innerHTML =
            "Temple (Unlocked)";

        document.getElementById("mapMessage").innerHTML =
            "Your map is complete! The ancient temple is unlocked.";

    } else {

        document.getElementById("templeButton").innerHTML =
            "Temple (Locked)";

        document.getElementById("mapMessage").innerHTML =
            "Collect all three fragments to unlock the temple.";

    }

}


function enterTemple() {

    if (jungleFound && caveFound && shipFound) {

        showScene("temple");

        if (treasureFound) {
            showTreasure();
        }

    } else {

        document.getElementById("mapMessage").innerHTML =
            "The temple is still locked! Find all three fragments.";

    }

}


function finalChoice(choice) {

    if (choice === "compass") {

        treasureFound = true;

        localStorage.setItem("treasureFound", "true");

        showTreasure();

    } else {

        document.getElementById("templeResult").innerHTML =
            "Incorrect! Remember what you discovered in the jungle.";

    }

}


function showTreasure() {

    document.getElementById("templePuzzle").classList.add("hidden");

    document.getElementById("treasureEnding").classList.remove("hidden");

    window.scrollTo(0, 0);
}


function saveProgress() {

    localStorage.setItem("jungleFound", jungleFound);
    localStorage.setItem("caveFound", caveFound);
    localStorage.setItem("shipFound", shipFound);

    updateMap();
}

function restartGame() {

    jungleFound = false;
    caveFound = false;
    shipFound = false;
    treasureFound = false;

    localStorage.removeItem("jungleFound");
    localStorage.removeItem("caveFound");
    localStorage.removeItem("shipFound");
    localStorage.removeItem("treasureFound");

    document.getElementById("jungleResult").innerHTML = "";
    document.getElementById("caveResult").innerHTML = "";
    document.getElementById("shipResult").innerHTML = "";
    document.getElementById("templeResult").innerHTML = "";

    document.getElementById("riddleAnswer").value = "";

    document.getElementById("templePuzzle").classList.remove("hidden");
    document.getElementById("treasureEnding").classList.add("hidden");

    showScene("intro");
}

function loadProgress() {

    jungleFound =
        localStorage.getItem("jungleFound") === "true";

    caveFound =
        localStorage.getItem("caveFound") === "true";

    shipFound =
        localStorage.getItem("shipFound") === "true";

    treasureFound =
        localStorage.getItem("treasureFound") === "true";

    updateMap();

    if (treasureFound) {
        showScene("temple");
        showTreasure();
    }

}


loadProgress();
