document.querySelector("#start-button").addEventListener("click", start);
const container = document.querySelector(".container");
function start() {
  const time = parseInt(document.querySelector("#time-input").value) || 2000;
  const cardCount = parseInt(document.querySelector("#card-count").value) || 10;

  document.querySelector(".dialog").classList.add("hidden");

  const cards = [];

  while (container.children.length > 1) {
    container.removeChild(container.lastChild);
  }

  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = i + 1;
    container.appendChild(card);
    cards.push(card);
  }

  positionCards(cards);

  let currentCard = 1;
  let wrongClicks = 0;

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("cover");
      const handleclick = () => {
        card.classList.remove("cover");
        const cardNumber = parseInt(card.textContent);
        if (cardNumber === currentCard) {
          card.classList.add("correct-card");
          card.classList.remove("incorrect-card");
          currentCard++;
          card.removeEventListener("click", handleclick);
        } else {
          card.classList.add("incorrect-card");
          card.classList.remove("correct-card");
          wrongClicks++;
        }

        if (currentCard > cardCount) {
          document.querySelector(".dialog").classList.remove("hidden");
          document.querySelector(
            "#result"
          ).textContent = `You made ${wrongClicks} wrong clicks. in total ${cardCount} cards.`;
          while (container.children.length > 1) {
            container.removeChild(container.lastChild);
          }
        }
      };
      card.addEventListener("click", handleclick);
    });
  }, time);
}

function positionCards(cards) {
  const containerRect = container.getBoundingClientRect();
  const vmin = Math.min(containerRect.width, containerRect.height) / 100;
  const radius = 5 * vmin;
  const positions = [];

  cards.forEach((card) => {
    card.style.setProperty("--size", `${radius * 2}px`);
    let left = 0;
    let top = 0;
    // collision
    let isColliding = true;

    while (isColliding) {
      left = radius + Math.random() * (containerRect.width - 2 * radius);
      top = radius + Math.random() * (containerRect.height - 2 * radius);

      isColliding = positions.some((position) => {
        const dx = left - position.left;
        const dy = top - position.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 2 * radius) {
          return true;
        }
      });

      if (!isColliding) {
        positions.push({ left, top });
      }
    }

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  });
}
