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
  lede: "Serviços ligados à escrita, à pesquisa e à edição de textos. Abaixo, as frentes em que atuo.",

  services: [
    {
      icon: "feather", color: "#7a5c8e", bg: "#f0eaf5",
      title: "Análise de Dados",
      price: "Sob consulta",
      desc: "Análise e interpretação de dados para identificar padrões, construir indicadores e apoiar decisões em contextos educacionais e institucionais.",
      feats: ["Tratamento e organização de dados", "Análise estatística e exploratória", "Relatórios e visualizações"],
      cta: { label: "Pedir orçamento", url: "mailto:va.vinicius@gmail.com?subject=Escrita" }
    },
    {
      icon: "book", color: "#6b4f3a", bg: "#f0e9df",
      title: "Otimização de Horários Escolares",
      price: "Sob consulta",
      desc: "Desenvolvimento de soluções computacionais para geração de grades horárias, considerando restrições pedagógicas, disponibilidade docente e organização das turmas.",
      feats: ["Modelagem de restrições", "Geração automatizada de horários", "Avaliação e ajuste de soluções"],
      cta: { label: "Pedir orçamento", url: "mailto:va.vinicius@gmail.com?subject=Edicao" }
    },
    {
      icon: "library", color: "#4a6b52", bg: "#e8f1ea",
      title: "Desenvolvimento de Aplicações",
      price: "Sob consulta",
      desc: "Criação de ferramentas digitais para automatizar rotinas, organizar informações e apoiar processos administrativos e de gestão educacional.",
      feats: ["Sistemas web", "Aplicativos Android", "Soluções locais"],
      cta: { label: "Conversar", url: "mailto:va.vinicius@gmail.com?subject=Consultoria" }
    },
    {
      icon: "globe", color: "#9a4a3a", bg: "#f7ebe8",
      title: "Consultoria e Pesquisa Aplicada",
      price: "Sob consulta",
      desc: "Apoio a projetos de pesquisa e inovação, com foco em métodos quantitativos, modelagem computacional e resolução de problemas educacionais.",
      feats: ["Delimitação e estruturação de problemas", "Pesquisa e análise de evidências", "Modelagem e avaliação de soluções"],
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
