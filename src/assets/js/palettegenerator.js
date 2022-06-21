class Colour {
    constructor(hex, element) {
        this.hex = hex;
        this.element = element;
        this.locked = false;
    }

    // Apply hex style to the container
    setHex(hex) {
        this.hex = hex;
        this.element.style.backgroundColor = hex;
        this.element.querySelector('.palette-colour-input').value = hex;
    }

    // Container lock logic
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

    // Toggle the container lock
    toggleLocked () {
        this.setLocked(!this.locked);
    }

    // Generate random hex colour
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

    // Copy to clipboard function
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

// Select all containers to apply the business logic
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

// Change colour palette when space button is clicked on the screen
document.querySelector(".palette-colour-toggle-button").addEventListener("click", () => {
    for (let i = 0; i < colours.length; i++) {
        colours[i].generateHex();
    }
})

// Change colour palette when spacebar is pressed
document.addEventListener("keypress", (e) => {
    if(e.code.toLowerCase() === "space") {
        for (let i = 0; i < colours.length; i++) {
            colours[i].generateHex();
        }
    }
})