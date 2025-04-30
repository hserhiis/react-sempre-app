import React, { useEffect, useRef, useState } from "react";
import "./DragonGame.css";

const GRAVITY = 1;
const JUMP_STRENGTH = 15;
const PIZZA_INTERVAL = 2000;

const DragonGame = () => {
  const [dragonY, setDragonY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [score, setScore] = useState(0);

  const dragonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        setVelocity(-JUMP_STRENGTH);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDragonY((y) => Math.min(360, y + velocity));
      setVelocity((v) => v + GRAVITY);
    }, 30);
    return () => clearInterval(interval);
  }, [velocity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPizzas((prev) => [
        ...prev,
        { id: Date.now(), x: 600, y: Math.random() * 340 },
      ]);
    }, PIZZA_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPizzas((prev) =>
        prev
          .map((pizza) => ({ ...pizza, x: pizza.x - 5 }))
          .filter((pizza) => {
            const dragonBox = dragonRef.current?.getBoundingClientRect();
            const pizzaBox = document
              .getElementById(`pizza-${pizza.id}`)
              ?.getBoundingClientRect();

            if (
              dragonBox &&
              pizzaBox &&
              pizzaBox.left < dragonBox.right &&
              pizzaBox.right > dragonBox.left &&
              pizzaBox.top < dragonBox.bottom &&
              pizzaBox.bottom > dragonBox.top
            ) {
              setScore((s) => s + 1);
              return false;
            }

            return pizza.x > -40;
          })
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game">
      <div className="score">🍕 {score}</div>
      <div
        ref={dragonRef}
        className="dragon"
        style={{ top: `${dragonY}px` }}
      >
        🐉
      </div>
      {pizzas.map((pizza) => (
        <div
          key={pizza.id}
          id={`pizza-${pizza.id}`}
          className="pizza"
          style={{ left: pizza.x, top: pizza.y }}
        >
          🍕
        </div>
      ))}
    </div>
  );
};

export default DragonGame;
