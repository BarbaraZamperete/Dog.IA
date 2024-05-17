# Projeto Angular Dog.IA

Este é um projeto Angular desenvolvido por Bárbara Zamperete como trabalho de conclusão para o curso (TCC) de Ciência da Computação na Universidade Federal de Roraima.

## Descrição

(fazer)

## Pré-requisitos

Certifique-se de ter instalado o seguinte antes de iniciar:

- Node.js (versão 20.10.0)
- Angular CLI (versão 17.3.4)

## Instalação

1. Clone este repositório.
2. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:

``` npm install ```

Verificar se o Angular CLI esta instalado
`npm install -g @angular/cli`

## Uso

Para iniciar o servidor de desenvolvimento, execute o seguinte comando: `ng serve`.

Para rodar o angular de forma que se comunique com o back-end django, usar o comando `npm run dev` que vai rodar o angular por baixo de um proxy

Acesse o aplicativo no navegador usando o URL `http://localhost:4200/`.

## Organização

- `src/app/` estão os principais arquivos do sistema:
- `src/app/home` é a pagina inicial
- `src/app/pages` são os componentes que representam paginas do sistema
- `src/app/shared` estão conteudos aproveitados por mais de um componentes. `src/app/shared/app-material` são os modulos do Angular Material utilizados. `src/app/shared/components` são os componenetes compartilhados
- `src/app/services` são os services que fazem as requisições da API
- `src/styles.scss` são os estilos aplicados globalmente 

Cada diretorio de componente tem 3 arquivos: html, scss e ts, que são aplicados sobre eles mesmos.

Para criar um novo componente:
`ng g c <caminho>/novo_componente` ou `ng g c novo_componente` para criar dentro de `src/app/` 
Se o componente por generico e passivel de ser compartilhado, deve ser criado dentro de `src/app/shared/components`

Para criar um serviço:
`ng g s services/novo_service`


## Licença

Este projeto está licenciado sob a a licensa MIT.
