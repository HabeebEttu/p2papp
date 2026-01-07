import React, { useState, useEffect } from 'react';
import { 
  FaTimes, FaImage, FaBold, FaItalic, FaCode, FaListUl, FaListOl, 
  FaLink, FaEye, FaEdit, FaThumbsUp, FaThumbsDown, FaComment, 
  FaCalendar, FaUser, FaClock, FaArrowLeft,
  FaTable,
  FaMinus
} from 'react-icons/fa';

export default function EditArticleModal({ article, onClose, onSave ,loading}) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    category: article?.category || "",
    body: article?.bodyMarkdown || "",
  });
  console.log(article);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    article?.coverImageUrl || ""
  );
  const [showPreview, setShowPreview] = useState(false);
  const [categories] = useState([
    { value: "WEB_DEV", label: "Web Development" },
    { value: "MOBILE_DEV", label: "Mobile Development" },
    { value: "DATA_SCIENCE", label: "Data Science" },
    { value: "GAME_DEV", label: "Game Development" },
    { value: "AI", label: "Artificial Intelligence" },
    { value: "BLOCKCHAIN", label: "Blockchain" },
    { value: "CYBER_SECURITY", label: "Cyber Security" },
    { value: "CLOUD_COMPUTING", label: "Cloud Computing" },
    { value: "DEVOPS", label: "DevOps" },
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertMarkdown = (syntax, placeholder = "") => {
    const textarea = document.getElementById("markdown-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.body.substring(start, end);
    const beforeText = formData.body.substring(0, start);
    const afterText = formData.body.substring(end);

    let newText = "";
    let cursorOffset = 0;

    switch (syntax) {
      case "bold":
        newText = `**${selectedText || placeholder}**`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case "italic":
        newText = `*${selectedText || placeholder}*`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case "code":
        newText = `\`${selectedText || placeholder}\``;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case "ul":
        newText = `\n- ${selectedText || placeholder}`;
        cursorOffset = selectedText ? newText.length : 3;
        break;
      case "ol":
        newText = `\n1. ${selectedText || placeholder}`;
        cursorOffset = selectedText ? newText.length : 4;
        break;
      case "link":
        newText = `[${selectedText || placeholder}](url)`;
        cursorOffset = selectedText ? newText.length - 4 : 1;
        break;
      case "heading":
        newText = `\n## ${selectedText || placeholder}`;
        cursorOffset = selectedText ? newText.length : 4;
        break;
      case "table":
        const rows = prompt("Number of rows (including header)?", "3");
        const cols = prompt("Number of columns?", "3");

        if (!rows || !cols) return;

        const numRows = parseInt(rows);
        const numCols = parseInt(cols);

        // Build header - START WITH |
        let tableMarkdown = "\n| ";
        for (let i = 1; i <= numCols; i++) {
          tableMarkdown += `Header ${i}`;
          if (i < numCols) {
            tableMarkdown += " | ";
          }
        }
        tableMarkdown += " |\n";

        // Build separator
        tableMarkdown += "|";
        for (let i = 0; i < numCols; i++) {
          tableMarkdown += "----------|";
        }
        tableMarkdown += "\n";

        // Build data rows
        for (let r = 1; r < numRows; r++) {
          tableMarkdown += "| ";
          for (let c = 1; c <= numCols; c++) {
            tableMarkdown += `Cell ${r},${c}`;
            if (c < numCols) {
              tableMarkdown += " | ";
            }
          }
          tableMarkdown += " |\n";
        }

        newText = tableMarkdown;
        cursorOffset = 2;
        break;
      case "image":
        newText = `![${selectedText || "alt text"}](image-url)`;
        cursorOffset = selectedText ? newText.length - 11 : 2;
        break;
      case "hr":
        newText = `\n---\n`;
        cursorOffset = newText.length;
        break;
      default:
        return;
    }

    const updatedBody = beforeText + newText + afterText;
    setFormData({ ...formData, body: updatedBody });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 0);
  };

  const renderMarkdownPreview = (markdown) => {
    let html = markdown;
    html = html.replace(/^---+$/gm, '<hr class="my-4 border-slate-300" />');
    html = html.replace(/^\*\*\*+$/gm, '<hr class="my-4 border-slate-300" />');
    html = html.replace(/^___+$/gm, '<hr class="my-4 border-slate-300" />');

    html = html.replace(
      /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|[\n\r]*)+)/gm,
      (match, header, rows) => {
        console.log("=== TABLE DEBUG ===");
        console.log("Full match:", JSON.stringify(match));
        console.log("Header captured:", JSON.stringify(header));
        console.log("Rows captured:", JSON.stringify(rows));
        console.log("Rows split by newline:", rows.split("\n"));
        // Parse header
        const headers = header
          .split("|")
          .map((h) => h.trim())
          .filter((h) => h);

        // Parse rows - FIXED: properly split by newlines first
        const rowsArray = rows
          .trim()
          .split("\n")
          .map((row) => {
            // Remove leading/trailing pipes and split
            const cleaned = row.trim().replace(/^\||\|$/g, "");
            return cleaned.split("|").map((cell) => cell.trim());
          })
          .filter((row) => row.length > 0 && row[0] !== ""); // Filter empty rows

        console.log("Headers:", headers);
        console.log("Rows:", rowsArray);

        // Build HTML table
        let tableHtml = '<div class="overflow-x-auto my-4">';
        tableHtml +=
          '<table class="min-w-full border-collapse border border-slate-300">';

        // Table header
        tableHtml += '<thead class="bg-slate-100"><tr>';
        headers.forEach((header) => {
          tableHtml += `<th class="border border-slate-300 px-4 py-2 text-left font-semibold">${header}</th>`;
        });
        tableHtml += "</tr></thead>";

        // Table body
        tableHtml += "<tbody>";
        rowsArray.forEach((row) => {
          tableHtml += '<tr class="hover:bg-slate-50">';
          row.forEach((cell) => {
            tableHtml += `<td class="border border-slate-300 px-4 py-2">${cell}</td>`;
          });
          tableHtml += "</tr>";
        });
        tableHtml += "</tbody>";

        tableHtml += "</table></div>";

        return tableHtml;
      }
    ); // Images (must be done before links)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      return `<img src="${src}" alt="${alt}" class="max-w-full h-auto rounded-lg my-4" />`;
    });
    html = html.replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>'
    );
    html = html.replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>'
    );
    html = html.replace(
      /^# (.*$)/gim,
      '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>'
    );
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(
      /`(.*?)`/g,
      '<code class="bg-slate-100 px-1 rounded">$1</code>'
    );
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
    );
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(
      /(<li class="ml-4">.*<\/li>)/gs,
      '<ul class="list-item list-[circle]">$1</ul>'
    );
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>');
    html = html.replace(/\n/g, "<br />");

    return html;
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.body) {
      alert("Please fill in all required fields");
      return;
    }
