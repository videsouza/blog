/* =========================================================
   CONTEÚDO DA PÁGINA DE LIVROS
   -------------------------------------------------------
   Edite APENAS este arquivo. Para adicionar um livro, copie
   um bloco { ... } da lista BOOKS_PAGE.books.

   Campos de cada livro:
   - title : título
   - year  : ano
   - blurb : descrição curta
   - cover : caminho da imagem da capa (ex.: "assets/livro.jpg")
             deixe "" para gerar uma capa simples com o título
   - links : lista de { label, url }
   ========================================================= */

window.BOOKS_PAGE = {
  title: "Meus Livros",
  lede: "Obras publicadas e em andamento. Clique para ler, baixar ou adquirir.",

  books: [
    {
      title: "Título do Primeiro Livro",
      year: 2024,
      blurb: "Breve descrição do livro: tema, argumento central e público. Substitua por seu texto.",
      cover: "",
      links: [
        { label: "Comprar / Ler", url: "https://uiclap.bio/videsouza" }
      ]
    },
    {
      title: "Título do Segundo Livro",
      year: 2021,
      blurb: "Outra descrição curta. Uma ou duas frases sobre a obra.",
      cover: "",
      links: [
        { label: "Detalhes", url: "#" }
      ]
    },
    {
      title: "Título do Terceiro Livro",
      year: 2019,
      blurb: "Descrição do terceiro título. Adicione quantos livros quiser.",
      cover: "",
      links: [
        { label: "Detalhes", url: "#" }
      ]
    }
  ]
};
