import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { updateQuiz } from "../redux/slices/adminSlice";

export default function QuizEditModal({ onBack, quiz }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.quiz);
  const { categories } = useSelector((state) => state.quiz);
console.log(quiz +12345);

  const categoryMap = {
    CLOUD_COMPUTING: "Cloud Computing",
    MOBILE_DEV: "Mobile Development",
    WEB_DEV: "Web Development",
    DATA_SCIENCE: "Data Science",
    GAME_DEV: "Game Development",
    AI: "Artificial Development",
    BLOCKCHAIN: "Block Chain",
    CYBER_SECURITY: "Cyber Security",
    DEVOPS: "Devops",
  };

  const [formData, setFormData] = useState({
    title: quiz.title,
    description: quiz.description,
    category: quiz.category,
    timeLimit: quiz.timeLimit,
    passingScore: quiz.passingScore,
    xpReward: quiz.xpReward,
    questions: quiz.questions || [],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (formData.questions.length === 0) {
      newErrors.questions = "At least one question is required";
    }

    formData.questions.forEach((q, index) => {
      if (!q.questionText.trim()) {
        newErrors[`question_${index}`] = "Question text is required";
      }
      if (q.options.some((opt) => !opt.optionText.trim())) {
        newErrors[`options_${index}`] = "All options must be filled";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        updateQuiz({
          quizId: quiz.id,
          quizData: formData,
        })
      ).unwrap();

      alert("Quiz updated successfully!");
      onBack();
    } catch (error) {
      alert("Failed to update quiz: " + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add a new question
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionText: "",
          type: "MULTIPLE_CHOICE",
          points: 10,
          options: [
            { optionText: "", optionIndex: 0 },
            { optionText: "", optionIndex: 1 },
            { optionText: "", optionIndex: 2 },
            { optionText: "", optionIndex: 3 },
          ],
          correctAnswerIndex: 0,
        },
      ],
    });
  };

  // Remove a question
  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  // Update question field
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };


  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = {
      ...newQuestions[questionIndex].options[optionIndex],
      optionText: value,
    };
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };
  const addOption = (questionIndex) => {
    const newQuestions = [...formData.questions];
    const newOptionIndex = newQuestions[questionIndex].options.length;
    newQuestions[questionIndex].options.push({
      optionText: "",
      optionIndex: newOptionIndex,
    });
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  // Remove option from a question
  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...formData.questions];
    if (newQuestions[questionIndex].options.length > 2) {
      newQuestions[questionIndex].options = newQuestions[
        questionIndex
      ].options.filter((_, i) => i !== optionIndex);

      // Re-index options
      newQuestions[questionIndex].options.forEach((opt, idx) => {
        opt.optionIndex = idx;
      });

      // Adjust correct answer index if needed
      if (newQuestions[questionIndex].correctAnswerIndex >= optionIndex) {
        newQuestions[questionIndex].correctAnswerIndex = Math.max(
          0,
          newQuestions[questionIndex].correctAnswerIndex - 1
        );
      }

      setFormData({
        ...formData,
        questions: newQuestions,
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl ">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-lg hover:bg-slate-100"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Edit Quiz</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Quiz Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter updated quiz title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quiz description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat, index) => (
                    <option key={cat} value={cat}>
                      {categoryMap[cat]}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  name="passingScore"
                  value={formData.passingScore}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  XP Reward
                </label>
                <input
                  type="number"
                  name="xpReward"
                  value={formData.xpReward}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FaPlus /> Add Question
            </button>
          </div>

          {errors.questions && (
            <p className="mb-4 text-sm text-red-600">{errors.questions}</p>
          )}

          <div className="space-y-6">
            {formData.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="p-4 border rounded-lg border-slate-200 bg-slate-50"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium text-slate-900">
                    Question {qIndex + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="p-1 text-red-600 transition-colors hover:bg-red-50 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Question Text *
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) =>
                        updateQuestion(qIndex, "questionText", e.target.value)
                      }
                      rows="2"
                      className="w-full px-4 py-2 bg-white border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your question"
                    />
                    {errors[`question_${qIndex}`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`question_${qIndex}`]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-slate-700">
                        Points
                      </label>
                      <input
                        type="number"
                        value={question.points}
                        onChange={(e) =>
                          updateQuestion(
                            qIndex,
                            "points",
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                        className="w-full px-4 py-2 bg-white border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">
                        Options *
                      </label>
                      <button
                        type="button"
                        onClick={() => addOption(qIndex)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Add Option
                      </button>
                    </div>
                    {errors[`options_${qIndex}`] && (
                      <p className="mb-2 text-sm text-red-600">
                        {errors[`options_${qIndex}`]}
                      </p>
                    )}
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={question.correctAnswerIndex === oIndex}
                            onChange={() =>
                              updateQuestion(
                                qIndex,
                                "correctAnswerIndex",
                                oIndex
                              )
                            }
                            className="w-4 h-4 text-blue-600"
                          />
                          <input
                            type="text"
                            value={option.optionText}
                            onChange={(e) =>
                              updateOption(qIndex, oIndex, e.target.value)
                            }
                            className="flex-1 px-4 py-2 bg-white border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          {question.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeOption(qIndex, oIndex)}
                              className="p-2 text-red-600 transition-colors hover:bg-red-50 rounded"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Select the radio button to mark the correct answer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-slate-700 transition-colors border rounded-lg border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
