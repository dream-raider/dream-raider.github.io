// Erika Joshi - Homework 6
//      ascii animation
window.onload = () => {
    "use strict";

    let start = document.getElementById("start");
    let stop = document.getElementById("stop");

    let animation = document.getElementById("animation");
    let textArea = document.getElementById("text-area");
    let fontSize = document.getElementById("fontsize");
    let turbo = document.getElementById("turbo");

    let interval = null;
    let frames = null;
    let speed = 250;
    let i = 0;
    let length = 0;

    fontSize.onchange = () => {
        let selectedFont = fontSize.options[fontSize.selectedIndex].value;

        switch (selectedFont) {
            case "Tiny":
                textArea.className = "tiny";
                break;
            case "Small":
                textArea.className = "small";
                break;
            case "Medium":
                textArea.className = "medium";
                break;
            case "Large":
                textArea.className = "large";
                break;
            case "Extra Large":
                textArea.className = "xlarge";
                break;
            case "XXL":
                textArea.className = "xxlarge";
                break;
            default:
                textArea.className = "medium";
        }
    };

    const performAnimation = () => {
        if (i === length) {
            i = 0;
        }
        textArea.innerHTML = frames[i++];
    };

    const stopAnimation = () => {
        clearInterval(interval);
        stop.disabled = true;
        start.disabled = false;
        animation.disabled = false;
    };

    const startAnimation = () => {
        clearInterval(interval);
        if (start.disabled == true) {
            interval = setInterval(performAnimation, speed);
        }

    };


    start.onclick = () => {
        if (frames !== null && length > 0) {
            stop.disabled = false;
            start.disabled = true;
            animation.disabled = true;
            startAnimation();
        }
    };

    stop.onclick = stopAnimation;
    animation.onchange = () => {
        i = 0;
        stopAnimation();
        let selectedIndex = animation.options[animation.selectedIndex].value;

        let selectedAnimation = ANIMATIONS[selectedIndex];
        textArea.innerHTML = selectedAnimation;

        if (selectedAnimation !== "") {
            frames = selectedAnimation.toString().split("=====\n");
            length = frames.length;
        } else {
            frames = null;
            length = 0;
        }
    };



    turbo.onclick = () => {
        if (turbo.checked) {
            speed = 50;
        } else {
            speed = 250;
        }
        startAnimation();
    };
};