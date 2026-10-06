/* =========================================================
   CONTEÚDO DO BLOG / ARTIGOS RECENTES
   -------------------------------------------------------
   Edite APENAS este arquivo. Para adicionar um post, copie
   um bloco { ... } no início da lista BLOG_PAGE.posts.
   Os posts são ordenados automaticamente do mais recente
   para o mais antigo (pela data).

   Campos de cada post:
   - date    : data no formato "AAAA-MM-DD" (ex.: "2026-10-01")
   - title   : título do post
   - excerpt : resumo curto (uma ou duas frases)
   - tags    : (opcional) lista de temas, ex.: ["Ensaio", "Leitura"]
   - url     : link para ler o texto completo
               • um post próprio: "posts/meu-texto.html" (crie o arquivo), ou
               • um link externo: "https://..."
   ========================================================= */

window.BLOG_PAGE = {
  title: "Blog",
  lede: "Textos recentes, notas e ensaios. Escritos no meu tempo, sobre o que ando pensando e lendo.",

  posts: [
    {
      date: "2026-10-01",
      title: "Título do post mais recente",
      excerpt: "Resumo curto do texto: a ideia principal em uma ou duas frases. Substitua por seu conteúdo.",
      tags: ["Ensaio"],
      url: "posts/exemplo.html"
    },
    {
      date: "2026-08-15",
      title: "Uma reflexão sobre leitura",
      excerpt: "Outro resumo breve. Fale do assunto para despertar o interesse de quem lê.",
      tags: ["Leitura", "Nota"],
      url: "#"
    },
    {
      date: "2026-06-02",
      title: "Anotações de escrita",
      excerpt: "Mais um post. Adicione quantos quiser — a ordem na página segue a data.",
      tags: ["Escrita"],
      url: "#"
    }
  ]
};
