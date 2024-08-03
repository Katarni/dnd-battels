if (localStorage.getItem("counting") === null) {
    localStorage.setItem("counting", "0");
}

function getVal(id, name) {
    return localStorage.getItem("char-" + id + "-" + name)
}

document.querySelector(".add-char-btn").onclick = openInputFields;
document.querySelector("#remove-all-btn").onclick = clearCharacters;
document.querySelector("#reorder-btn").onclick = reorderCharacters;

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

    if (document.querySelector("[name='initiative']").value == "") {
        document.querySelector("[name='initiative']").value = "0";
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
    localStorage.setItem("char-" + localStorage.getItem("counting") + "-initiative",
                            document.querySelector("[name='initiative']").value);

    document.querySelector("[name='char-name']").value = "";
    document.querySelector("[name='hp']").value = "";
    document.querySelector("[name='max-hp']").value = "";
    document.querySelector("[name='initiative']").value = "";

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
        localStorage.removeItem("char-" + i.toString() + "-initiative");

        document.querySelector("main").removeChild(document.querySelector("#char-" + i.toString()));
    }

    if (document.querySelector(".char-addinfo-container") != null) {
        document.querySelector(".char-addinfo-container").remove();
    }

    if (document.querySelector("#next-turn-btn") != null) {
        document.querySelector("#next-turn-btn").remove();
    }

    localStorage.setItem("counting", "0");
}

function openCharInfo(id) {
    if (document.querySelector(".char-addinfo-container") != null) {
        if (document.querySelector(".char-addinfo-container").id == id + "-info") {
            document.querySelector("#" + id).children[1].children[1].classList.remove("info-btn-opened");
            document.querySelector(".char-addinfo-container").remove();
            return;
        }
        let last_id = document.querySelector(".char-addinfo-container").id;
        last_id = last_id.substring(0, last_id.length - 5);

        document.querySelector("#" + last_id).children[1].children[1].classList.remove("info-btn-opened");
        document.querySelector(".char-addinfo-container").remove();
    }

    const info = document.createElement('div');
    info.classList.add("char-addinfo-container");
    info.id = id + "-info";

    const box = document.createElement('div');
    box.id = "char-addinfo";

    const health_btn = document.createElement('button');
    health_btn.id = "health-btn";
    health_btn.classList.add("add-info-btn");
    health_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" ' +
                                    'class="bi bi-heart" viewBox="0 0 16 16">' +
                                '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 ' +
                                    ' 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 ' +
                                    ' 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 ' +
                                    ' 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 ' +
                                    ' 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>' +
                            '</svg>' +
                            '<p>Health</p>'
    health_btn.addEventListener("click", () => openHealthCalc());
    box.appendChild(health_btn);

    const delete_btn = document.createElement('button');
    delete_btn.id = "delete-btn";
    delete_btn.classList.add("add-info-btn");
    delete_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" ' +
                                    ' class="bi bi-trash" viewBox="0 0 16 16">' +
                                '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 ' +
                                    ' 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 ' +
                                    ' 0v6a.5.5 0 0 0 1 0z"/>' +
                                    '<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 ' +
                                    ' 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 ' +
                                    ' 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 ' +
                                    ' 4zM2.5 3h11V2h-11z"/>' +
                            '</svg>' +
                            '<p>Delete</p>'
    delete_btn.addEventListener("click", () => deleteChar(id));
    box.appendChild(delete_btn);

    info.appendChild(box);

    document.querySelector("#" + id).children[1].children[1].classList.add("info-btn-opened");

    document.querySelector("#" + id).insertAdjacentElement("afterend", info);
}

