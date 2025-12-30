import { useState } from "react";

export function useConfirm() {
  const [confirmState, setConfirmState] = useState(null);

  const confirm = (message) =>
    new Promise((resolve) => {
      setConfirmState({ message, resolve });
    });

  const handleConfirm = (result) => {
    confirmState.resolve(result);
    setConfirmState(null);
  };
 
  const ConfirmDialog = () =>
    confirmState ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative w-full max-w-md mx-4 transition-all transform bg-white shadow-2xl rounded-xl">
          <div className="p-6">
            <div className="flex items-start mb-6">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-4 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Confirm Action</h3>
                <p className="leading-relaxed text-gray-600">{confirmState.message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleConfirm(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  return { confirm, ConfirmDialog };
}
