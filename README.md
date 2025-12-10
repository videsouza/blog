# 📚 Site Pessoal - Guia de Uso

## 📁 Estrutura de Arquivos

```
seu-repositorio/
├── index.html           # Página principal
├── posts.json          # ARQUIVO PRINCIPAL - todos os posts aqui
├── posts/              # Textos autorais
│   ├── 2024/
│   │   ├── 11/
│   │   └── 10/
│   └── 2023/
├── ai-images/          # Páginas de imagens IA
│   ├── 2024/
│   │   ├── 12/
│   │   └── 11/
│   └── 2023/
└── images/
    ├── capas/          # Capas dos textos
    └── ai/             # Imagens geradas por IA
```

---

## 🎨 Dois Tipos de Cards

### 1. 📝 Card de Texto (design tradicional)
- Miniatura
- Badge "TEXTO"
- Data e categoria
- Título e excerpt
- Botão "Ler texto"

### 2. 🤖 Card de Imagem IA (design diferenciado)
- Imagem maior e destacada
- Badge "✨ IA" no canto
- Borda azul
- Prompt usado
- Modelo de IA
- Botão "Ver completo"

---

## ✍️ Como Adicionar um TEXTO

### Passo 1: Crie o arquivo HTML
Copie `post-exemplo.html` e salve em `posts/2024/12/meu-texto.html`

### Passo 2: Adicione no posts.json

```json
{
  "type": "text",
  "title": "Título do Meu Texto",
  "excerpt": "Breve descrição (2-3 linhas)",
  "date": "2024-12-05",
  "category": "Ficção",
  "thumbnail": "images/capas/meu-texto.jpg",
  "url": "posts/2024/12/meu-texto.html"
}
```

**Campos obrigatórios:**
- `type`: sempre `"text"`
- `title`: título do texto
- `excerpt`: descrição breve
- `date`: formato `"YYYY-MM-DD"`
- `category`: Ficção, Ensaio, Poesia, etc.
- `thumbnail`: caminho da capa (ou `""` para placeholder)
- `url`: caminho do arquivo HTML

---

## 🎨 Como Adicionar uma IMAGEM IA

### Passo 1: Salve a imagem
Salve em `images/ai/nome-imagem.jpg` (recomendado: 1792x1024 ou similar)

### Passo 2: Crie a página HTML
Copie `ai-image-template.html` e salve em `ai-images/2024/12/nome-imagem.html`

Edite:
- Título da imagem
- Data e modelo de IA
- Caminho da imagem
- Prompt usado
- Descrição (opcional)
- Informações técnicas

### Passo 3: Adicione no posts.json

```json
{
  "type": "ai",
  "title": "Nome da Imagem",
  "prompt": "O prompt exato que você usou para gerar a imagem",
  "date": "2024-12-05",
  "image": "images/ai/nome-imagem.jpg",
  "aiModel": "Midjourney v6",
  "url": "ai-images/2024/12/nome-imagem.html"
}
```

**Campos obrigatórios:**
- `type`: sempre `"ai"`
- `title`: título criativo da imagem
- `prompt`: prompt usado (exibido em itálico no card)
- `date`: formato `"YYYY-MM-DD"`
- `image`: caminho da imagem gerada
- `aiModel`: ex: "Midjourney v6", "DALL-E 3", "Stable Diffusion XL"
- `url`: caminho da página HTML

---

## 🎯 Exemplos Completos

### Exemplo 1: Adicionar um Texto

**Arquivo:** `posts/2024/12/noite-estrelada.html`

**Entrada no posts.json:**
```json
{
  "type": "text",
  "title": "A Noite Estrelada e Seus Segredos",
  "excerpt": "Um conto sobre astronomia, solidão e as histórias que contamos para nós mesmos quando olhamos para o céu.",
  "date": "2024-12-05",
  "category": "Ficção",
  "thumbnail": "images/capas/noite-estrelada.jpg",
  "url": "posts/2024/12/noite-estrelada.html"
}
```

### Exemplo 2: Adicionar uma Imagem IA

**Arquivo de imagem:** `images/ai/dragao-cristal.jpg`
**Página:** `ai-images/2024/12/dragao-cristal.html`