onSave({ ...formData, imageFile, coverImage: imagePreview });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Edit Article</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors text-slate-500 hover:text-slate-900"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter article title..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Cover Image
            </label>
            <div className="flex gap-4">
              <label className="flex items-center justify-center flex-1 px-4 py-8 transition-colors border-2 border-dashed rounded-lg cursor-pointer border-slate-300 hover:border-blue-500">
                <div className="text-center">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={
                          imagePreview.startsWith("data:")
                            ? imagePreview
                            : `http://localhost:8080${imagePreview}`
                        }
                        alt="Preview"
                        className="mx-auto rounded-lg max-h-32"
                      />
                      <p className="text-sm text-slate-600">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <>
                      <FaImage className="mx-auto mb-2 text-3xl text-slate-400" />
                      <p className="text-sm text-slate-600">
                        Click to upload cover image
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">
                Content (Markdown)
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-3 py-1 text-sm transition-colors border rounded-lg text-slate-600 hover:text-slate-900 border-slate-300 hover:bg-slate-50"
              >
                <FaEye />
                {showPreview ? "Edit" : "Preview"}
              </button>
            </div>

            {!showPreview && (
              <div className="flex flex-wrap gap-2 p-2 mb-2 border rounded-t-lg bg-slate-50 border-slate-300">
                <button
                  type="button"
                  onClick={() => insertMarkdown("heading", "Heading")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Heading"
                >
                  <span className="font-bold">H</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("bold", "bold text")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Bold"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("italic", "italic text")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Italic"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("code", "code")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Code"
                >
                  <FaCode />
                </button>
                <div className="w-px h-6 my-auto bg-slate-300"></div>
                <button
                  type="button"
                  onClick={() => insertMarkdown("ul", "list item")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Bullet List"
                >
                  <FaListUl />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("ol", "list item")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Numbered List"
                >
                  <FaListOl />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("link", "link text")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Link"
                >
                  <FaLink />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("image", "alt text")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Image"
                >
                  <FaImage />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("table")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Table"
                >
                  <FaTable />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("hr")}
                  className="p-2 transition-colors rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  title="Horizontal Line"
                >
                  <FaMinus />
                </button>
              </div>
            )}

            {showPreview ? (
              <div
                className="w-full min-h-[300px] px-4 py-3 border rounded-b-lg border-slate-300 bg-white prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    renderMarkdownPreview(formData.body) ||
                    '<p class="text-slate-400">Nothing to preview yet...</p>',
                }}
              />
            ) : (
              <textarea
                id="markdown-editor"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                className="w-full px-4 py-3 font-mono text-sm border border-t-0 rounded-b-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="15"
                placeholder="Write your article content in markdown..."
              />
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 px-6 py-3 text-sm font-bold text-white transition-colors  rounded-lg  ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {!loading ? "Save Changes" : "Saving Changes..."}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-bold transition-colors border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function ArticleViewer({ article, onClose, onLike, onDislike, onComment }) {
  const [commentText, setCommentText] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCategory = (category) => {
    if (!category) return '';
    return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  };

  const getCategoryColor = (category) => {
    const colors = {
      WEB_DEV: 'bg-blue-100 text-blue-700',
      MOBILE_DEV: 'bg-green-100 text-green-700',
      DATA_SCIENCE: 'bg-purple-100 text-purple-700',
      GAME_DEV: 'bg-pink-100 text-pink-700',
      AI: 'bg-indigo-100 text-indigo-700',
      BLOCKCHAIN: 'bg-yellow-100 text-yellow-700',
      CYBER_SECURITY: 'bg-red-100 text-red-700',
      CLOUD_COMPUTING: 'bg-cyan-100 text-cyan-700',
      DEVOPS: 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment && onComment(commentText);
      setCommentText('');
      setShowCommentForm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm border-slate-200">
        <div className="max-w-4xl px-4 py-4 mx-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to Articles</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl px-4 py-8 mx-auto">
        {/* Cover Image */}
        {article.coverImageUrl && (
          <div className="mb-8 overflow-hidden rounded-xl">
            <img
              src={`http://localhost:8080${article.coverImageUrl}`}
              alt={article.title}
              className="object-cover w-full h-96"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8">
          <span className={`inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full ${getCategoryColor(article.category)}`}>
            {formatCategory(article.category)}
          </span>

          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <FaCalendar className="text-slate-400" />
              {formatDate(article.createdAt)}
            </span>
            {article.updatedAt && article.updatedAt !== article.createdAt && (
              <span className="flex items-center gap-2">
                <FaClock className="text-slate-400" />
                Updated {formatDate(article.updatedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Article Body */}
        <div className="p-8 mb-8 bg-white shadow-sm rounded-xl">
          <div 
            className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />
        </div>

        {/* Engagement Section */}
        <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={onLike}
              className="flex items-center gap-2 px-6 py-3 transition-colors rounded-lg bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-700"
            >
              <FaThumbsUp className="text-xl" />
              <span className="font-semibold">{article.likes}</span>
            </button>
            <button
              onClick={onDislike}
              className="flex items-center gap-2 px-6 py-3 transition-colors rounded-lg bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700"
            >
              <FaThumbsDown className="text-xl" />
              <span className="font-semibold">{article.dislikes}</span>
            </button>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="flex items-center gap-2 px-6 py-3 transition-colors rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700"
            >
              <FaComment className="text-xl" />
              <span className="font-semibold">{article.comments?.length || 0}</span>
            </button>
          </div>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className="p-6 mb-8 bg-white shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Add a Comment</h3>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Share your thoughts..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmitComment}
                className="px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Post Comment
              </button>
              <button
                onClick={() => setShowCommentForm(false)}
                className="px-6 py-2 text-sm font-medium transition-colors border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="p-6 bg-white shadow-sm rounded-xl">
          <h3 className="mb-6 text-2xl font-bold text-slate-900">
            Comments ({article.comments?.length || 0})
          </h3>

          {article.comments && article.comments.length > 0 ? (
            <div className="space-y-6">
              {article.comments.map((comment, index) => (
                <div key={index} className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-slate-400">
                      {comment.user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{comment.user?.username || 'Anonymous'}</p>
                      <p className="text-sm text-slate-500">{formatDate(comment.commentedAt)}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 ml-13">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}
