import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { uploadPlanilha, getAllProducts, deleteProduct } from "../../services/productService";
import { toast } from "react-toastify";

const EstoqueIndex = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        toast.error("Erro ao carregar os produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza de que deseja deletar este produto?")) return;

    try {
      await deleteProduct(id);
      toast.success("Produto deletado com sucesso!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Erro ao deletar o produto.");
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.warn("Selecione um arquivo antes do upload.");
    try {
      await uploadPlanilha(file);
      toast.success("Upload realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar planilha:", error);
      toast.error("Erro ao enviar planilha.");
    }
  };

  const formatarData = (data) => {
    if (!data) return "Sem data";
    try {
      const parsedDate = new Date(data);
      return !isNaN(parsedDate) ? parsedDate.toLocaleDateString("pt-BR") : "Data inválida";
    } catch {
      return "Data inválida";
    }
  };

  const produtosFiltrados = products.filter((produto) =>
    produto.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6">Carregando produtos...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-indigo-600">Estoque</h1>
        <Link
          to="/estoque/criar"
          className="rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700"
        >
          Adicionar Item
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por nome do item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-full max-w-sm"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium">Upload de Planilha</h2>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 px-4 py-2 rounded-sm"
          />
          <button
            onClick={handleUpload}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome do Item</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Quantidade</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoria</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Data de Entrada</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {produtosFiltrados.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 text-sm text-gray-800">{product.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{product.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.category?.nameCategory || "Sem categoria"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {formatarData(product.dataCompra)}
                </td>
                <td className="px-4 py-2 flex gap-3 items-center">
                  <button
                    onClick={() => navigate(`/estoque/editar/${product.id}`)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {produtosFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstoqueIndex;
