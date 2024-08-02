if (localStorage.getItem("counting") === null) {
    localStorage.setItem("counting", "0");
}

function getVal(id, name) {
    return localStorage.getItem("char-" + id + "-" + name)
}

document.querySelector(".add-char-btn").onclick = openInputFields;
document.querySelector(".remove-btn").onclick = clearCharacters;

for (let i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
    const character = document.createElement('div');
    character.classList.add("character-box");
    character.id = "char-" + i.toString();

    const name = document.createElement('h2');
    name.classList.add("char-name");
    name.innerHTML = localStorage.getItem("char-" + i.toString() + "-name");
    character.appendChild(name);

    const hp_box = document.createElement('p');
    hp_box.classList.add('hp-box');
    hp_box.innerHTML = '<span class="hp">' +
                        localStorage.getItem("char-" + i.toString() + "-hp") +
                        '</span>/<span class="max-hp">' +
                        localStorage.getItem("char-" + i.toString() + "-max-hp") +
                        '</span>';
    character.appendChild(hp_box);

    document.querySelector('.add-char-box').insertAdjacentElement("afterend", character);

    setHealthColor(i.toString());
}

function setHealthColor(id) {
    let hp_box = document.querySelector("#char-" + id).children[1];

    hp_box.className = "";
    hp_box.classList.add("hp-box");

    if (parseInt(getVal(id, "hp")) >= 0.5 * parseInt(getVal(id, "max-hp"))) {
        hp_box.classList.add("high-hp");
    } else if (parseInt(getVal(id, "hp")) >= 0.2 * parseInt(getVal(id, "max-hp"))) {
        hp_box.classList.add("medium-hp");
    } else {
        hp_box.classList.add("low-hp");
    }
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

    document.querySelector('.add-char-box').insertAdjacentElement("afterend", character);

    localStorage.setItem("char-" + localStorage.getItem("counting") + "-name",
                            document.querySelector("[name='char-name']").value);
    localStorage.setItem("char-" + localStorage.getItem("counting") + "-hp",
                            document.querySelector("[name='hp']").value);
    localStorage.setItem("char-" + localStorage.getItem("counting") + "-max-hp",
                            document.querySelector("[name='max-hp']").value);

    localStorage.setItem("counting", (parseInt(localStorage.getItem("counting")) + 1).toString());

    setHealthColor(localStorage.getItem("counting"));

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

function clearCharacters() {
    for (let i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
        localStorage.removeItem("char-" + i.toString() + "-name");
        localStorage.removeItem("char-" + i.toString() + "-hp");
        localStorage.removeItem("char-" + i.toString() + "-max-hp");

        document.querySelector("main").removeChild(document.querySelector("#char-" + i.toString()));
    }

    localStorage.setItem("counting", "0");
}
