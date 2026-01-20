import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaImage,
  FaBold,
  FaItalic,
  FaCode,
  FaListUl,
  FaListOl,
  FaLink,
  FaEye,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createArticle, dashboardHome } from "../redux/slices/adminSlice";
import { toast } from "react-toastify";
import { useConfirm } from "../hooks/Confirm";
import articleService from "../services/articles/articles";

function CreateArticleModal({ onClose }) {
    
  const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.admin);
    const {user} = useSelector((state)=>state.auth)
    const [formData, setFormData] = useState({
        title: "",
        category:"",
    body: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
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
  const [categories,setCategories] = useState([])
  useEffect(() => {
    async function getCategories() {
      const res = await articleService.getCategories();
      let label;
      const categoriesMap = res.data.map((item, index) => {
        switch (index) {
          case 0:
            label = 'Web Development'
            break;
          case 1:
            label = 'Mobile Development'
            break;
          case 2:
            label = 'Data Science'
            break;
          case 3:
            label = 'Game Development'
            break;
          case 4:
            label = 'Artifcial Intelligence'
            break;
          case 5:
            label = 'Block Chain'
            break;
          case 6:
            label = 'Cyber Security'
            break;
          case 7:
            label = 'Cloud Computing'
            break;
          case 8:
            label = 'DevOps'
            break;
          default:
            label = ''
            break
        }
        return {
          label,
          value:item
        }
      })
      
      setCategories(categoriesMap)
    }
    getCategories()
  },[]);
  
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

    // Headers
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
      /(<li class="ml-4">.*<\/li>)/s,
      '<ul class="list-disc">$1</ul>'
    );

    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>');

    html = html.replace(/\n/g, "<br />");

    return html;
  };
  const {confirm,ConfirmDialog} = useConfirm()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.body || !formData.title || !formData.category) {
      toast.error("Fill all fields before proceeding");
      return;
    }

    const confirmDialog = await confirm("Do you want to create this article");
    if (!confirmDialog) return;

    try {
      const userId = user?.id;

      const result = await dispatch(
        createArticle({
          userId,
          postData: formData,
          coverImg: imageFile,
        })
      ).unwrap();
      toast.success("Article created successfully");
      onClose();
    } catch (e) {
      toast.error(e.message || "Failed to create article");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <ConfirmDialog />
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Create Article</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors text-slate-500 hover:text-slate-900"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form className="space-y-6" method="post">
          {/* Title */}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-slate-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter article title..."
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-slate-700"
              htmlFor="category"
            >
              Category
            </label>
            <select
              name="category"
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

          {/* Cover Image */}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-slate-700"
              htmlFor="coverImg"
            >
              Cover Image
            </label>
            <div className="flex gap-4">
              <label className="flex items-center justify-center flex-1 px-4 py-8 transition-colors border-2 border-dashed rounded-lg cursor-pointer border-slate-300 hover:border-blue-500">
                <div className="text-center">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview}
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
                  name="coverImg"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Markdown Editor */}
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

            {/* Markdown Toolbar */}
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
              </div>
            )}

            {/* Editor/Preview Area */}
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
                placeholder="Write your article content in markdown...

# Main Heading
## Subheading

**Bold text** and *italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

`inline code`

[Link text](https://example.com)"
              />
            )}

            <p className="mt-2 text-xs text-slate-500">
              Supports Markdown formatting: **bold**, *italic*, `code`, #
              headings, - lists, [links](url)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleSubmit}
              className={`flex-1 px-6 py-3 text-sm font-bold text-white transition-colors ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
             {loading?"Creating Article...":" Create Article"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-bold transition-colors border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArticleModal;
