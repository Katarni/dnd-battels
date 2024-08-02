if (localStorage.getItem("counting") === null) {
    localStorage.setItem("counting", "0");
}

for (var i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
    const character = document.createElement('div');
    character.classList.add("charapter-box");
    document.querySelector("main").appendChild(character);
}

function addCharacter() {
    const character = document.createElement('div');
    character.classList.add("charapter-box");
    document.querySelector("main").appendChild(character);

    localStorage.setItem("counting", (parseInt(localStorage.getItem("counting")) + 1).toString());
}

document.querySelector(".add-char-btn").addEventListener("click", () =>
    addCharacter()
);

