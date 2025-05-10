import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCategory } from "../../services/categoryService";

const CategoriasCriar = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(name);
      toast.success("Categoria criada com sucesso!");
      navigate("/categorias");
    } catch {
      toast.error("Erro ao criar categoria.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Nova Categoria</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nome da Categoria
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Higiene, Fragrâncias"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => navigate("/categorias")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriasCriar;
