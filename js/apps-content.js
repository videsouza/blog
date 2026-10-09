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
      title: "Sistema de Apoio à Gestão Documental",
      status: "Funcionando (privado)",
      desc: "Visualização de dados, otimização de eliminação, criação de etiquetas, etc.",
      tags: ["Web", "Gemini", "Claude"],
      links: [
        { label: "Conheça", url: "https://zenodo.org/records/23188714/files/Manual_Hub_Com_DOI.pdf?download=1" },
        
      ]
    },
    {
      icon: "code", color: "#4a6b52", bg: "#e8f1ea",
      title: "Métrica Poética: Sistema de Análise de Poemas",
      status: "Funcionando (público)",
      desc: "Análise métrica, identificação de figuras de linguagem, ferramentas de pesquisa: dicionário de palavras e referências.",
      tags: ["Lovable"],
      links: [
        { label: "Acessar", url: "https://camoes.lovable.app/" }
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
