## 🚀 Daily Diet API
<div align="justify">Uma simples aplicação em nodejs que é um CRUD sobre o tema de refeições, para se ter o controle de dietas diariamente.
</div><br />

## 🛠 Tecnologias Utilizadas
<div>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
</div><br /> 


## ⚡️ Instalação

Configurar um ambiente para rodar NodeJS, git; seguindo o passo a passo do seus respectivos sites,
configurar variaveis de ambientes necessárias no arquivo .env.example, por exemplo a api key para o database.

> [!TIP]
> Executar os comandos abaixo em um terminal.

```bash
  git clone https://github.com/gunners-pro/daily_diet_api
  cd daily_diet_api
  npm install
  npm run dev
```    
### 📝 Regras do desenvolvimento

- [x] Deve ser possível criar um usuário<br />
- [x] Deve ser possível identificar o usuário entre as requisições<br />
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:<br />
    *As refeições devem ser relacionadas a um usuário.*<br />
    - Nome<br />
    - Descrição<br />
    - Data e Hora<br />
    - Está dentro ou não da dieta<br />
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima<br />
- [x] Deve ser possível apagar uma refeição<br />
- [x] Deve ser possível listar todas as refeições de um usuário<br />
- [x] Deve ser possível visualizar uma única refeição<br />
- [x] Deve ser possível recuperar as métricas de um usuário<br />
    - Quantidade total de refeições registradas<br />
    - Quantidade total de refeições dentro da dieta<br />
    - Quantidade total de refeições fora da dieta<br />
    - Melhor sequência de refeições dentro da dieta<br />
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou<br />
