import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import { getAllCategories } from "../../services/categoryService";
import { getAllSuppliers } from "../../services/supplierService"; // Assumindo que você tem isso
import { toast } from "react-toastify";

const EstoqueCriar = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const categoriasData = await getAllCategories();
        const fornecedoresData = await getAllSuppliers();
        setCategorias(categoriasData);
        setFornecedores(fornecedoresData);
      } catch (error) {
        toast.error("Erro ao carregar categorias ou fornecedores");
        console.error(error);
      }
    };

    fetchDados();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name: formData.nome,
        quantity: parseInt(formData.quantidade),
        categoryId: parseInt(formData.categoriaId),
        supplierId: parseInt(formData.supplierId),
        dataCompra: formData.dataCompra,
        dataValidade: formData.dataValidade,
        price: parseFloat(formData.price),
      });

      toast.success("Produto criado com sucesso!");
      navigate("/estoqueindex");
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      toast.error("Erro ao criar produto. Verifique os campos.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Adicionar Novo Produto</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-200"
      >
        {/* Informações Básicas */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações Básicas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Ex: Perfume Aqua"
                value={formData.nome}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="quantidade" className="text-sm font-medium text-gray-700">Quantidade</label>
              <input
                type="number"
                id="quantidade"
                placeholder="Ex: 50"
                value={formData.quantidade}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Classificação */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Classificação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="categoriaId" className="text-sm font-medium text-gray-700">Categoria</label>
              <select
                id="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
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
              <label htmlFor="supplierId" className="text-sm font-medium text-gray-700">Fornecedor</label>
              <select
                id="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Selecione um fornecedor</option>
                {fornecedores.map((forn) => (
                  <option key={forn.id} value={forn.id}>
                    {forn.socialname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Datas e Preço */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Validade e Preço</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dataCompra" className="text-sm font-medium text-gray-700">Data de Compra</label>
              <input
                type="date"
                id="dataCompra"
                value={formData.dataCompra}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="dataValidade" className="text-sm font-medium text-gray-700">Data de Validade</label>
              <input
                type="date"
                id="dataValidade"
                value={formData.dataValidade}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="text-sm font-medium text-gray-700">Preço</label>
              <input
                type="number"
                id="price"
                step="0.01"
                placeholder="Ex: 129.90"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded border-gray-300 p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg text-white font-semibold w-full sm:w-auto"
          >
            Salvar Produto
          </button>

          <button
            type="button"
            onClick={() => navigate("/estoqueindex")}
            className="bg-gray-100 hover:bg-gray-200 transition px-6 py-3 rounded-lg text-gray-800 font-medium w-full sm:w-auto"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EstoqueCriar;
