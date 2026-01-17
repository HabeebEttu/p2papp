import { useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
  FaStar,
  FaArrowLeft,
  FaChartLine,
} from "react-icons/fa";

function QuizResults({ onBack }) {
  const result = useSelector((state) => state.quiz.quizResult);

  if (!result) {
    return (
      <div className="text-center">
        <p className="text-slate-600">No results available</p>
        <button
          onClick={onBack}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  const scorePercentage = result.percentageScore;
  const isPassed = result.passed;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-lg hover:bg-slate-100"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Quiz Results</h2>
      </div>

      {/* Score Card */}
      <div
        className={`p-8 mb-6 text-center bg-white border-2 shadow-lg rounded-xl ${
          isPassed ? "border-green-500" : "border-red-500"
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          {isPassed ? (
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <FaTrophy className="text-4xl text-green-600" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
              <FaTimesCircle className="text-4xl text-red-600" />
            </div>
          )}
        </div>

        <h3
          className={`mb-2 text-3xl font-bold ${
            isPassed ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPassed ? "Congratulations!" : "Keep Trying!"}
        </h3>
        <p className="mb-6 text-lg text-slate-600">
          {isPassed
            ? "You passed the quiz!"
            : "You didn't pass this time, but don't give up!"}
        </p>

        <div className="grid grid-cols-2 gap-6 mb-6 md:grid-cols-4">
          <div className="p-4 rounded-lg bg-slate-50">
            <p className="mb-1 text-sm text-slate-600">Score</p>
            <p className="text-2xl font-bold text-slate-900">
              {result.score}/{result.maxScore}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50">
            <p className="mb-1 text-sm text-slate-600">Percentage</p>
            <p className="text-2xl font-bold text-slate-900">
              {scorePercentage}%
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50">
            <p className="mb-1 text-sm text-slate-600">Correct</p>
            <p className="text-2xl font-bold text-green-600">
              {result.correctAnswers}/{result.totalQuestions}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50">
            <p className="mb-1 text-sm text-slate-600">XP Earned</p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-600">
              <FaStar />
              {result.xpAwarded}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-4 bg-slate-200 rounded-full">
            <div
              className={`h-4 rounded-full transition-all ${
                isPassed ? "bg-green-600" : "bg-red-600"
              }`}
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FaChartLine className="text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">
            Detailed Results
          </h3>
        </div>

        <div className="space-y-4">
          {result.questionResults.map((questionResult, index) => (
            <div
              key={questionResult.questionId}
              className={`p-5 bg-white border-l-4 rounded-lg shadow-sm ${
                questionResult.isCorrect ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${
                      questionResult.isCorrect ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {questionResult.isCorrect ? (
                      <FaCheckCircle className="text-sm text-green-600" />
                    ) : (
                      <FaTimesCircle className="text-sm text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">
                      Question {index + 1}
                    </h4>
                    <p className="mt-1 text-slate-700">
                      {questionResult.questionText}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    questionResult.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {questionResult.pointsAwarded}/{questionResult.maxPoints} pts
                </span>
              </div>

              <div className="pl-9 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600">
                    Your answer:
                  </span>
                  <span
                    className={`text-sm ${
                      questionResult.isCorrect
                        ? "text-green-700 font-medium"
                        : "text-red-700 font-medium"
                    }`}
                  >
                    {questionResult.selectedAnswer !== null
                      ? `Option ${questionResult.selectedAnswer + 1}`
                      : "Not answered"}
                  </span>
                </div>
                {!questionResult.isCorrect && (
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-slate-600">
                      Correct answer:
                    </span>
                    <span className="text-sm font-medium text-green-700">
                      Option {questionResult.correctAnswer + 1}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
        {!isPassed && (
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-6 py-3 transition-colors border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Tips Section */}
      {!isPassed && (
        <div className="p-6 mt-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="mb-2 font-semibold text-blue-900">
            Tips for Next Time
          </h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Review the questions you got wrong</li>
            <li>• Take your time to read each question carefully</li>
            <li>• Study the material before attempting again</li>
            <li>• Focus on understanding concepts, not just memorizing</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizResults;