**Entrada no posts.json:**
```json
{
  "type": "ai",
  "title": "Dragão de Cristal no Templo Abandonado",
  "prompt": "A majestic crystal dragon sleeping in an abandoned temple, translucent scales catching moonlight, ancient ruins, mystical atmosphere, fantasy art",
  "date": "2024-12-05",
  "image": "images/ai/dragao-cristal.jpg",
  "aiModel": "Midjourney v6",
  "url": "ai-images/2024/12/dragao-cristal.html"
}
```

---

## 🔍 Como Funciona a Filtragem

### Filtros disponíveis:

1. **Por Tipo:**
   - Todos (textos + imagens IA)
   - Apenas Textos
   - Apenas Imagens IA

2. **Por Tema/Categoria:**
   - Apenas para textos (Ficção, Ensaio, Poesia, etc.)

3. **Por Ano:**
   - Funciona para ambos os tipos

**Os contadores são automáticos!** ✨

---

## 📐 Tamanhos Recomendados de Imagens

### Para capas de textos:
- **1200 x 630 px** (proporção 1.9:1)
- Formato: JPG 80-85% ou PNG
- Peso: < 300 KB

### Para imagens IA:
- **1792 x 1024 px** (16:9) - landscape
- **1024 x 1792 px** (9:16) - portrait  
- **1024 x 1024 px** (1:1) - quadrado
- Formato: JPG 85-90% ou PNG
- Peso: < 500 KB

---

## 🚀 Workflow Completo

### Para publicar um texto:

1. Escreva o texto em HTML
2. Crie/otimize a capa
3. Adicione entrada no `posts.json` (tipo "text")
4. `git add . && git commit -m "Novo texto: [título]" && git push`

### Para publicar uma imagem IA:

1. Gere a imagem com sua IA favorita
2. Otimize e salve em `images/ai/`
3. Crie a página HTML baseada no template
4. Adicione entrada no `posts.json` (tipo "ai")
5. `git add . && git commit -m "Nova arte IA: [título]" && git push`

---

## 🎨 Modelos de IA Sugeridos para Nomear

Seja específico sobre qual modelo usou:
- **Midjourney:** "Midjourney v6", "Midjourney v5.2"
- **DALL-E:** "DALL-E 3", "DALL-E 2"
- **Stable Diffusion:** "Stable Diffusion XL", "SD 1.5"
- **Leonardo AI:** "Leonardo AI"
- **Firefly:** "Adobe Firefly"

---

## ✨ Dicas Pro

### Para textos:
- Use excerpts chamativos (2-3 linhas)
- Categorias consistentes
- Capas minimalistas funcionam bem

### Para imagens IA:
- Seja descritivo nos prompts
- Adicione contexto na página (como chegou naquela imagem)
- Documente parâmetros usados
- Compartilhe variações interessantes

### Organização:
- Sempre adicione posts novos no **topo** do `posts.json`
- Use datas corretas (formato ISO: YYYY-MM-DD)
- Mantenha uma estrutura de pastas consistente

---

## 🔧 Troubleshooting

### Card de IA não aparece diferente?
- Verifique se o `"type": "ai"` está correto
- Confirme que todos os campos obrigatórios estão presentes

### Imagem não carrega?
- Verifique o caminho em `"image":`
- Caminhos são case-sensitive
- Certifique-se que a imagem existe na pasta

### Contadores errados?
- Valide o JSON em [JSONLint](https://jsonlint.com)
- Verifique se não há vírgulas extras ou faltando

---

## 🎨 Personalização de Cores

Para mudar as cores dos cards de IA, edite no `index.html`:

```css
:root {
    --ai-accent: #4a90e2;  /* Azul padrão - mude aqui */
}
```

Sugestões:
- Roxo: `#8b5cf6`
- Verde: `#10b981`  
- Laranja: `#f97316`

---

## 📊 Estatísticas Automáticas

O sidebar mostra automaticamente:
- ✅ Total de posts
- ✅ Quantidade de textos
- ✅ Quantidade de imagens IA
- ✅ Posts por categoria
- ✅ Posts por ano

Tudo calculado dinamicamente! 🎉

---

✨ **Pronto para criar!** Misture textos e imagens IA para um portfólio único e criativo.
