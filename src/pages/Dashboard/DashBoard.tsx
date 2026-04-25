import AreaChart from "../../components/charts/AreaChart";
import BarChart from "../../components/charts/BarChart";

function DashBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <AreaChart />
      </div>

      <div className="md:col-span-1">
        <BarChart />
      </div>
    </div>
  );
}

export default DashBoard;
