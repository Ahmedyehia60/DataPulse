function PopUp() {
  return (
    <div className="absolute top-20 right-0 w-250 h-150 bg-white shadow-2xl border border-gray-100 rounded-2xl z-50 overflow-hidden ">
      <div className="p-4 border-b border-gray-50 font-semibold">
        Notifications
      </div>
      <div className="p-4 text-sm text-gray-500 flex justify-center">No new notifications yet.</div>
    </div>
  );
}
export default PopUp;
