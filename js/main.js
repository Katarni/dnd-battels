if (localStorage.getItem("counting") === null) {
    localStorage.setItem("counting", "0");
}

function getVal(id, name) {
    return localStorage.getItem("char-" + id + "-" + name)
}

document.querySelector(".add-char-btn").onclick = openInputFields;
document.querySelector(".remove-btn").onclick = clearCharacters;

for (let i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
    document.querySelector('.add-char-box').insertAdjacentElement("afterend", getCharElm(i.toString()));

    let info = document.querySelector("#char-" + i.toString()).children[1].children[1];
    info.addEventListener("click", () => openCharInfo(info.parentNode.parentNode.id));

    setHealthColor(i.toString());
}

function setHealthColor(id) {
    let hp_box = document.querySelector("#char-" + id).children[1].children[0];

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
    if (document.querySelector("[name='char-name']").value == "") {
        document.querySelector("[name='char-name']").classList.add("input-box-incorrect");
        return;
    } else {
        document.querySelector("[name='char-name']").classList.remove("input-box-incorrect")
    }

    if (document.querySelector("[name='hp']").value == "") {
        document.querySelector("[name='hp']").classList.add("input-box-incorrect");
        return;
    } else {
        document.querySelector("[name='hp']").classList.remove("input-box-incorrect")
    }

    if (document.querySelector("[name='max-hp']").value == "") {
        document.querySelector("[name='max-hp']").classList.add("input-box-incorrect");
        return;
    } else {
        document.querySelector("[name='max-hp']").classList.remove("input-box-incorrect")
    }

    if (parseInt(document.querySelector("[name='hp']").value) > parseInt(document.querySelector("[name='max-hp']").value)) {
        document.querySelector("[name='hp']").value = document.querySelector("[name='max-hp']").value;
    }

    localStorage.setItem("char-" + localStorage.getItem("counting") + "-name",
                            document.querySelector("[name='char-name']").value);
    localStorage.setItem("char-" + localStorage.getItem("counting") + "-hp",
                            document.querySelector("[name='hp']").value);
    localStorage.setItem("char-" + localStorage.getItem("counting") + "-max-hp",
                            document.querySelector("[name='max-hp']").value);

    document.querySelector("[name='char-name']").value = "";
    document.querySelector("[name='hp']").value = "";
    document.querySelector("[name='max-hp']").value = "";

    document.querySelector('.add-char-box').insertAdjacentElement("afterend", getCharElm(localStorage.getItem("counting")));

    setHealthColor(localStorage.getItem("counting"));

    localStorage.setItem("counting", (parseInt(localStorage.getItem("counting")) + 1).toString());

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

    let info = document.querySelector("#char-" +
                                     (parseInt(localStorage.getItem("counting")) - 1).toString()).children[1].children[1];
    info.addEventListener("click", () => openCharInfo(info.parentNode.parentNode.id));
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

function openCharInfo(id) {
    alert(id);
}

function getCharElm(id) {
    const character = document.createElement('div');
    character.classList.add("character-box");
    character.id = "char-" + id;

    const name = document.createElement('h2');
    name.classList.add("char-name");
    name.innerHTML = localStorage.getItem("char-" + id + "-name");
    character.appendChild(name);

    const char_info = document.createElement('div');
    char_info.classList.add("char-info");

    const hp_box = document.createElement('p');
    hp_box.classList.add('hp-box');
    hp_box.innerHTML = '<span class="hp">' +
                        localStorage.getItem("char-" + id + "-hp") +
                        '</span>/<span class="max-hp">' +
                        localStorage.getItem("char-" + id + "-max-hp") +
                        '</span>';
    char_info.appendChild(hp_box);

    const info_btn = document.createElement('button');
    info_btn.classList.add("info-btn");
    info_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">' +
                                '<path fill-rule="evenodd" ' +
                                ' d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 ' +
                                ' 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>' +
                            '</svg>';

    char_info.appendChild(info_btn)

    character.appendChild(char_info);

    return character;
}
