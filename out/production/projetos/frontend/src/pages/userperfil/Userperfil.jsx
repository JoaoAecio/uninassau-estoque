import React, { useEffect, useState } from "react";
import { Save, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Userperfil = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    cpf: "",
    phoneNumber: "",
    birthday: "",
    avatarUrl:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Token não encontrado.");
          return;
        }

        const response = await fetch("https://backend-estoque-clinica-1.onrender.com/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erro no backend:", errorText);
          throw new Error("Erro ao carregar perfil");
        }

        const data = await response.json();

        console.log("Dados do usuário recebidos:", data); // Verifica se os campos estão vindo corretamente

        // Ajustando os nomes dos campos para corresponder aos do backend
        setUser({
          name: data.name || "Não informado",
          email: data.email || "Não informado",
          cpf: data.cpf || "Não informado",
          phoneNumber: data.phone || "Não informado", // Corrigindo para usar "phone"
          birthday: data.birthDay || "", // Corrigindo para usar "birthDay" e evitar erro no <input type="date">
          avatarUrl: data.avatarUrl || user.avatarUrl,
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar informações do perfil");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://backend-estoque-clinica-1.onrender.com/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("Erro ao atualizar perfil");

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Meu Perfil</h2>
        <button onClick={handleLogout} className="text-red-500 hover:underline flex items-center gap-2">
          <LogOut size={18} /> Sair
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">CPF</label>
          <input
            name="cpf"
            value={user.cpf}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Data de Nascimento</label>
          <input
            type="date"
            name="birthday"
            value={user.birthday}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Save size={18} /> Salvar
        </button>
      </form>
    </div>
  );
};

export default Userperfil;

