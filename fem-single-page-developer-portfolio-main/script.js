const blob = document.getElementById("blob");
const typingText = document.querySelector("span.typing");
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

const typing = new Event("typing");
const pause = new Event("pause");
const backspacing = new Event("backspacing");

const textLength = typingText.innerText.length;
const text = typingText.innerText.split("");
typingText.innerText = "";
let iterator = 0,
  flagForTimeout = 0;

document.addEventListener("typing", () => {
  const interval = setInterval(() => {
    if (iterator >= 0 && iterator <= textLength - 1) {
      typingText.innerText += text[iterator++];
    }
    if (iterator === textLength) {
      document.dispatchEvent(pause);
      clearInterval(interval);
    }
  }, 300);
});

document.addEventListener("pause", () => {
  const timeout = setTimeout(() => {
    flagForTimeout = 1;
    document.dispatchEvent(backspacing);
    clearTimeout(timeout);
  }, 1000);
});

document.addEventListener("backspacing", () => {
  const interval = setInterval(() => {
    if (flagForTimeout === 1 && typingText.innerText.length > 0) {
      typingText.innerText = typingText.innerText.slice(0, -1);
    }
    if (typingText.innerText.length === 0) {
      iterator = 0;
      flagForTimeout = 0;
      document.dispatchEvent(typing);
      clearInterval(interval);
    }
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  document.dispatchEvent(typing);
  // const textLength = typingText.innerText.length;
  // const text = typingText.innerText.split("");
  // typingText.innerText = "";
  // let iterator = 0,
  //   flagForTimeout = 0;
  // setInterval(() => {
  //   if (iterator >= 0 && iterator <= textLength - 1) {
  //     typingText.innerText += text[iterator++];
  //   }
  // }, 300);
  // setInterval(() => {
  //   if (iterator === textLength) {
  //     let timeOut;
  //     clearTimeout(timeOut);
  //     timeOut = setTimeout(() => {
  //       flagForTimeout = 1;
  //     }, 1000);
  //   }
  //   if (flagForTimeout === 1 && typingText.innerText.length > 0) {
  //     typingText.innerText = typingText.innerText.slice(0, -1);
  //   }
  //   if (typingText.innerText.length === 0) {
  //     iterator = 0;
  //     flagForTimeout = 0;
  //   }
  // }, 200);
});
