"use client";

import { useState } from "react";

interface Answer {
  text: string;
  icon: string;
  personality: string;
}

interface Question {
  text: string;
  answers: Answer[];
}

interface Personality {
  name: string;
  coffee: string;
  tagline: string;
  emoji: string;
}

const questions: Question[] = [
  {
    text: "What's your ideal weekend?",
    answers: [
      {
        text: "Hiking, trying new places",
        icon: "🏔️",
        personality: "Bold Adventurer",
      },
      { text: "Movie marathon at home", icon: "🛋️", personality: "Cozy Classic" },
      {
        text: "Brunch with friends",
        icon: "🎉",
        personality: "Sweet Enthusiast",
      },
      {
        text: "Yoga, reading, quiet time",
        icon: "🧘",
        personality: "Zen Minimalist",
      },
    ],
  },
  {
    text: "How do you take your coffee?",
    answers: [
      {
        text: "Strong, hot, no sugar",
        icon: "⚡",
        personality: "Bold Adventurer",
      },
      {
        text: "Warm, same way every time",
        icon: "☕",
        personality: "Cozy Classic",
      },
      {
        text: "Lots of cream and syrup",
        icon: "🍮",
        personality: "Sweet Enthusiast",
      },
      { text: "Black, nothing added", icon: "🖤", personality: "Zen Minimalist" },
    ],
  },
  {
    text: "What's your work style?",
    answers: [
      {
        text: "Jump in headfirst, love challenges",
        icon: "🚀",
        personality: "Bold Adventurer",
      },
      {
        text: "Steady, reliable, build processes",
        icon: "📋",
        personality: "Cozy Classic",
      },
      {
        text: "Collaborative and fun",
        icon: "🤝",
        personality: "Sweet Enthusiast",
      },
      {
        text: "Focused, intentional, no distractions",
        icon: "🎯",
        personality: "Zen Minimalist",
      },
    ],
  },
  {
    text: "Your ideal vacation?",
    answers: [
      {
        text: "Backpacking somewhere new",
        icon: "🎒",
        personality: "Bold Adventurer",
      },
      {
        text: "Returning to a favorite spot",
        icon: "🏡",
        personality: "Cozy Classic",
      },
      {
        text: "Beach resort, all the amenities",
        icon: "🏖️",
        personality: "Sweet Enthusiast",
      },
      {
        text: "Retreat center, peaceful nature",
        icon: "🌿",
        personality: "Zen Minimalist",
      },
    ],
  },
  {
    text: "How do you handle stress?",
    answers: [
      {
        text: "Tackle it head-on, stay energized",
        icon: "💪",
        personality: "Bold Adventurer",
      },
      {
        text: "Cozy comfort - tea and blanket",
        icon: "🍵",
        personality: "Cozy Classic",
      },
      {
        text: "Treat yourself - dessert or shopping",
        icon: "🍰",
        personality: "Sweet Enthusiast",
      },
      {
        text: "Meditation and breathing exercises",
        icon: "🌬️",
        personality: "Zen Minimalist",
      },
    ],
  },
];

const personalities: Record<string, Personality> = {
  "Bold Adventurer": {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for the rush! Strong, bold, and ready to conquer anything.",
    emoji: "⚡",
  },
  "Cozy Classic": {
    name: "Cozy Classic",
    coffee: "Medium Roast Drip",
    tagline:
      "You're reliable, warm, and always there when someone needs you. A true classic!",
    emoji: "☕",
  },
  "Sweet Enthusiast": {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline:
      "You bring sweetness to everyone's life. Fun, social, and always up for a good time!",
    emoji: "🎉",
  },
  "Zen Minimalist": {
    name: "Zen Minimalist",
    coffee: "Black Coffee",
    tagline:
      "You appreciate simplicity and clarity. Focused, intentional, and at peace with yourself.",
    emoji: "🧘",
  },
};

export default function CoffeeQuiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    "Bold Adventurer": 0,
    "Cozy Classic": 0,
    "Sweet Enthusiast": 0,
    "Zen Minimalist": 0,
  });
  const [result, setResult] = useState<string | null>(null);

  const handleAnswerClick = (personality: string) => {
    const newScores = { ...scores, [personality]: scores[personality] + 1 };
    setScores(newScores);

    if (currentQuestion === questions.length - 1) {
      // Quiz complete, determine result
      const topPersonality = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      setResult(topPersonality);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRetake = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setScores({
      "Bold Adventurer": 0,
      "Cozy Classic": 0,
      "Sweet Enthusiast": 0,
      "Zen Minimalist": 0,
    });
    setResult(null);
  };

  if (!started) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            ☕ What's Your Coffee Personality?
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover which coffee matches your vibe through 5 fun lifestyle
            questions!
          </p>
          <button
            onClick={() => setStarted(true)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-6 rounded-2xl text-lg transition-transform hover:scale-105 border-4 border-[#FF6B6B]"
          >
            🚀 Start Quiz!
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    const personality = personalities[result];
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">{personality.emoji}</div>
          <h2 className="text-4xl font-bold mb-2 text-gray-800">
            {personality.name}
          </h2>
          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-2xl p-6 mb-6">
            <p className="text-2xl font-bold text-white mb-2">
              ☕ {personality.coffee}
            </p>
            <p className="text-lg text-white italic">{personality.tagline}</p>
          </div>
          <p className="text-gray-600 mb-6">
            🎉 Congratulations! This is your coffee match!
          </p>
          <button
            onClick={handleRetake}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-6 rounded-2xl text-lg transition-transform hover:scale-105 border-4 border-[#FF6B6B]"
          >
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-8">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="text-sm font-bold text-gray-600 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {question.text}
        </h2>

        {/* Answer buttons */}
        <div className="space-y-3">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.personality)}
              className="w-full flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-6 rounded-2xl text-left transition-all hover:scale-105 border-4 border-[#FF6B6B] hover:border-[#4ECDC4]"
            >
              <span className="text-2xl">{answer.icon}</span>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
