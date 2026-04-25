

type PopUpProps = {
  onClose: () => void;
};

function PopUp({ onClose }: PopUpProps) {
  return (
    <div
      className="
      fixed inset-0 z-100 bg-white 
      md:absolute md:inset-auto md:top-20 md:right-2
      md:w-150 md:h-auto md:max-h-150
      md:rounded-2xl md:shadow-2xl md:border md:border-gray-100
      flex flex-col overflow-hidden"
    >
      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>

        <button
          onClick={onClose}
          className="md:hidden text-gray-500 text-2xl font-light"
        >
          &times;
        </button>
        <span className="hidden md:block bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-bold">
          0 New
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl opacity-50">🔔</span>
        </div>
        <p className="text-xl font-semibold text-gray-700 mb-2">
          Your inbox is empty
        </p>
        <p className="text-gray-400 max-w-62.5 mx-auto">
          We'll notify you when something important happens.
        </p>
      </div>
    </div>
  );
}

export default PopUp;
