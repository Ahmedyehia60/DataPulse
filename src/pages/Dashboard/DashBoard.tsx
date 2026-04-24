import StatBox from "../../components/StatBox";

function DashBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-7">
      <StatBox />
      <StatBox />
      <StatBox />
      <StatBox />
    </div>
  );
}

export default DashBoard;
