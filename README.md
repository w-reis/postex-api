<h1 align="center">
    <img src="https://raw.githubusercontent.com/w-reis/postex-mobile/main/.github/logo.png" width="175">
</h1>
<p align="center">
  Sistema de Gerenciamento de Correspondências
</p>

<div align="center">
  <a href="#information_source-sobre-o-projeto">Sobre o projeto</a> •
  <a href="#computer-tecnologias-utilizadas">Tecnologias utilizadas</a> •
  <a href="#rocket-como-executar">Como executar</a>
</div>

<br>

# :information_source: Sobre o projeto

Essa API faz parte de um projeto cuja finalidade é permitir que pessoas que não possuem entrega domiciliar de correspondências fique sabendo quando há correspondências para serem retiradas nas agências de serviço postal, para não "perder a viagem" 😁. As correspondências são cadastradas em uma [Aplicação Web](https://github.com/w-reis/postex-front-end) e são contabilizadas aparecendo para o usuário do [aplicativo](https://github.com/w-reis/postex-mobile).

<br>

# :computer: Tecnologias utilizadas

### Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [NodeJs](https://nodejs.org/en/docs/)
- [Typescript](https://www.typescriptlang.org/)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
- [Express](https://expressjs.com/pt-br/)
- [JSON Web Token](https://jwt.io/)
- [Prettier](https://prettier.io/)
- [TypeORM](https://typeorm.io/)

<br>

# :rocket: Como executar

### :computer: Executando o projeto

  Para clonar e executar este projeto, você precisará do [Git](https://git-scm.com), [Node.js](https://nodejs.org) + [Yarn](https://yarnpkg.com) instalado no seu computador. Também é ideal possuir um editor para trabalhar com o código como [Visual Studio Code](https://code.visualstudio.com/).
O banco de dados utilizado neste projeto é o [PostgreSQL](https://www.postgresql.org/).
<br />

### :arrow_down: Baixando o projeto  

```bash
# Clone o repositório na sua máquina
$ git clone https://github.com/w-reis/postex-api.git
```
Depois de clonado, execute os comandos a seguir:

```bash
# Vá para a pasta do projeto
$ cd postex-api/

# Instale as dependências
$ yarn

```

<p>Antes de dar start no servidor, abra o arquivo ".env.example" localizado na raiz do projeto e preencha com as credenciais do seu banco de dados Postgres.</p>
<p> Adicione também as "secrets" que serão utilizadas na autenticação via JWT(Json Web Token). </p>
<p> Salve e renomeie o arquivo para ".env" </p>
Feito isso, inicie o servidor:

```bash
#Execute a aplicação
$ yarn dev:server
```

<br>

Feito com paixão por [Wellinton Reis](https://github.com/w-reis) 🚀.

Dê uma ⭐️ se este projeto ajudou você!
