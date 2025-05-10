import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { getAllSuppliers } from "../services/supplierService";
import Table from "../components/Table";
import CardStats from "../components/CardStats";

const Dashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosData = await getAllProducts();
        const fornecedoresData = await getAllSuppliers();
        setProdutos(produtosData);
        setFornecedores(fornecedoresData);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  const parseQuantidade = (q) => parseInt(q || 0, 10);

  const totalEstoque = produtos.reduce((acc, item) => acc + parseQuantidade(item.quantidade), 0);
  const produtosComEstoqueBaixo = produtos.filter(item => parseQuantidade(item.quantidade) < 10).length;
  const produtosZerados = produtos.filter(item => parseQuantidade(item.quantidade) === 0);
  const topCriticos = [...produtos]
    .sort((a, b) => parseQuantidade(a.quantidade) - parseQuantidade(b.quantidade))
    .slice(0, 5);
  const mediaEstoque = produtos.length > 0 ? Math.round(totalEstoque / produtos.length) : 0;
  const fornecedoresRecentes = fornecedores.slice(-5);
  const totalFornecedores = fornecedores.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Dados atualizados em tempo real
            </p>
          </div>
        </div>

        {/* Indicadores principais */}
        <section className="mb-8">
          <CardStats
            totalEstoque={totalEstoque}
            estoqueBaixo={produtosComEstoqueBaixo}
            totalFornecedores={totalFornecedores}
          />
        </section>

        {/* Seções adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

          {/* Média de estoque */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Média de estoque por produto</h3>
            <p className="text-3xl font-bold text-blue-600">{mediaEstoque}</p>
          </div>

          {/* Produtos com estoque zerado */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Produtos com estoque zerado</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {produtosZerados.length === 0 && <li>Nenhum produto zerado</li>}
              {produtosZerados.map(p => (
                <li key={p.id}>{p.nome}</li>
              ))}
            </ul>
          </div>

          {/* Fornecedores recentes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Últimos fornecedores cadastrados</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {fornecedoresRecentes.length === 0 && <li>Nenhum fornecedor recente</li>}
              {fornecedoresRecentes.map(f => (
                <li key={f.id}>{f.nome}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Produtos com menor estoque */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Top 5 produtos com menor estoque</h3>
            <ul className="divide-y divide-gray-100">
              {topCriticos.map(p => (
                <li key={p.id} className="py-2 flex justify-between text-sm text-gray-800">
                  <span>{p.nome}</span>
                  <span className="font-medium text-red-600">{parseQuantidade(p.quantidade)} un.</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
