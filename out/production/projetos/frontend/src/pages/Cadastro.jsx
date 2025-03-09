import React from 'react';

const Cadastro = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white text-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-12 w-auto" src="https://aluno.uninassau.edu.br/Aluno/img/uninassau3.svg?29968" alt="UNINASSAU" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 mt-12" action="#" method="POST">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium">Nome</label>
            <div className="mt-2">
              <input type="text" name="nome" id="nome" autoComplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0056B0] sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Endereço de Email</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0056B0] sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium">Senha</label>
            <div className="mt-2">
              <input type="password" name="senha" id="senha" autoComplete="new-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0056B0] sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium">Confirmar Senha</label>
            <div className="mt-2">
              <input type="password" name="confirmarSenha" id="confirmarSenha" autoComplete="new-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#0056B0] sm:text-sm" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-[#26396F] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-[#003C6D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003C6D]">Cadastrar</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem uma conta?
          <a href="/login" className="font-semibold text-[#0056B0] hover:text-[#003C6D]">Faça login aqui</a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
