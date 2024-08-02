if (localStorage.getItem("counting") === null) {
    localStorage.setItem("counting", "0");
}

for (let i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
    const character = document.createElement('div');
    character.classList.add("character-box");
    document.querySelector("main").appendChild(character);
}

function addCharacter() {
    // const character = document.createElement('div');
    // character.classList.add("character-box");
    // document.querySelector("main").appendChild(character);

    // localStorage.setItem("counting", (parseInt(localStorage.getItem("counting")) + 1).toString());

    document.querySelector(".add-char-btn").classList.add("add-char-btn-closed");
    document.querySelector(".add-char-btn").classList.remove("add-char-btn-opened");

    document.querySelector(".add-char-box").classList.add("add-char-box-closed");
    document.querySelector(".add-char-box").classList.remove("add-char-box-opened");

    let boxes = document.querySelectorAll(".input-box");

    for (let i = 0; i < boxes.length; ++i) {
        boxes[i].setAttribute("hidden", "hidden");
        boxes[i].classList.add("input-box-closed");
        boxes[i].classList.remove("input-box-opened");
    }

    document.querySelector(".add-char-btn").addEventListener("click", () => openInputFields());
}

function openInputFields() {
    document.querySelector(".add-char-btn").classList.remove("add-char-btn-closed");
    document.querySelector(".add-char-btn").classList.add("add-char-btn-opened");

    document.querySelector(".add-char-box").classList.remove("add-char-box-closed");
    document.querySelector(".add-char-box").classList.add("add-char-box-opened");

    let boxes = document.querySelectorAll(".input-box");

    for (let i = 0; i < boxes.length; ++i) {
        boxes[i].removeAttribute("hidden");
        boxes[i].classList.remove("input-box-closed");
        boxes[i].classList.add("input-box-opened");
    }

    document.querySelector(".add-char-btn").addEventListener("click", () => addCharacter());
}

document.querySelector(".add-char-btn").addEventListener("click", () => openInputFields());
