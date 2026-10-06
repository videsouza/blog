# Página de Links

Site estático (HTML + CSS + JavaScript puro), sem dependências ou build.
Uma página elegante no estilo “link in bio”, pronta para o **GitHub Pages**.

## Estrutura

```
links/
├─ index.html          → página inicial de links
├─ curriculo.html      → página do currículo
├─ servicos.html       → página de serviços
├─ livros.html         → divulgação dos livros
├─ apps.html           → apps e sistemas criados
├─ downloads.html      → downloads gratuitos
├─ blog.html           → blog / artigos recentes
├─ posts/
│  └─ exemplo.html      → MODELO de página de post
├─ css/
│  ├─ style.css        → visual da página inicial
│  └─ pages.css        → visual das páginas internas
└─ js/
   ├─ content.js            → SEUS LINKS
   ├─ cv-content.js         → SEU CURRÍCULO
   ├─ services-content.js   → SEUS SERVIÇOS
   ├─ books-content.js      → SEUS LIVROS
   ├─ apps-content.js       → SEUS APPS E SISTEMAS
   ├─ downloads-content.js  → SEUS DOWNLOADS
   ├─ blog-content.js       → SEUS POSTS DO BLOG
   ├─ icons.js         → biblioteca de ícones (SVG)
   ├─ main.js          → comportamento da página inicial
   └─ pages.js         → comportamento das páginas internas
```

## Como adicionar / editar links

Abra `js/content.js`. Cada link é um bloco assim:

```js
{
  title: "Livros",
  sub: "Minhas obras publicadas",   // opcional
  url: "https://...",               // ou "mailto:voce@exemplo.com"
  icon: "book",                      // nome de um ícone de icons.js
  color: "#6b4f3a",                 // opcional: cor do ícone
  bg: "#f0e9df"                      // opcional: fundo do ícone
}
```

Para **adicionar** um link novo, copie um bloco, altere os campos e
coloque onde quiser na lista. A ordem na lista é a ordem na página.

### Ícones disponíveis
`book`, `feather` (poemas), `library`, `chess`, `music` (spotify),
`linkedin`, `mail`, `github`, `instagram`, `youtube`, `globe`, `link`.

Para criar um ícone novo, adicione uma entrada em `js/icons.js` usando um
SVG com `stroke="currentColor"` ou `fill="currentColor"` (a cor vem do
`content.js`).

## Personalizar o topo
No `index.html`, troque “Seu Nome” e a frase de descrição. O monograma
(círculo com iniciais) é gerado automaticamente a partir do nome.

## Páginas de Currículo e Serviços

- **Currículo** (`curriculo.html`): edite o conteúdo em `js/cv-content.js`
  (resumo, formação, experiência, publicações, competências e detalhes).
  Os textos atuais são exemplos — substitua pelos seus dados reais.
- **Serviços** (`servicos.html`): edite o conteúdo em
  `js/services-content.js` (cada serviço é um bloco com ícone, título,
  preço, descrição e itens). Copie um bloco para adicionar outro serviço.

As duas páginas aparecem como “Currículo” e “Serviços” logo abaixo do seu
nome na página inicial, e têm um link “Início” para voltar.

## Páginas de Livros, Apps e Downloads

- **Livros** (`livros.html`): edite `js/books-content.js`. Cada livro tem
  título, ano, descrição, capa (imagem opcional em `assets/`) e links.
- **Apps & Sistemas** (`apps.html`): edite `js/apps-content.js`. Cada
  projeto tem ícone, título, status, descrição, tags e links.
- **Downloads gratuitos** (`downloads.html`): edite
  `js/downloads-content.js`. Para cada material, coloque o arquivo na pasta
  `assets/` e aponte o campo `url` para ele (ex.: `assets/guia.pdf`), ou use
  um link externo. O botão já força o download quando o arquivo é local.

Todas as páginas aparecem no menu, abaixo do nome na página inicial e no
topo das páginas internas.

## Blog / artigos recentes

- **Blog** (`blog.html`): edite `js/blog-content.js`. Cada post tem data
  (`AAAA-MM-DD`), título, resumo, tags e um link. Os posts são ordenados
  automaticamente do mais recente para o mais antigo.
- O `url` de cada post pode ser um link externo (`https://...`) ou um texto
  próprio que você criar (ex.: crie `posts/meu-texto.html` e aponte para ele).

### Escrever um post completo (modelo)

Use o modelo `posts/exemplo.html` para escrever textos dentro do próprio site:

1. Faça uma cópia de `posts/exemplo.html` com outro nome, por exemplo
   `posts/minha-reflexao.html`.
2. Troque o título, a data, os temas e escreva o texto no bloco
   `<article class="post-article">` (há exemplos de parágrafo, subtítulo,
   lista, citação e imagem para você seguir).
3. Em `js/blog-content.js`, aponte o `url` do post para o novo arquivo
   (ex.: `"posts/minha-reflexao.html"`).

Imagens dos posts vão na pasta `assets/` e são referenciadas como
`../assets/nome-da-imagem.jpg` dentro das páginas em `posts/`.

## Publicar no GitHub Pages

1. Envie o conteúdo desta pasta para um repositório (`index.html` na raiz).
2. No repositório: **Settings → Pages**.
3. Em *Source*, escolha a branch `main` e a pasta `/root`. Salve.
4. O site fica no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
