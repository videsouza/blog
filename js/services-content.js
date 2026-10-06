/* =========================================================
   CONTEÚDO DA PÁGINA DE SERVIÇOS
   -------------------------------------------------------
   Edite APENAS este arquivo para gerenciar seus serviços.
   Para adicionar um serviço, copie um bloco { ... } da lista.

   Campos de cada serviço:
   - icon  : nome de um ícone (veja js/icons.js): feather, book,
             library, mail, globe, link, music, etc.
   - color : (opcional) cor do ícone
   - bg    : (opcional) cor de fundo do ícone
   - title : nome do serviço
   - price : (opcional) valor ou "Sob consulta"
   - desc  : descrição curta
   - feats : (opcional) lista de itens incluidos
   - cta   : (opcional) { label, url } botão de ação
   ========================================================= */

window.SERVICES_PAGE = {
  title: "Como posso ajudar",
  lede: "Serviços ligados à escrita, à pesquisa e à edição de textos. Abaixo, as frentes em que atuo — ajuste livremente conforme sua oferta.",

  services: [
    {
      icon: "feather", color: "#7a5c8e", bg: "#f0eaf5",
      title: "Escrita & Ghostwriting",
      price: "Sob consulta",
      desc: "Criação de textos autorais — ensaios, artigos, discursos e conteúdo long-form — com voz e ritmo cuidados.",
      feats: ["Pesquisa e estrutura", "Redação completa", "Duas rodadas de ajuste"],
      cta: { label: "Pedir orçamento", url: "mailto:va.vinicius@gmail.com?subject=Escrita" }
    },
    {
      icon: "book", color: "#6b4f3a", bg: "#f0e9df",
      title: "Edição & Revisão",
      price: "Sob consulta",
      desc: "Leitura crítica, edição de desenvolvimento e revisão final de livros, artigos e trabalhos acadêmicos.",
      feats: ["Coerência e clareza", "Gramática e estilo", "Normas e referências"],
      cta: { label: "Pedir orçamento", url: "mailto:va.vinicius@gmail.com?subject=Edicao" }
    },
    {
      icon: "library", color: "#4a6b52", bg: "#e8f1ea",
      title: "Consultoria & Pesquisa",
      price: "Sob consulta",
      desc: "Apoio em pesquisa, curadoria de fontes e organização de ideias para projetos de escrita e publicação.",
      feats: ["Levantamento de fontes", "Fichamento e síntese", "Plano de obra"],
      cta: { label: "Conversar", url: "mailto:va.vinicius@gmail.com?subject=Consultoria" }
    },
    {
      icon: "globe", color: "#9a4a3a", bg: "#f7ebe8",
      title: "Palestras & Oficinas",
      price: "Sob consulta",
      desc: "Palestras e oficinas sobre escrita, leitura e temas das minhas áreas de pesquisa, presenciais ou on-line.",
      feats: ["Formato sob medida", "Material de apoio", "Sessão de perguntas"],
      cta: { label: "Convidar", url: "mailto:va.vinicius@gmail.com?subject=Palestra" }
    }
  ],

  // Faixa de chamada no fim da página
  cta: {
    title: "Vamos conversar",
    text: "Conte o que você precisa e eu respondo com uma proposta.",
    label: "Entrar em contato",
    url: "mailto:va.vinicius@gmail.com"
  }
};
