import React, { useState } from "react";

const RelatoriosPedidos = () => {
  const [loading, setLoading] = useState(false);
  const [purchaseId, setPurchaseId] = useState("");

  const gerarRelatorio = async (type = "excel") => {
    if (!purchaseId || isNaN(purchaseId) || parseInt(purchaseId) <= 0) {
      alert("Por favor, insira um ID de pedido válido.");
      return;
    }

    setLoading(true);
    const isExcel = type === "excel";
    const url = isExcel
      ? `https://backend-estoque-clinica-1.onrender.com/purchases/${purchaseId}/report/excel`
      : `https://backend-estoque-clinica-1.onrender.com/purchases/${purchaseId}/report/pdf`;
    const acceptHeader = isExcel
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : "application/pdf";
    const fileName = isExcel
      ? `relatorio_pedido_${purchaseId}.xlsx`
      : `relatorio_pedido_${purchaseId}.pdf`;

    try {
      const token = localStorage.getItem("token");
      if (isExcel && !token) {
        throw new Error(
          "Usuário não autenticado. Faça login como administrador."
        );
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: acceptHeader,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Erro ao gerar o relatório: ${response.status} - ${errorText}`;
        if (response.status === 401) {
          errorMessage =
            "Erro de autenticação: Token inválido ou expirado. Faça login novamente.";
        } else if (response.status === 403) {
          errorMessage = `Acesso negado: Você precisa de permissões de administrador. Verifique se o token contém o papel 'ADMIN'. Token atual: ${
            token ? "presente" : "ausente"
          }.`;
        } else if (response.status === 404) {
          errorMessage = `Pedido com ID ${purchaseId} não encontrado.`;
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlBlob);
      alert(
        `Relatório ${
          isExcel ? "Excel" : "PDF"
        } do pedido ${purchaseId} gerado com sucesso!`
      );
    } catch (error) {
      console.error(`Erro ao gerar relatório (${type}):`, error.message);
      alert(`Falha ao gerar o relatório (${type}): ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-medium">Relatórios de Pedidos</h1>
      <p className="mt-4">
        Gere relatórios dos pedidos realizados de forma rápida e eficiente.
      </p>

      <div className="mt-4">
        <label
          htmlFor="purchaseId"
          className="block text-sm font-medium text-gray-700"
        >
          ID do Pedido
        </label>
        <input
          type="number"
          id="purchaseId"
          value={purchaseId}
          onChange={(e) => setPurchaseId(e.target.value)}
          className="mt-1 block w-48 rounded-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Digite o ID do pedido"
          disabled={loading}
        />
      </div>

      {/* <button
        onClick={() => gerarRelatorio("excel")}
        className="mt-4 inline-block px-6 py-3 text-center rounded-sm border border-blue-600 bg-blue-600 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        disabled={loading}
      >
        {loading ? "Gerando..." : "Gerar Relatório Excel"}
      </button> */}

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

export default RelatoriosPedidos;
