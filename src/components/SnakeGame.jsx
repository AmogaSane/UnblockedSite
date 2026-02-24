import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

export const SnakeGame = ({ onGameOver }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let dx = 0;
    let dy = 0;
    let nextDx = 0;
    let nextDy = 0;
    let currentScore = 0;

    const draw = () => {
      if (isPaused) return;

      // Move snake
      dx = nextDx;
      dy = nextDy;
      
      if (dx !== 0 || dy !== 0) {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        
        // Wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
          onGameOver(currentScore);
          return;
        }

        // Self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
          onGameOver(currentScore);
          return;
        }

        snake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          currentScore += 10;
          setScore(currentScore);
          food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
          };
        } else {
          snake.pop();
        }
      }

      // Clear canvas
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid (subtle)
      ctx.strokeStyle = '#eee';
      for(let i=0; i<canvas.width; i+=gridSize) {
        ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4);
      ctx.strokeStyle = '#000';
      ctx.strokeRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 4, gridSize - 4);

      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#00FF00' : '#000';
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (dy === 0) { nextDx = 0; nextDy = -1; } break;
        case 'ArrowDown': if (dy === 0) { nextDx = 0; nextDy = 1; } break;
        case 'ArrowLeft': if (dx === 0) { nextDx = -1; nextDy = 0; } break;
        case 'ArrowRight': if (dx === 0) { nextDx = 1; nextDy = 0; } break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(draw, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isPaused, onGameOver]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full font-mono text-sm uppercase font-bold">
        <span>Score: {score}</span>
        <button onClick={() => setIsPaused(!isPaused)} className="hover:underline">
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="brutal-border bg-white cursor-none"
      />
      <div className="text-xs font-mono opacity-50">USE ARROW KEYS TO MOVE</div>
    </div>
  );
};
