import React, { useState } from "react";

const Relatorios = () => {
  const [loading, setLoading] = useState(false);

  const gerarRelatorio = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Pegue o token de login armazenado

      if (!token) {
        throw new Error("Usuário não autenticado. Faça login como administrador.");
      }

      const response = await fetch("https://backend-estoque-clinica-1.onrender.com/api/reports/stock", {
        method: "GET",
        headers: {
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          Authorization: `Bearer ${token}`, // Correção do erro de sintaxe
        },
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtenha detalhes do erro
        throw new Error(`Erro ao gerar o relatório: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio_estoque.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Libera a URL temporária
    } catch (error) {
      console.error("Erro ao gerar relatório:", error.message);
      alert(`Falha ao gerar o relatório: ${error.message}`); // Exibir um alerta ao usuário em caso de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-medium">Relatórios de Estoque</h1>
      <p className="mt-4">Gere relatórios de estoque de forma rápida e fácil.</p>

      <button
        onClick={gerarRelatorio}
        className="mt-4 inline-block px-6 py-3 text-center rounded-sm border border-blue-600 bg-blue-600 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Relatório de Estoque"}
      </button>
    </div>
  );
};

export default Relatorios;