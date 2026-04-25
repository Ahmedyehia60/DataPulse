import StatBox from "../../components/StatBox";
import AreaChart from "../../components/charts/AreaChart";
import BarChart from "../../components/charts/BarChart";

function DashBoard() {
  return (
    <div className="flex flex-col gap-6 p-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox />
        <StatBox />
        <StatBox />
        <StatBox />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <AreaChart />
        </div>

        <div className="md:col-span-1bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
