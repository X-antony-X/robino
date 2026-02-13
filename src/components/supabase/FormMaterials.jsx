import { useEffect, useState } from "react";
import { GetMaterial } from "./GetMaterial";
import { AddMaterial } from "./AddMaterial";
import { deleteMaterial } from "./deleteMaterial";

function FormMaterials() {
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchMaterials() {
    const data = await GetMaterial();
    setMaterials(data);
  }

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!material.trim()) return;

    setLoading(true);
    await AddMaterial(material);
    setMaterial("");
    await fetchMaterials();
    setLoading(false);
  }

  async function handleDelete(id) {
    await deleteMaterial(id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-3 items-center"
      >
        <input
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          type="text"
          placeholder="Material name"
          className="w-full sm:flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Material</th>
              <th className="text-center px-4 py-2 w-32">Action</th>
            </tr>
          </thead>

          <tbody>
            {materials.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-400">
                  No materials yet
                </td>
              </tr>
            )}

            {materials.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="px-4 py-2">{m.material}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormMaterials