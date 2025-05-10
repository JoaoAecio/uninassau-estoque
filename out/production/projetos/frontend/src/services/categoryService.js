// services/categoryService.js
import api from "./api"; // instância do Axios com baseURL e token

// GET: Buscar todas as categorias
export const getAllCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// GET: Buscar uma categoria por ID
export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/get/${id}`);
  return response.data;
};

// POST: Criar nova categoria
export const createCategory = async (name) => {
  const response = await api.post("/categories/register", {
    nameCategory: name, // campo esperado pelo backend
  });
  return response.data;
};

// PUT: Atualizar categoria existente
export const updateCategory = async (id, name) => {
  const response = await api.put(`/categories/update/${id}`, {
    nameCategory: name, // campo esperado pelo backend
  });
  return response.data;
};

// DELETE: Remover categoria
export const deleteCategory = async (id) => {
  await api.delete(`/categories/delete/${id}`);
};
