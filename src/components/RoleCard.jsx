// 1. Imports remain the same
import React, { useEffect } from 'react';
import { UserCircle2 } from 'lucide-react';

// 2. New scenarios structure organized by difficulty
const scenarios = {
  easy: [
    {
      id: 1,
      theme: 'AT THE CAFE',
      roles: [
        {
          title: 'Customer',
          description: "You want a coffee. Ask about the types of coffee and the prices.",
        },
        {
          title: 'Barista',
          description: "You're a friendly barista. Explain 2-3 coffee options and their prices.",
        },
      ],
    },
    {
      id: 2,
      theme: 'LOST ITEM',
      roles: [
        {
          title: 'Customer',
          description: "You lost your phone after your workout. Describe what it looks like.",
        },
        {
          title: 'Staff',
          description: "You found a phone. Ask what it looks like to confirm it's theirs.",
        },
      ],
    },
  ],
  
  medium: [
    {
      id: 1,
      theme: 'APARTMENT VIEWING',
      roles: [
        {
          title: 'Apartment Seeker',
          description: "You're looking for a quiet apartment near public transport. Ask about noise and location.",
        },
        {
          title: 'Real Estate Agent',
          description: "You're showing a great apartment, but it's next to a train station. Highlight its best features.",
        },
      ],
    },
    {
      id: 2,
      theme: 'RESTAURANT MIX-UP',
      roles: [
        {
          title: 'Customer',
          description: "You got chicken instead of your vegetarian meal. Explain politely but you're in a hurry.",
        },
        {
          title: 'Waiter',
          description: "You're the waiter. Kitchen is very busy but try to solve the problem quickly.",
        },
      ],
    },
    {
      id: 3,
      theme: 'JOB INTERVIEW',
      roles: [
        {
          title: 'Manager',
          description: "You're the manager. Find out why they love books and if they can work weekends.",
        },
        {
          title: 'Student',
          description: "You're a student who reads a lot. Show enthusiasm but you need flexible hours.",
        },
      ],
    },
  ],
  
  hard: [
    {
      id: 1,
      theme: 'BUSINESS MEETING',
      roles: [
        {
          title: 'Project Manager',
          description: "Present your team's progress, explain delays, and propose a new timeline. Handle tough questions.",
        },
        {
          title: 'Client',
          description: "You're concerned about delays and costs. Ask detailed questions about the timeline and budget.",
        },
      ],
    },
    {
      id: 2,
      theme: 'MEDICAL CONSULTATION',
      roles: [
        {
          title: 'Patient',
          description: "Describe your complex symptoms and medical history. Ask about treatment options and side effects.",
        },
        {
          title: 'Doctor',
          description: "Listen carefully, ask relevant questions about symptoms, and explain treatment options clearly.",
        },
      ],
    },
  ],
};

// 3. Shared variable (unchanged)
let sharedScenario = null;

// 4. Updated RoleCard component with difficulty prop
const RoleCard = ({ activePlayer = 1, onScenarioChange, gameKey, difficulty = 'medium' }) => {
  useEffect(() => {
    if (activePlayer === 1 && !sharedScenario) {
      // Get scenarios for selected difficulty
      const difficultyScenarios = scenarios[difficulty];
      const newScenario = difficultyScenarios[
        Math.floor(Math.random() * difficultyScenarios.length)
      ];
      sharedScenario = newScenario;
      if (onScenarioChange) {
        onScenarioChange(newScenario);
      }
    }
  }, [gameKey, activePlayer, onScenarioChange, difficulty]);

  // Clear shared scenario when returning to menu (unchanged)
  useEffect(() => {
    return () => {
      if (activePlayer === 1) {
        sharedScenario = null;
      }
    };
  }, [activePlayer]);

  if (!sharedScenario) return null;

  const playerRole = sharedScenario.roles[activePlayer - 1];

  // JSX remains the same
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">Player {activePlayer}</span>
          <UserCircle2 className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{playerRole.title}</h2>
      </div>
      <div className="pt-2">
        <p className="text-gray-600 leading-relaxed">{playerRole.description}</p>
      </div>
    </div>
  );
};

export default RoleCard;