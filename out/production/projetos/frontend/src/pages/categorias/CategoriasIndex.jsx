import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategories, deleteCategory } from "../../services/categoryService";

const CategoriasIndex = () => {
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategorias = async () => {
    try {
      const data = await getAllCategories();
      console.log("Retorno da API de categorias:", data);
      setCategorias(data);
    } catch {
      toast.error("Erro ao buscar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const excluirCategoria = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta categoria?")) return;
    try {
      await deleteCategory(id);
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Categoria excluída com sucesso!");
    } catch {
      toast.error("Erro ao excluir categoria");
    }
  };

const categoriasFiltradas = categorias.filter((cat) =>
  (cat?.name || "").toLowerCase().includes(search.toLowerCase())
);

  if (loading) return <p className="p-6">Carregando categorias...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">Categorias</h1>
        <Link
          to="/categorias/criar"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Nova Categoria
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar categoria"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-full max-w-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
<tbody className="divide-y divide-gray-100 bg-white">
  {categoriasFiltradas.map((cat) => (
    <tr key={cat.id}>
      <td className="px-4 py-2 text-sm text-gray-800">{cat.nameCategory}</td>
      <td className="px-4 py-2 flex gap-3 items-center">
        <button
          onClick={() => navigate(`/categorias/editar/${cat.id}`)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => excluirCategoria(cat.id)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}

            {categoriasFiltradas.length === 0 && (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriasIndex;