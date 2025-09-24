import MedTechDashboard from "../../components/ui/charts/charts";
import UsersLinerChart from "../../components/ui/charts/liner-chart";
import SliderChart from "../../components/ui/charts/slider-chart";

export const AdminPanel = () => {
  return (
    <div className="p-6">
      <div className="bg-gray-100 rounded-sm shadow my-3 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MedTechDashboard />
          <UsersLinerChart />
        </div>

        <div className="mt-4">
          <SliderChart />
        </div>
      </div>
    </div>
  );
};
