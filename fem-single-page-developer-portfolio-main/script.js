const blob = document.getElementById("blob");
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.body.onmousemove = (event) => {
  const { pageX, pageY } = event;
  blob.animate(
    {
      left: blob.style.left + `${pageX}px`,
      top: blob.style.top + `${pageY}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
};

const elements = document.querySelectorAll(".randomize");

for (let i = 0; i < elements.length; i++) {
  if (elements[i].classList.value.includes("uppercase"))
    letters = letters.toLocaleUpperCase();
  if (elements[i].classList.value.includes("capitalize"))
    letters = letters.toLocaleLowerCase();

  elements[i].onmouseover = (event) => {
    let iterations = 0;
    const MAX_ITERATIONS = event.target.dataset.value.length;

    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) return event.target.dataset.value[index];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iterations >= MAX_ITERATIONS) clearInterval(interval);

      iterations += 1 / 3;
    }, 30);
  };
}

const typing = new CustomEvent("typing");
const deleting = new CustomEvent("deleting");

const typingText = document.querySelector("span.typing");
const cursor = document.querySelector("span.cursor");
const textLength = typingText.innerText.length;
const text = typingText.innerText.split("");
typingText.innerText = "";
let iterator = 0;

document.addEventListener("pause", (e) => {
  const timeout = setTimeout(() => {
    document.dispatchEvent(e.detail.nextEvent);
    clearTimeout(timeout);
  }, e.detail.duration);
});

document.addEventListener("typing", () => {
  const interval = setInterval(() => {
    if (iterator >= 0 && iterator <= textLength - 1) {
      typingText.innerText += text[iterator++];
    } else {
      document.dispatchEvent(
        new CustomEvent("pause", {
          detail: { nextEvent: deleting, duration: 1000 },
        })
      );
      clearInterval(interval);
    }
  }, 300);
});

document.addEventListener("deleting", () => {
  const interval = setInterval(() => {
    if (typingText.innerText.length > 0) {
      typingText.innerText = typingText.innerText.slice(0, -1);
    } else {
      iterator = 0;
      document.dispatchEvent(
        new CustomEvent("pause", {
          detail: { nextEvent: typing, duration: 500 },
        })
      );
      clearInterval(interval);
    }
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  document.dispatchEvent(typing);
});
