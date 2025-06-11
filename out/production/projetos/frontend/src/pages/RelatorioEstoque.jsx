import React, { useState } from "react";

const Relatorios = () => {
  const [loading, setLoading] = useState(false);

  const gerarRelatorio = async (type = "excel") => {
    setLoading(true);
    const isExcel = type === "excel";
    const url = isExcel
      ? "https://estoqueuninassau.netlify.app/api/reports/stock" // URL do backend
      : "https://estoqueuninassau.netlify.app/api/reports/pdf";
    const acceptHeader = isExcel
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : "application/pdf";
    const fileName = isExcel ? "relatorio_estoque.xlsx" : "relatorio_estoque.pdf";

    try {
      const token = localStorage.getItem("authToken"); // Obtenha o token de autenticação
      if (!token && isExcel) {
        throw new Error("Usuário não autenticado. Faça login como administrador.");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: acceptHeader,
          Authorization: token ? `Bearer ${token}` : "", // Adiciona o token, se disponível
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao gerar o relatório: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlBlob); // Libera a URL temporária
    } catch (error) {
      console.error(`Erro ao gerar relatório (${type}):`, error.message);
      alert(`Falha ao gerar o relatório (${type}): ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-medium">Relatórios de Estoque</h1>
      <p className="mt-4">Gere relatórios de estoque de forma rápida e fácil.</p>

      <button
        onClick={() => gerarRelatorio("excel")}
        className="mt-4 inline-block px-6 py-3 text-center rounded-sm border border-blue-600 bg-blue-600 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Relatório Excel"}
      </button>

      <button
        onClick={() => gerarRelatorio("pdf")}
        className="mt-4 ml-4 inline-block px-6 py-3 text-center rounded-sm border border-blue-600 bg-blue-600 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Relatório PDF"}
      </button>
    </div>
  );
};

export default Relatorios;