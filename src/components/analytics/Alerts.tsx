export const Alerts = ({ isDropComing }: { isDropComing: boolean }) => {
  if (!isDropComing) return null;

  return (
    <div className="bg-yellow-100 p-4 rounded-xl text-yellow-800">
      ⚠️ Sales are expected to drop next month
    </div>
  );
};
