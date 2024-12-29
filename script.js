const image = document.getElementById("man");
const titleImage = document.getElementById("title");
const titleContainer = document.getElementById("title-container");
const infoImage = document.getElementById("info");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let dragStartTime = 0;
let dragTimeout = null;
let isParty2 = false;
let isMobile = false;

window.onload = () => {
    image.src = "party_1.png";
    titleContainer.style.display = "none";

    isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
        titleContainer.style.position = "fixed";
        titleContainer.style.bottom = "10px";
        titleContainer.style.left = "50%";
        titleContainer.style.transform = "translateX(-50%)";
        titleContainer.style.transition = "transform 0.3s ease-in-out";
        titleImage.src = "welcometitle.png";

        let isRotated = false;

        setInterval(() => {
            if (!isRotated) {
                titleContainer.style.transition = 'transform 1s';
                titleContainer.style.transform = 'translateX(-50%) rotate(5deg)';
                isRotated = true;
            } else {
                titleContainer.style.transition = 'transform 1s';
                titleContainer.style.transform = 'translateX(-50%) rotate(0deg)';
                isRotated = false;
            }
        }, 1000);

        document.body.style.overflow = "hidden";
    }        
}

function hideInfo() {
    infoContainer.style.display = "none";
}

infoImage.addEventListener("click", hideInfo);
infoImage.addEventListener("touchstart", hideInfo);

image.addEventListener("mousedown", (e) => {
    if (isParty2) return;

    isDragging = true;
    offsetX = e.clientX - image.offsetLeft;
    offsetY = e.clientY - image.offsetTop;
    dragStartTime = Date.now();

    image.src = "party_3.png";
    image.style.cursor = "grabbing";

    dragTimeout = setTimeout(() => {
        if (isDragging) {
            image.src = "party_2.png";
            isParty2 = true;
            titleContainer.style.display = "block";
            const twentyTwoImage = document.getElementById("twentyTwo");
            if (twentyTwoImage) {
                twentyTwoImage.style.display = "none";
            }
        }
    }, 2000);
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        image.style.position = "absolute";
        image.style.top = `${y}px`;
        image.style.left = `${x}px`;
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        clearTimeout(dragTimeout);

        if (!isParty2 && Date.now() - dragStartTime >= 2000) {
            image.src = "party_2.png";
            isParty2 = true;
            titleContainer.style.display = "block";
            const twentyTwoImage = document.getElementById("twentyTwo");
            if (twentyTwoImage) {
                twentyTwoImage.style.display = "none";
            }
        } else if (!isParty2) {
            image.src = "party_1.png";
        }

        image.style.cursor = "grab";

        image.style.transition = "top 0.3s ease, left 0.3s ease";
        image.style.top = "50%";
        image.style.left = "50%";

        setTimeout(() => {
            image.style.transition = "";
        }, 300);
    }
});

image.addEventListener("touchstart", (e) => {
    if (isParty2) return;

    isDragging = true;
    offsetX = e.touches[0].clientX - image.offsetLeft;
    offsetY = e.touches[0].clientY - image.offsetTop;
    dragStartTime = Date.now();

    image.src = "party_3.png";
    image.style.cursor = "grabbing";

    dragTimeout = setTimeout(() => {
        if (isDragging) {
            image.src = "party_2.png";
            isParty2 = true;
            titleContainer.style.display = "block";
            const twentyTwoImage = document.getElementById("twentyTwo");
            if (twentyTwoImage) {
                twentyTwoImage.style.display = "none";
            }
        }
    }, 2000);
});

document.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const x = e.touches[0].clientX - offsetX;
        const y = e.touches[0].clientY - offsetY;

        image.style.position = "absolute";
        image.style.top = `${y}px`;
        image.style.left = `${x}px`;

        e.preventDefault();
    }
}, { passive: false });

document.addEventListener("touchend", () => {
    if (isDragging) {
        isDragging = false;
        clearTimeout(dragTimeout);

        if (!isParty2 && Date.now() - dragStartTime >= 2000) {
            image.src = "party_2.png";
            isParty2 = true;
            titleContainer.style.display = "block";
            const twentyTwoImage = document.getElementById("twentyTwo");
            if (twentyTwoImage) {
                twentyTwoImage.style.display = "none";
            }
        } else if (!isParty2) {
            image.src = "party_1.png";
        }

        image.style.transition = "top 0.3s ease, left 0.3s ease";
        image.style.top = "50%";
        image.style.left = "50%";

        setTimeout(() => {
            image.style.transition = "";
        }, 300);
    }
});

image.addEventListener("touchstart", (e) => {
    if (image.src.includes("party_1.png")) {
        const twentyTwoImage = document.getElementById("twentyTwo");
        if (twentyTwoImage) {
            twentyTwoImage.style.display = "none";
        }
    }
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
