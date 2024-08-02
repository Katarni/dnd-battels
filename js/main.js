if (localStorage.getItem("counting") === null) {
    localStorage.setItem("counting", "0");
}

for (let i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
    const character = document.createElement('div');
    character.classList.add("character-box");
    document.querySelector("main").appendChild(character);
}

function addCharacter() {
    const character = document.createElement('div');
    character.classList.add("character-box");
    character.id = "char-" + localStorage.getItem("counting");

    const name = document.createElement('h2');
    name.classList.add("char-name");
    name.innerHTML = document.querySelector("[name='char-name']").value;
    character.appendChild(name);

    const hp_box = document.createElement('p');
    hp_box.classList.add('hp-box');
    hp_box.innerHTML = '<span class="hp">' +
                        document.querySelector("[name='hp']").value +
                        '</span>/<span class="max-hp">' +
                        document.querySelector("[name='max-hp']").value +
                        '</span>';
    character.appendChild(hp_box);

    document.querySelector('main').appendChild(character);

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

    document.querySelector(".add-char-btn").onclick = openInputFields;
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

    document.querySelector(".add-char-btn").onclick = addCharacter;
}

document.querySelector(".add-char-btn").onclick = openInputFields;
