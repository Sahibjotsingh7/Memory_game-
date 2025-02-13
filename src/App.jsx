

import { useState } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";

const images = [
  "https://img.freepik.com/premium-vector/cute-man-riding-camel-watercolor-11_1095608-1421.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/free-vector/dragon-concept-illustration_114360-8341.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/free-vector/cute-astronaut-concept-illustration_114360-8709.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/cartoon-character-genie-djin-from-movie-genie-winked-hand-drawing-vector-vintage-style_772546-820.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/samurai-cyborg-man-cyberpunk-style-cartoon-character-illustration_132871-187.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/vibrant-parrot-holding-sleek-gun-capturing-juxtaposition-nature-weaponry_646696-5056.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/tiki-mask-illustration-your-work-logo-mascot-merchandise-t-shirt-stickers-vector-design_739217-15.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
  "https://img.freepik.com/premium-vector/hawaiian-tripple-tiki-smoking-logo-illustration_446331-25.jpg?uid=R183627037&ga=GA1.1.1776138257.1705478356&semt=ais_hybrid",
];




const shuffledCards = () => {
  const pairedImages = [...images, ...images];
  return pairedImages
    .map((image, index) => ({ id: index, image, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
};

function App() {
  const [cards, setCards] = useState(shuffledCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [isResetting, setIsResetting] = useState(false); // State to track reset animation
  const frontBg = "https://images.pexels.com/photos/13368318/pexels-photo-13368318.jpeg";

  const flipCard = (id) => {
    if (flippedCards.length === 2 || isResetting) return;
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    const newFlippedCards = [...flippedCards, newCards.find((card) => card.id === id)];
    setFlippedCards(newFlippedCards);
    if (newFlippedCards.length === 2) {
      setTimeout(() => checkMatch(newFlippedCards), 700);
    }
  };

  const checkMatch = (flippedCards) => {
    if (flippedCards[0].image === flippedCards[1].image) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.image === flippedCards[0].image ? { ...card, matched: true } : card
        )
      );
    } else {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === flippedCards[0].id || card.id === flippedCards[1].id
            ? { ...card, flipped: false }
            : card
        )
      );
    }
    setFlippedCards([]);
  };

  const restartGame = () => {
    setIsResetting(true); // Trigger reset animation
    setTimeout(() => {
      setCards(shuffledCards());
      setFlippedCards([]);
      setIsResetting(false); // Reset animation state
    }, 1000); // Match the duration of the reset animation
  };

  return (
    <div className="main-container">
      <h1>Memory Game</h1>
      <button className="restart-btn" onClick={restartGame}>
        Restart Game
      </button>
      <div className="card-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""} ${
              card.matched ? "matched" : ""
            } ${isResetting ? "resetting" : ""}`}
            onClick={() => !card.flipped && !card.matched && flipCard(card.id)}
          >
            <div className="card-inner">
              <div className="card-front" style={{ backgroundImage: `url(${frontBg})` }}></div>
              <div className="card-back" style={{ backgroundImage: `url(${card.image})` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;