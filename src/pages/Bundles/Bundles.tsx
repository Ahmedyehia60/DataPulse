import { Plus } from "lucide-react";
import Bundle from "../../components/bundles/Bundle";

function Bundles() {
  return (
    <div className="p-6 bg-slate-100 min-h-screen space-y-6">
      <div className="flex justify-end">
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-black px-4 py-2.5 text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95">
          <Plus size={20} />
          <span className="text-sm font-semibold">Create new bundle</span>
        </button>
      </div>
      <Bundle />
    </div>
  );
}

export default Bundles;
