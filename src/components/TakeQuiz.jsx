import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaClock, FaCheckCircle } from "react-icons/fa";
import { submitQuiz } from "../redux/slices/quizSlice";
import { quizService } from "../services/quizzes/quizService";

function TakeQuiz({ quizId, onBack, onComplete }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.quiz);

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loadingQuiz, setLoadingQuiz] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && quiz) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const loadQuiz = async () => {
    try {
      const response = await quizService.getQuizById(quizId, false);
      setQuiz(response.data);
      setTimeRemaining(response.data.timeLimit * 60); // Convert to seconds
      setLoadingQuiz(false);
    } catch (error) {
      alert("Failed to load quiz");
      onBack();
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      alert("Please answer at least one question");
      return;
    }

    if (window.confirm("Are you sure you want to submit your quiz?")) {
      try {
        await dispatch(
          submitQuiz({
            quizId: quiz.id,
            answers: answers,
          })
        ).unwrap();

        onComplete();
      } catch (error) {
        alert("Failed to submit quiz: " + error);
      }
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loadingQuiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-slate-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 transition-colors rounded-lg hover:bg-slate-100"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{quiz.title}</h2>
            <p className="text-sm text-slate-600">{quiz.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
          <FaClock className="text-blue-600" />
          <span
            className={`font-bold ${timeRemaining < 60 ? "text-red-600" : "text-blue-600"}`}
          >
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm text-slate-600">
            {answeredCount} answered
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full">
          <div
            className="h-2 transition-all duration-300 bg-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 mb-6 bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="flex items-start justify-between mb-4">
          <h3 className="flex-1 text-lg font-semibold text-slate-900">
            {currentQ.questionText}
          </h3>
          <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {currentQ.points} pts
          </span>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = answers[currentQ.id] === option.optionIndex;

            return (
              <button
                key={option.id}
                onClick={() =>
                  handleAnswerSelect(currentQ.id, option.optionIndex)
                }
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected && (
                      <FaCheckCircle className="text-xs text-white" />
                    )}
                  </div>
                  <span className={isSelected ? "font-medium" : ""}>
                    {option.optionText}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-slate-700 transition-colors border rounded-lg border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`w-8 h-8 rounded-lg font-medium transition-colors ${
                index === currentQuestion
                  ? "bg-blue-600 text-white"
                  : answers[quiz.questions[index].id] !== undefined
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>

      {/* Question Overview */}
      <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
        <h3 className="mb-4 font-semibold text-slate-900">Question Overview</h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {quiz.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => goToQuestion(index)}
              className={`aspect-square rounded-lg font-medium text-sm transition-colors ${
                answers[q.id] !== undefined
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          <span className="inline-block w-3 h-3 mr-2 bg-green-100 border border-green-300 rounded"></span>
          Answered
          <span className="inline-block w-3 h-3 mx-2 bg-slate-100 rounded"></span>
          Not answered
        </p>
      </div>
    </div>
  );
}

export default TakeQuiz;
