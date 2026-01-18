import { useDispatch } from "react-redux";
import {
  FaPlus,
  FaQuestionCircle,
  FaPlay,
  FaTrash,
  FaClock,
  FaTrophy,
  FaBook,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useConfirm } from "../hooks/Confirm";
import { deleteQuiz } from "../redux/slices/adminSlice";

function QuizList({
  quizzes,
  loading,
  onCreateClick,
  onTakeQuiz,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const dispatch = useDispatch();
  const { confirm, ConfirmDialog } = useConfirm();
  const handleDelete = async (quizId, e) => {
    e.stopPropagation();
    const confirmation = await confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (confirmation) {
      dispatch(deleteQuiz({ quizId }));
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      0: "bg-blue-100 text-blue-700",
      1: "bg-purple-100 text-purple-700",
      2: "bg-green-100 text-green-700",
      3: "bg-amber-100 text-amber-700",
      4: "bg-pink-100 text-pink-700",
      5: "bg-indigo-100 text-indigo-700",
      OTHER: "bg-slate-100 text-slate-700",
    };
    return colors[category] || colors.OTHER;
  };
  const categoryMap = {
    CLOUD_COMPUTING: "Cloud Computing",
    MOBILE_DEV: "Mobile Development",
    WEB_DEV: "Web Development",
    DATA_SCIENCE: "Data Science",
    GAME_DEV: "Game Development",
    AI: "Artificial Development",
    BLOCKCHAIN: "Block Chain",
    CYBER_SECURITY: "Cyber Security",
    DEVOPS: "Devops"
  };
  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quiz Management</h2>
          <p className="mt-1 text-sm text-slate-600">
            Create and manage your quizzes
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
        >
          <FaPlus className="text-[20px]" />
          Create Quiz
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-slate-600">Loading quizzes...</p>
          </div>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="p-12 text-center bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full">
            <FaQuestionCircle className="text-[40px] text-blue-600" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-slate-900">
            No quizzes yet
          </h3>
          <p className="mb-6 text-slate-500">
            Create your first quiz to get started with testing knowledge!
          </p>
          <button
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <FaPlus /> Create Your First Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="overflow-hidden transition-all bg-white border shadow-sm cursor-pointer rounded-xl border-slate-200 hover:shadow-md"
                onClick={() => onTakeQuiz(quiz.id)}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                        index
                      )}`}
                    >
                      {categoryMap[quiz.category]}
                    </span>
                    <button
                      onClick={(e) => handleDelete(quiz.id, e)}
                      className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-2">
                    {quiz.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-600 line-clamp-2">
                    {quiz.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pb-4 mb-4 border-b border-slate-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FaBook className="text-blue-600" />
                      </div>
                      <p className="text-xs text-slate-600">Questions</p>
                      <p className="font-semibold text-slate-900">
                        {quiz.questionCount}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FaClock className="text-amber-600" />
                      </div>
                      <p className="text-xs text-slate-600">Time</p>
                      <p className="font-semibold text-slate-900">
                        {quiz.timeLimit}m
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FaTrophy className="text-yellow-600" />
                      </div>
                      <p className="text-xs text-slate-600">XP</p>
                      <p className="font-semibold text-slate-900">
                        {quiz.xpReward}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      By {quiz.creatorUsername}
                    </div>
                    <div className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Pass: {quiz.passingScore}%
                    </div>
                  </div>
                </div>

                {/* Take Quiz Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTakeQuiz(quiz.id);
                  }}
                  className="flex items-center justify-center w-full gap-2 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 hover:bg-blue-700"
                >
                  <FaPlay /> Take Quiz
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 transition-colors border rounded-lg border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onPageChange(index)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === index
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 transition-colors border rounded-lg border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default QuizList;
