import roster from "./roster.json" assert { type: "json" };

function replaceImageWithIssuebox(issueboxText) {
    document.getElementById("imgPath").remove();
    document.getElementById("imgURL").remove();
    document.getElementById("takenBy").remove();
    document.getElementById("takenIn").remove();
    document.getElementById("takenDate").remove();
    document.getElementById("photoBreakA").remove();

    const el = document.createElement("table");
    el.insertRow(0).insertCell(0).innerHTML = issueboxText;
    el.style.width = "75%";

    document.getElementById("issuebox").appendChild(el);

    document.getElementById("issuebox").style.display = "block";
}

const r = new URLSearchParams(window.location.search).get("r"); // Reporting mark
const n = new URLSearchParams(window.location.search).get("n"); // Loco number (can have numbers)

const loco = roster[r][n];

const NLP = "Currently, there are no licensable photos of " + r + " " + n + ". If you have one, <a href=\"https://github.com/AbyssStudios/MetraRoster/issues/new?assignees=&labels=photo&template=contribute-photo.md\">please contribute</a>!";
const CS = "A picture of this locomotive is coming soon.";

document.title = r + " " + n + ": " + loco.locoType + " | Metra Photographic Roster";

// Main heading
document.getElementById("mainHead").innerHTML = r + " " + n + ": " + loco.locoType;

// Image
switch (loco.imgPath) {
    case "NLP":
        replaceImageWithIssuebox(NLP);
        break;
    case "CS":
        replaceImageWithIssuebox(CS);
        break;
    case undefined:
        document.getElementById("imgPath").remove();
        document.getElementById("imgURL").remove();
        document.getElementById("takenBy").remove();
        document.getElementById("takenIn").remove();
        document.getElementById("takenDate").remove();
        document.getElementById("photoBreakA").remove();
        document.getElementById("photoBreakB").remove();
        break;
    default:
        if (loco.imgURL !== undefined) {
            document.getElementById("imgURL").href = loco.imgURL;
        } else {
            document.getElementById("imgURL").outerHTML = document.getElementById("imgURL").innerHTML;
        }
        document.getElementById("imgPath").src = loco.imgPath;
        document.getElementById("imgPath").alt = r + " " + n;

        if (loco.takenBy === "ANON") {
            document.getElementById("takenBy").innerHTML = "Photo taken anonymously.";
        } else if (loco.takenBy !== undefined) {
            document.getElementById("takenBy").innerHTML = "Photo taken by " + loco.takenBy;
        } else {
            document.getElementById("takenBy").remove();
        }

        if (loco.takenIn !== undefined) {
            document.getElementById("takenIn").innerHTML = loco.takenIn;
        } else {
            document.getElementById("takenIn").remove();
        }

        if (loco.takenDate !== undefined) {
            document.getElementById("takenDate").innerHTML = loco.takenDate;
        } else {
            document.getElementById("takenDate").remove();
        }
}

// Builder and location
let builtByInStr = "";
if (loco.builtBy !== undefined) {
    builtByInStr = "Built by " + loco.builtBy;
    if (loco.builtIn !== undefined) {
        builtByInStr += " in " + loco.builtIn;
    }
} else {
    if (loco.builtIn !== undefined) {
        builtByInStr = "Built in" + loco.builtBy;
    }
}
if (builtByInStr !== "") {
    document.getElementById("builtByIn").innerHTML = builtByInStr;
} else {
    document.getElementById("builtByIn").remove();
}

if (loco.builtDate !== undefined) {
    document.getElementById("builtDate").innerHTML = "Built in " + loco.builtDate;
} else {
    document.getElementById("builtDate").remove();
}

if (loco.heritage !== undefined) {
    document.getElementById("heritage").innerHTML = loco.heritage;
} else {
    document.getElementById("heritage").remove();
}

if (loco.serial !== undefined) {
    document.getElementById("serial").innerHTML = "Serial: " + loco.serial;
} else {
    document.getElementById("serial").remove();
}

if (loco.orderNo !== undefined) {
    document.getElementById("order").innerHTML = "Order No. " + loco.orderNo;
} else {
    document.getElementById("order").remove();
}

if (loco.otherNotes !== undefined) {
    document.getElementById("otherNotes").innerHTML = loco.otherNotes;
} else {
    document.getElementById("otherNotes").remove();
}

if (loco.outOfService !== undefined) {
    document.getElementById("outOfService").innerHTML = "Out of service: " + loco.outOfService;
} else {
    document.getElementById("outOfService").remove();
}

if (loco.outOfService === undefined && loco.otherNotes === undefined) {
    document.getElementById("otherNotesBreak").remove();
}

// TODO LICENSE