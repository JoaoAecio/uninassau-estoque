import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";
import { getAllSuppliers } from "../../services/supplierService";

const EstoqueEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    quantidade: "",
    categoriaId: "",
    supplierId: "",
    dataCompra: "",
    dataValidade: "",
    price: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, categoriasData, fornecedoresData] = await Promise.all([
          getProductById(id),
          getAllCategories(),
          getAllSuppliers(),
        ]);

        setCategorias(categoriasData);
        setFornecedores(fornecedoresData);

        setFormData({
          nome: product.name || "",
          quantidade: product.quantity || "",
          categoriaId: product.category?.id || "",
          supplierId: product.supplier?.id || "",
          dataCompra: product.dataCompra || "",
          dataValidade: product.dataValidade || "",
          price: product.price || "",
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, {
        name: formData.nome,
        quantity: parseInt(formData.quantidade),
        categoryId: parseInt(formData.categoriaId),
        supplierId: parseInt(formData.supplierId),
        dataCompra: formData.dataCompra,
        dataValidade: formData.dataValidade,
        price: parseFloat(formData.price),
      });

      alert("Produto atualizado com sucesso!");
      navigate("/estoqueindex");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto. Verifique os campos e tente novamente.");
    }
  };

  if (loading) return <p className="p-6">Carregando dados do produto...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-indigo-600">Editar Produto</h1>
        <button
          onClick={() => navigate("/estoqueindex")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Voltar
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="quantidade" className="text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              id="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="categoriaId" className="text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              id="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameCategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="supplierId" className="text-sm font-medium text-gray-700">
              Fornecedor
            </label>
            <select
              id="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.socialname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dataCompra" className="text-sm font-medium text-gray-700">
              Data de Compra
            </label>
            <input
              type="date"
              id="dataCompra"
              value={formData.dataCompra}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="dataValidade" className="text-sm font-medium text-gray-700">
              Data de Validade
            </label>
            <input
              type="date"
              id="dataValidade"
              value={formData.dataValidade}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Preço
            </label>
            <input
              type="number"
              step="0.01"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        <div className="pt-6 flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => navigate("/estoqueindex")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EstoqueEditar;