function getCharElm(id) {
    const character = document.createElement('div');
    character.classList.add("character-box");
    character.id = "char-" + id;

    const name = document.createElement('div');
    name.classList.add("char-title");
    name.innerHTML = '<h2 class="char-name">' + localStorage.getItem("char-" + id + "-name") + '</h2>';
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

function deleteChar(id) {
    console.log(id);
    openCharInfo(id); // it will close info box

    let id_number = parseInt(id.substring(5, id.length));

    if (document.querySelector("#" + id).classList.contains("selected-caracter-box")) {
        nextTurn();
    }

    document.querySelector("main").removeChild(document.querySelector("#" + id));

    for (let i = id_number + 1; i < parseInt(localStorage.getItem("counting")); ++i) {
        localStorage.setItem("char-" + (i-1).toString() + "-name", getVal(i.toString(), "name"));
        localStorage.setItem("char-" + (i-1).toString() + "-hp", getVal(i.toString(), "hp"));
        localStorage.setItem("char-" + (i-1).toString() + "-max-hp", getVal(i.toString(), "max-hp"));
        localStorage.setItem("char-" + (i-1).toString() + "-initiative", getVal(i.toString(), "initiative"));

        document.querySelector("#char-" + i.toString()).id = "char-" + (i-1).toString();
    }

    localStorage.setItem("counting", (parseInt(localStorage.getItem("counting")) - 1).toString());
    localStorage.removeItem("char-" + localStorage.getItem("counting") + "-name");
    localStorage.removeItem("char-" + localStorage.getItem("counting") + "-hp");
    localStorage.removeItem("char-" + localStorage.getItem("counting") + "-max-hp");
    localStorage.removeItem("char-" + localStorage.getItem("counting") + "-initiative");

    if (localStorage.getItem("counting") == "0" && document.querySelector("#next-turn-btn") != null) {
        document.querySelector("#next-turn-btn").remove();
    }
}

function openHealthCalc() {
    document.querySelector("#char-addinfo").innerHTML = '<div class="hp-input-box">' +
                                                            '<input inputmode="none" name="hp-delta" id="hp-delta-field">' +
                                                            '<button id="del-btn" class="num-btn">' +
                                                                '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"' +
                                                                        'class="bi bi-backspace" viewBox="0 0 16 16">' +
                                                                    '<path d="M5.83 5.146a.5.5 0 0 0 ' +
                                                                        ' 0 .708L7.975 8l-2.147 2.146a.5.5 0 ' +
                                                                        ' 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 ' +
                                                                        ' 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 ' +
                                                                        ' 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 ' +
                                                                        ' 0 0 0-.707 0z"/>' +
                                                                    '<path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 ' +
                                                                        ' 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 ' +
                                                                        ' 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 ' +
                                                                        ' 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 ' +
                                                                        ' 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 ' +
                                                                        ' 0 0 1-1V3a1 1 0 0 0-1-1z"/>' +
                                                                '</svg>' +
                                                            '</button>' +
                                                        '</div>';

    document.querySelector("#char-addinfo").innerHTML +='<div class="btns-box">' +
                                                            '<button class="num-btn" id="num-btn-1">1</button>' +
                                                            '<button class="num-btn" id="num-btn-2">2</button>' +
                                                            '<button class="num-btn" id="num-btn-3">3</button>' +
                                                        '</div>';

    document.querySelector("#char-addinfo").innerHTML +='<div class="btns-box">' +
                                                            '<button class="num-btn" id="num-btn-4">4</button>' +
                                                            '<button class="num-btn" id="num-btn-5">5</button>' +
                                                            '<button class="num-btn" id="num-btn-6">6</button>' +
                                                        '</div>';

    document.querySelector("#char-addinfo").innerHTML +='<div class="btns-box">' +
                                                            '<button class="num-btn" id="num-btn-7">7</button>' +
                                                            '<button class="num-btn" id="num-btn-8">8</button>' +
                                                            '<button class="num-btn" id="num-btn-9">9</button>' +
                                                        '</div>';

    document.querySelector("#char-addinfo").innerHTML +='<div class="btns-box">' +
                                                            '<button class="num-btn" id="heal-btn-calc">+</button>' +
                                                            '<button class="num-btn" id="num-btn-0">0</button>' +
                                                            '<button class="num-btn" id="damage-btn-calc">-</button>' +
                                                        '</div>';

    for (let i = 0; i <= 9; ++i) {
        document.querySelector("#num-btn-" + i.toString()).addEventListener("click", function() {
            document.querySelector("[name='hp-delta']").value += i.toString();
        })
    }

    document.querySelector("#heal-btn-calc").addEventListener("click", () => healChar(1));
    document.querySelector("#damage-btn-calc").addEventListener("click", () => healChar(-1));
    document.querySelector("#del-btn").addEventListener("click", function() {
        let val = document.querySelector("[name='hp-delta']").value;
        if (val != "") {
            document.querySelector("[name='hp-delta']").value = val.substring(0, val.length - 1);
        }
    });
}

function healChar(mul) {
    if (document.querySelector("[name='hp-delta']").value == "") return;

    let delta = mul * parseInt(document.querySelector("[name='hp-delta']").value);

    let id = document.querySelector(".char-addinfo-container").id;
    id = id.substring(0, id.length - 5);

    localStorage.setItem(id + "-hp", parseInt(getVal(id.substring(5, id.length), "hp")) + delta);

    if (parseInt(getVal(id.substring(5, id.length), "hp")) < 0) {
        localStorage.setItem(id + "-hp", "0");
    } else if (parseInt(getVal(id.substring(5, id.length), "hp")) > parseInt(getVal(id.substring(5, id.length), "max-hp"))) {
        localStorage.setItem(id + "-hp", getVal(id.substring(5, id.length), "max-hp"));
    }

    console.log(getVal(id.substring(5, id.length), "hp"))

    document.querySelector("#" + id).querySelector(".hp").textContent = getVal(id.substring(5, id.length), "hp");

    setHealthColor(id.substring(5, id.length));

    document.querySelector("[name='hp-delta']").value = "";
}

function cmpForInitiative(a, b) {
    if (parseInt(getVal(a, "initiative")) >= parseInt(getVal(b, "initiative"))) {
        return -1;
    }
    return 1;
}

function reorderCharacters() {
    const elms = [];
    for (let i = 0; i < parseInt(localStorage.getItem("counting")); ++i) {
        elms.push(i.toString());
    }
    elms.sort(cmpForInitiative);

    const main = document.querySelector("main");

    for (let i = elms.length - 1; i >= 0; --i) {
        main.insertBefore(document.querySelector("#char-" + elms[i]), document.querySelector("#char-" + elms[i + 1]));
    }

    if (document.querySelector("#next-turn-btn") != null) return;

    const next_btn = document.createElement('button');
    next_btn.id = "next-turn-btn";
    next_btn.classList.add("action-btn");
    next_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" ' +
                                ' class="bi bi-arrow-right-circle" viewBox="0 0 16 16">' +
                            '<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 ' +
                                ' 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 ' +
                                ' 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 ' +
                                ' 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>' +
                        '</svg>' +
                        '<p class="action-btn-text">Next</p>';
    next_btn.addEventListener("click", () => nextTurn());
    document.querySelector('.header-buttons-box').insertBefore(next_btn, document.querySelector("#reorder-btn"));

    const cur_char = document.querySelector('.character-box').classList.add("selected-caracter-box");
}

function nextTurn() {
    const curr = document.querySelector(".selected-caracter-box");
    curr.classList.remove("selected-caracter-box");

    if (curr == document.querySelector("main").lastChild) {
        document.querySelector('.character-box').classList.add("selected-caracter-box");
    } else {
        curr.nextSibling.classList.add("selected-caracter-box");
    }
}
