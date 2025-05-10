import React from 'react';
import {
  ArchiveBoxIcon,
  TruckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const CardStats = ({ totalEstoque, estoqueBaixo, totalFornecedores }) => {
  const stats = [
    {
      id: 1,
      name: 'Total em Estoque',
      value: `${totalEstoque} itens`,
      icon: ArchiveBoxIcon,
      color: 'bg-blue-100 text-blue-600',
      chart: 'bar',
      meta: 1000,
      progress: Math.min((totalEstoque / 1000) * 100, 100)
    },
    {
      id: 2,
      name: 'Estoque Baixo',
      value: `${estoqueBaixo} itens`,
      icon: ExclamationTriangleIcon,
      color: 'bg-orange-100 text-orange-600',
      progress: estoqueBaixo
    },
    {
      id: 3,
      name: 'Fornecedores',
      value: `${totalFornecedores}`,
      icon: TruckIcon,
      color: 'bg-teal-100 text-teal-600',
      chart: 'radial',
      progress: Math.min((totalFornecedores / 50) * 100, 100)
    }
  ];

  const RadialProgress = ({ percentage, color }) => {
    const progress = Number(percentage) || 0;
    return (
      <div className="relative w-20 h-20">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={color}
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            strokeDasharray={`${progress * 2.51} 251`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{stat.name}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              </div>

              {stat.chart === 'bar' && (
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Meta: {stat.meta}</span>
                    <span>{Math.round(stat.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${stat.color.split(' ')[0]} rounded-full h-2 transition-all duration-500`}
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {stat.chart === 'radial' && (
                <div className="mt-4">
                  <p className="text-xs text-gray-600">Capacidade utilizada</p>
                </div>
              )}
            </div>

            {stat.chart === 'radial' && (
              <div className="flex-shrink-0">
                <RadialProgress percentage={stat.progress} color={stat.color} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardStats;
