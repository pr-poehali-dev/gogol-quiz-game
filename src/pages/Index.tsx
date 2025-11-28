import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type DifficultyLevel = 'beginner' | 'intermediate' | 'expert';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: DifficultyLevel;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'В каком году родился Николай Васильевич Гоголь?',
    options: ['1799', '1809', '1819', '1829'],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 2,
    question: 'Как называется самое известное произведение Гоголя о приключениях помещика?',
    options: ['Ревизор', 'Мёртвые души', 'Шинель', 'Нос'],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 3,
    question: 'В каком городе происходит действие комедии "Ревизор"?',
    options: ['Москва', 'Петербург', 'Уездный город', 'Киев'],
    correctAnswer: 2,
    difficulty: 'beginner'
  },
  {
    id: 4,
    question: 'Какое произведение Гоголь сжёг незадолго до смерти?',
    options: ['Первый том "Мёртвых душ"', 'Второй том "Мёртвых душ"', '"Тарас Бульба"', '"Вий"'],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 5,
    question: 'Как звали главного героя повести "Шинель"?',
    options: ['Акакий Акакиевич', 'Иван Иванович', 'Пётр Петрович', 'Павел Павлович'],
    correctAnswer: 0,
    difficulty: 'intermediate'
  },
  {
    id: 6,
    question: 'Какой сборник повестей Гоголя вышел в 1831-1832 годах?',
    options: ['Петербургские повести', 'Вечера на хуторе близ Диканьки', 'Миргород', 'Арабески'],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 7,
    question: 'Какое учебное заведение окончил Гоголь?',
    options: ['Московский университет', 'Царскосельский лицей', 'Нежинская гимназия', 'Петербургский университет'],
    correctAnswer: 2,
    difficulty: 'expert'
  },
  {
    id: 8,
    question: 'Под каким псевдонимом Гоголь опубликовал поэму "Ганц Кюхельгартен"?',
    options: ['В. Алов', 'Н. Яновский', 'П. Глечик', 'ОООО'],
    correctAnswer: 0,
    difficulty: 'expert'
  },
  {
    id: 9,
    question: 'Какую должность занимал Гоголь в Патриотическом институте?',
    options: ['Учитель русского языка', 'Учитель истории', 'Учитель географии', 'Преподаватель словесности'],
    correctAnswer: 1,
    difficulty: 'expert'
  }
];

const Index = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);

  const difficultyInfo = {
    beginner: { title: 'Новичок', icon: 'BookOpen', color: 'bg-green-500', description: 'Базовые знания о жизни и творчестве Гоголя' },
    intermediate: { title: 'Знаток', icon: 'GraduationCap', color: 'bg-yellow-500', description: 'Углублённое знание произведений' },
    expert: { title: 'Эксперт', icon: 'Crown', color: 'bg-red-500', description: 'Профессиональный уровень знаний' }
  };

  const startGame = (level: DifficultyLevel) => {
    setDifficulty(level);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === filteredQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameState('results');
    }
  };

  const backToMenu = () => {
    setGameState('menu');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getResultMessage = () => {
    const percentage = (score / filteredQuestions.length) * 100;
    if (percentage === 100) return 'Безупречно! Вы настоящий гоголевед!';
    if (percentage >= 70) return 'Отлично! Вы хорошо знаете творчество Гоголя!';
    if (percentage >= 40) return 'Неплохо! Есть куда расти.';
    return 'Стоит перечитать произведения Гоголя!';
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#3d2415] to-[#2C1810] flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon name="BookMarked" size={48} className="text-[#D4AF37]" />
              <h1 className="text-5xl font-bold text-[#F5F5DC]">Квиз о Гоголе</h1>
            </div>
            <p className="text-[#D4AF37] text-lg">Проверьте свои знания о великом русском писателе</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(difficultyInfo).map(([level, info]) => (
              <Card 
                key={level}
                className="bg-[#F5F5DC]/10 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-105 animate-scale-in"
                onClick={() => startGame(level as DifficultyLevel)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={info.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F5DC] mb-2">{info.title}</h3>
                  <p className="text-[#D4AF37] text-sm mb-4">{info.description}</p>
                  <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white">
                    Начать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#3d2415] to-[#2C1810] flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#D4AF37] flex items-center gap-2">
                <Icon name={difficultyInfo[difficulty].icon as any} size={20} />
                {difficultyInfo[difficulty].title}
              </span>
              <span className="text-[#F5F5DC]">
                Вопрос {currentQuestionIndex + 1} из {filteredQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="bg-[#F5F5DC]/10 border-[#D4AF37]/30 mb-6 animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[#F5F5DC] mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let bgColor = 'bg-[#8B4513]/20 hover:bg-[#8B4513]/40';
                  
                  if (showResult) {
                    if (index === currentQuestion.correctAnswer) {
                      bgColor = 'bg-green-500/30 border-green-500';
                    } else if (index === selectedAnswer) {
                      bgColor = 'bg-red-500/30 border-red-500';
                    }
                  } else if (selectedAnswer === index) {
                    bgColor = 'bg-[#D4AF37]/30';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-lg border-2 border-transparent ${bgColor} text-[#F5F5DC] text-left transition-all hover:scale-[1.02] disabled:cursor-not-allowed`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#D4AF37] font-bold">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                        {showResult && index === currentQuestion.correctAnswer && (
                          <Icon name="CheckCircle" size={20} className="ml-auto text-green-400" />
                        )}
                        {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <Icon name="XCircle" size={20} className="ml-auto text-red-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-6 flex items-center justify-between animate-fade-in">
                  <p className="text-[#D4AF37]">
                    Правильных ответов: {score} из {currentQuestionIndex + 1}
                  </p>
                  <Button onClick={nextQuestion} className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#2C1810]">
                    {currentQuestionIndex < filteredQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Button 
            onClick={backToMenu} 
            variant="outline" 
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться в меню
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#3d2415] to-[#2C1810] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-[#F5F5DC]/10 border-[#D4AF37]/30 animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Icon name="Trophy" size={64} className="text-[#D4AF37] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#F5F5DC] mb-2">Квиз завершён!</h2>
            <p className="text-[#D4AF37] text-lg">{getResultMessage()}</p>
          </div>

          <div className="bg-[#8B4513]/20 rounded-lg p-6 mb-6">
            <div className="text-5xl font-bold text-[#D4AF37] mb-2">
              {score} / {filteredQuestions.length}
            </div>
            <div className="text-[#F5F5DC]">
              {Math.round((score / filteredQuestions.length) * 100)}% правильных ответов
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => startGame(difficulty)} 
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Пройти снова
            </Button>
            <Button 
              onClick={backToMenu}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#2C1810]"
            >
              <Icon name="Home" size={20} className="mr-2" />
              В главное меню
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;