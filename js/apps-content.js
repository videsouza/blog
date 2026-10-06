/* =========================================================
   CONTEÚDO DA PÁGINA DE APPS E SISTEMAS
   -------------------------------------------------------
   Edite APENAS este arquivo. Para adicionar um projeto,
   copie um bloco { ... } da lista APPS_PAGE.apps.

   Campos de cada projeto:
   - icon  : nome de um ícone (js/icons.js): app, code, phone,
             globe, library, book, music, etc.
   - color : (opcional) cor do ícone
   - bg    : (opcional) cor de fundo do ícone
   - title : nome do app/sistema
   - status: (opcional) ex.: "No ar", "Beta", "Em desenvolvimento"
   - desc  : descrição curta
   - tags  : (opcional) lista de tecnologias/palavras-chave
   - links : (opcional) lista de { label, url } (ex.: Acessar, Código)
   ========================================================= */

window.APPS_PAGE = {
  title: "Apps & Sistemas",
  lede: "Aplicativos e sistemas que criei. Experimente, explore o código ou saiba mais.",

  apps: [
    {
      icon: "app", color: "#0A66C2", bg: "#e7f0fa",
      title: "Nome do App",
      status: "No ar",
      desc: "O que o aplicativo faz e para quem serve. Uma ou duas frases.",
      tags: ["Web", "JavaScript"],
      links: [
        { label: "Acessar", url: "#" },
        { label: "Código", url: "https://github.com/" }
      ]
    },
    {
      icon: "code", color: "#4a6b52", bg: "#e8f1ea",
      title: "Nome do Sistema",
      status: "Beta",
      desc: "Descrição do sistema: problema que resolve e principais recursos.",
      tags: ["API", "Automação"],
      links: [
        { label: "Saiba mais", url: "#" }
      ]
    },
    {
      icon: "phone", color: "#7a5c8e", bg: "#f0eaf5",
      title: "Nome do Projeto Mobile",
      status: "Em desenvolvimento",
      desc: "Projeto em andamento. Explique a ideia e o estado atual.",
      tags: ["Mobile"],
      links: [
        { label: "Novidades", url: "#" }
      ]
    }
  ]
};
