const p = document.querySelector("p");
const h1 = document.querySelector("h1");
const container = document.querySelector("#container");
const actionBtns = document.querySelector(".action-btns");
const valImg = document.querySelector(".val-img");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");

yesBtn.addEventListener("mouseover", () => {
  yesBtn.style.transform = `scale(2.5)`;
});

yesBtn.addEventListener("click", () => {
  actionBtns.style.display = "none";
  valImg.style.display = "block";
  h1.innerHTML = `<h2 style="font-size: 6rem;">Hurray!!! </h2> She Said Yes ❤️`;
  p.style.display = "none";
});

container.addEventListener("mousemove", (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const parentRect = actionBtns.getBoundingClientRect();

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  let dx = btnCenterX - e.clientX;
  let dy = btnCenterY - e.clientY;

  let distance = Math.hypot(dx, dy);

  const FEAR_RADIUS = 180;
  const ESCAPE_DISTANCE = 140;
  const EDGE_BUFFER = 10;

  if (distance < FEAR_RADIUS) {
    // Normalize direction
    dx /= distance;
    dy /= distance;

    let newLeft = noBtn.offsetLeft + dx * ESCAPE_DISTANCE;
    let newTop = noBtn.offsetTop + dy * ESCAPE_DISTANCE;

    const maxX = parentRect.width - btnRect.width;
    const maxY = parentRect.height - btnRect.height;

    // Edge detection
    const atLeftEdge = newLeft <= EDGE_BUFFER;
    const atRightEdge = newLeft >= maxX - EDGE_BUFFER;
    const atTopEdge = newTop <= EDGE_BUFFER;
    const atBottomEdge = newTop >= maxY - EDGE_BUFFER;

    // If stuck horizontally, slide vertically
    if (atLeftEdge || atRightEdge) {
      newLeft = Math.min(Math.max(newLeft, 0), maxX);
      newTop += (dy >= 0 ? 1 : -1) * ESCAPE_DISTANCE;
    }

    // If stuck vertically, slide horizontally
    if (atTopEdge || atBottomEdge) {
      newTop = Math.min(Math.max(newTop, 0), maxY);
      newLeft += (dx >= 0 ? 1 : -1) * ESCAPE_DISTANCE;
    }

    // Final clamp
    newLeft = Math.min(Math.max(0, newLeft), maxX);
    newTop = Math.min(Math.max(0, newTop), maxY);

    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;
  }
});

noBtn.addEventListener("click", () => {
  alert("I'm sorry, I can't let you choose that option! 😅");
});
