import { useEffect, useState } from "react";
import { Package, ShoppingBag, Edit2, Check, X } from "lucide-react";
type BundleItem = {
  id: string;
  name: string;
  productsCount: number;
  productsList: string[];
  confidence?: number;
  lift?: number;
  support?: number;
  coOccurrenceCount?: number;
};
function Bundle() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [bundles, setBundles] = useState<BundleItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://192.168.1.2:5000/api/bundles", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bundles");
        return res.json();
      })
      .then((data) => setBundles(data.bundles || []))
      .catch((err) => {
        console.error("Bundles API Error:", err);
        setBundles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading bundles...</div>;
  }
  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveEdit = (id: string) => {
    setBundles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, name: editName } : b)),
    );
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-1">
      {bundles.map((bundle) => (
        <div
          key={bundle.id}
          className="group relative flex flex-col h-full overflow-hidden rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          {editingId !== bundle.id && (
            <button
              onClick={() => handleStartEdit(bundle.id, bundle.name)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer"
              title="Edit Bundle Name"
            >
              <Edit2 size={16} />
            </button>
          )}
          <div className="flex items-start gap-3 pr-8">
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 min-w-11.5">
              <Package size={22} />
            </div>

            <div className="flex-1 min-w-0">
              {editingId === bundle.id ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-sm font-semibold text-gray-900 border-b-2 border-indigo-500 focus:outline-none py-0.5"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(bundle.id)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded-md cursor-pointer"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <h3 className="font-bold text-gray-900 text-lg wrap-break-word leading-snug pt-1">
                  {bundle.name}
                </h3>
              )}
            </div>
          </div>
          <hr className="border-gray-100 my-4" />
          <div className="space-y-2.5 flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <ShoppingBag size={12} /> Included Products (
              {bundle.productsCount})
            </p>
            <ul className="space-y-1.5">
              {bundle.productsList.map((product, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                  <span className="truncate">{product}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bundle;
