import React, { useState, useEffect } from 'react';
import { UserCircle2 } from 'lucide-react';

const scenarios = [
  {
    id: 1,
    theme: "AT THE CAFE",
    roles: [
      {
        title: "Customer",
        description: "You're a customer who's new in town. Get coffee recommendations and try to learn about the neighborhood."
      },
      {
        title: "Barista",
        description: "You're a friendly barista who loves this area. Recommend your best drink and share local tips."
      }
    ]
  },
  {
    id: 2,
    theme: "LOST ITEM",
    roles: [
      {
        title: "Customer",
        description: "You lost your phone after your workout. Describe where you last saw it and what it looks like."
      },
      {
        title: "Staff",
        description: "You're gym staff who found a phone. Ask questions to make sure it's the right owner."
      }
    ]
  },
  {
    id: 3,
    theme: "APARTMENT VIEWING",
    roles: [
      {
        title: "Apartment Seeker",
        description: "You're looking for a quiet apartment near public transport. Ask about noise and location."
      },
      {
        title: "Real Estate Agent",
        description: "You're showing a great apartment, but it's next to a train station. Highlight its best features."
      }
    ]
  },
  {
    id: 4,
    theme: "RESTAURANT MIX-UP",
    roles: [
      {
        title: "Customer",
        description: "You got chicken instead of your vegetarian meal. Explain politely but you're in a hurry."
      },
      {
        title: "Waiter",
        description: "You're the waiter. Kitchen is very busy but try to solve the problem quickly."
      }
    ]
  },
  {
    id: 5,
    theme: "JOB INTERVIEW",
    roles: [
      {
        title: "Manager",
        description: "You're the manager. Find out why they love books and if they can work weekends."
      },
      {
        title: "Student",
        description: "You're a student who reads a lot. Show enthusiasm but you need flexible hours."
      }
    ]
  }
];

// Shared variable between all instances of RoleCard
let sharedScenario = null;

const RoleCard = ({ activePlayer = 1, onScenarioChange, gameKey }) => {
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    if (activePlayer === 1) {
      // Only player 1 selects a new scenario
      const newScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      sharedScenario = newScenario;
      setScenario(newScenario);
      if (onScenarioChange) {
        onScenarioChange(newScenario);
      }
    } else {
      // Player 2 uses the scenario selected by player 1
      setScenario(sharedScenario);
    }
  }, [gameKey, activePlayer, onScenarioChange]);

  if (!scenario) return null;

  const playerRole = scenario.roles[activePlayer - 1];

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">
            Player {activePlayer}
          </span>
          <UserCircle2 className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {playerRole.title}
        </h2>
      </div>
      
      <div className="pt-2">
        <p className="text-gray-600 leading-relaxed">
          {playerRole.description}
        </p>
      </div>
    </div>
  );
};

export default RoleCard;
