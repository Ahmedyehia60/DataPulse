import StatBox from "../../components/StatBox";

function DashBoard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-7 relative">
      <StatBox />
      <StatBox />
      <StatBox />
      <StatBox />
    </div>
  );
}

export default DashBoard;
