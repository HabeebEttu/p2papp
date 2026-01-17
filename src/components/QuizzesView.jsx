// QuizzesView.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizList from "./QuizList";
import CreateQuiz from "./CreateQuiz";
import TakeQuiz from "./TakeQuiz";
import QuizResults from "./QuizResults";
import { fetchQuizzes } from "../redux/slices/quizSlice";

function QuizzesView() {
  const dispatch = useDispatch();
  const [view, setView] = useState("list");
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const { quizzes, loading, currentPage, totalPages } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuizzes({ page: currentPage, size: 10 }));
  }, [dispatch, currentPage]);

  const handleTakeQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setView("take");
  };

  const handlePageChange = (page) => {
    dispatch(fetchQuizzes({ page, size: 10 }));
  };

  const renderView = () => {
    switch (view) {
      case "create":
        return <CreateQuiz onBack={() => setView("list")} />;
      case "take":
        return (
          <TakeQuiz
            quizId={selectedQuizId}
            onBack={() => setView("list")}
            onComplete={() => setView("results")}
          />
        );
      case "results":
        return <QuizResults onBack={() => setView("list")} />;
      default:
        return (
          <QuizList
            quizzes={quizzes}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            onCreateClick={() => setView("create")}
            onTakeQuiz={handleTakeQuiz}
            onPageChange={handlePageChange}
          />
        );
    }
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto md:p-8">
      <div className="mx-auto max-w-7xl">{renderView()}</div>
    </div>
  );
}

export default QuizzesView;
