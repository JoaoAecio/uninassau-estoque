import React from "react";
import { FaEdit, FaSearch } from "react-icons/fa"; // Importando ícones de lápis e lupa

const UsuarioIndex = () => {
  return (
    <div>
      {/* Cabeçalho com título e botões */}
      <div className="flex items-center gap-4">
        {/* Título */}
        <h1 className="text-lg font-medium">CADASTRAR USUÁRIOS</h1>

        {/* Botão de Criar Usuario */}
        <a
          className="inline-block min-w-[120px] px-6 py-3 text-center rounded-sm border border-indigo-600 bg-indigo-600 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
          href="#"
        >
          Criar Usuário
        </a>

        {/* Botão de Voltar (vermelho) */}
        <a
          className="inline-block min-w-[120px] px-6 py-3 text-center rounded-sm border border-red-600 bg-red-600 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:ring-3 focus:outline-hidden"
          href="#"
        >
          Voltar
        </a>
      </div>

      {/* Campo de filtro com ícone de lupa */}
      <div className="mt-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Filtrar usuário..."
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <FaSearch className="inline-block" /> {/* Ícone de lupa */}
          </button>
        </div>
      </div>

      {/* Tabela de usuários */}
      <div className="mt-8"> {/* Adicionei mt-8 para mover a tabela para baixo */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Nome</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Nascimento</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">CPF</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Papel</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">John Doe</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">24/05/1995</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">Web Developer</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">Colaborador</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <a
                    href="#"
                    className="inline-block rounded-sm bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    <FaEdit className="inline-block" /> {/* Ícone de lápis */}
                  </a>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Jane Doe</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">04/11/1980</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">Web Designer</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">Admin</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <a
                    href="#"
                    className="inline-block rounded-sm bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    <FaEdit className="inline-block" /> {/* Ícone de lápis */}
                  </a>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Gary Barlow</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">24/05/1995</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">Singer</td>
                <td className="px-4 py-2 whitespace-nowrap text-gray-700">Admin</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <a
                    href="#"
                    className="inline-block rounded-sm bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    <FaEdit className="inline-block" /> {/* Ícone de lápis */}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsuarioIndex;