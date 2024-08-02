function addCharacter() {
    const character = document.createElement('div');
    character.classList.add("charapter-box");
    document.querySelector("main").appendChild(character);
}

document.querySelector(".add-char-btn").addEventListener("click", () =>
    addCharacter()
);