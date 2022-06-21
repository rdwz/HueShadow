class Colour {
    constructor(hex, element) {
        this.hex = hex;
        this.element = element;
        this.locked = false;
    }

    setHex(hex) {
        this.hex = hex;
        this.element.style.backgroundColor = hex;
        // console.log(this.element.style.backgroundColor);
        this.element.querySelector('.palette-colour-input').value = hex;
    }

    setLocked(locked) {
        this.locked = locked;
        if(locked) {
            console.log(this.element.querySelector(".palette-lock-toggle"));
            this.element.querySelector(".palette-lock-toggle").classList.add('is-locked');
            this.element.querySelector("i").classList.remove("fa-lock-open");
            this.element.querySelector("i").classList.add("fa-lock");
        } else {
            this.element.querySelector(".palette-lock-toggle").classList.remove("is-locked");
            this.element.querySelector("i").classList.remove("fa-lock");
            this.element.querySelector("i").classList.add("fa-lock-open");
        }
    }

    toggleLocked () {
        this.setLocked(!this.locked);
    }

    generateHex() {
        if(this.locked) {
            return;
        }

        const chars = '0123456789ABCDEF';
        let hex = "#";
        for(let i = 0; i < 6; i++) {
            hex += chars[Math.floor(Math.random() * 16)];
        }

        this.setHex(hex);
    }

    copyToClipBoard() {
        const input = this.element.querySelector(".palette-colour-input");
        input.select();
        document.execCommand("copy");
        input.blur();

        this.element.querySelector(".palette-copy-hex").innerText = "Copied";
        this.element.classList.add("copied");
        setTimeout(() => {
            this.element.querySelector(".palette-copy-hex").innerText = "Copy";
            this.element.classList.remove("copied");
        }, 1000);
    }
}

const colour_elements = document.querySelectorAll(".palette-colours .palette-colour");

const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
    const colour_element = colour_elements[i];

    const input = colour_element.querySelector(".palette-colour-input");
    const lock_toggle = colour_element.querySelector(".palette-lock-toggle");
    const copy_hex = colour_element.querySelector(".palette-copy-hex");

    const hex = input.value;

    const colour = new Colour(hex, colour_element);

    input.addEventListener("input", () => colour.setHex(e.target.value));
    lock_toggle.addEventListener("click", () => colour.toggleLocked());
    copy_hex.addEventListener("click", () => colour.copyToClipBoard());

    colour.generateHex();
    colours.push(colour);
}

document.querySelector(".palette-colour-toggle-button").addEventListener("click", () => {
    for (let i = 0; i < colours.length; i++) {
        colours[i].generateHex();
    }
})

document.addEventListener("keypress", (e) => {
    if(e.code.toLowerCase() === "space") {
        for (let i = 0; i < colours.length; i++) {
        colours[i].generateHex();
    }
    }
})