/* =========================================================
   CONTEÚDO DA PÁGINA DE DOWNLOADS GRATUITOS
   -------------------------------------------------------
   Edite APENAS este arquivo. Para adicionar um material,
   copie um bloco { ... } da lista DOWNLOADS_PAGE.items.

   Campos de cada material:
   - title  : nome do material
   - desc   : descrição curta
   - format : rótulo do formato (ex.: "PDF", "EPUB", "ZIP")
   - size   : (opcional) tamanho do arquivo (ex.: "2,4 MB")
   - url    : link do arquivo
              • coloque o arquivo na pasta "assets/" e aponte
                para "assets/nome-do-arquivo.pdf", ou
              • use um link externo "https://..."
   ========================================================= */

window.DOWNLOADS_PAGE = {
  title: "Downloads gratuitos",
  lede: "Materiais meus disponibilizados livremente. Baixe à vontade — e, se gostar, compartilhe.",

  items: [
    {
      title: "Título do material 1",
      desc: "Breve descrição do que é este material e para que serve.",
      format: "PDF",
      size: "",
      url: "assets/material-1.pdf"
    },
    {
      title: "Título do material 2",
      desc: "Outro material gratuito — e-book, guia, planilha, etc.",
      format: "EPUB",
      size: "",
      url: "assets/material-2.epub"
    },
    {
      title: "Título do material 3",
      desc: "Mais um material. Adicione quantos quiser.",
      format: "ZIP",
      size: "",
      url: "assets/material-3.zip"
    }
  ]
};
