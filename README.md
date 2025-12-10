# 📚 Site Pessoal - Guia de Uso

## 📁 Estrutura de Arquivos

```
seu-repositorio/
├── index.html           # Página principal (carrega automaticamente os posts)
├── posts.json          # ARQUIVO PRINCIPAL - adicione seus posts aqui
├── posts/              # Pasta com os textos
│   ├── 2024/
│   │   ├── 11/
│   │   │   ├── silencio-palavras.html
│   │   │   └── cidade-esquecida.html
│   │   ├── 10/
│   │   │   └── fragmentos.html
│   │   └── 09/
│   └── 2023/
│       ├── 12/
│       └── 11/
└── images/
    └── capas/          # Suas imagens de capa
        ├── silencio-palavras.jpg
        ├── cidade-esquecida.jpg
        └── fragmentos.jpg
```

---

## ✨ Como Adicionar um Novo Post

### Passo 1: Crie o arquivo HTML do post

1. Copie o arquivo `post-exemplo.html`
2. Renomeie para algo descritivo (ex: `meu-novo-texto.html`)
3. Salve em: `posts/2024/12/meu-novo-texto.html`
4. Edite o conteúdo (título, data, categoria, texto)

### Passo 2: Adicione a capa (opcional)

1. Salve sua imagem em `images/capas/meu-novo-texto.jpg`
2. Tamanho recomendado: **1200 x 630 pixels**
3. Formato: JPG (80-85% qualidade) ou PNG
4. Peso máximo: 200-300 KB

### Passo 3: Registre no posts.json

Abra `posts.json` e adicione seu post no **INÍCIO** do array:

```json
[
  {
    "title": "Título do Meu Novo Texto",
    "excerpt": "Uma breve descrição do texto (2-3 linhas)",
    "date": "2024-12-05",
    "category": "Ficção",
    "thumbnail": "images/capas/meu-novo-texto.jpg",
    "url": "posts/2024/12/meu-novo-texto.html"
  },
  {
    "title": "O Silêncio das Palavras Não Ditas",
    ...
  }
]
```

**⚠️ IMPORTANTE:**
- Sempre adicione **no topo** do array (será o primeiro a aparecer)
- Não esqueça a **vírgula** entre os posts
- Use o formato de data: `"YYYY-MM-DD"` (ex: `"2024-12-05"`)
- Se não tiver imagem, deixe: `"thumbnail": ""`

### Passo 4: Commit e Push

```bash
git add .
git commit -m "Adiciona novo post: Meu Novo Texto"
git push
```

**Pronto!** O Render vai atualizar automaticamente em 1-2 minutos.

---

## 🎨 Categorias Disponíveis

Você pode usar qualquer categoria. Sugestões:
- Ficção
- Ensaio
- Poesia
- Crônica
- Reflexões
- Conto
- Resenha

**Dica:** Use categorias consistentes para melhor organização.

---

## 🔍 Como Funciona a Automação

### O que é automático:
✅ Contadores de posts por categoria
✅ Contadores de posts por ano
✅ Ordenação por data (mais recente primeiro)
✅ Filtros por categoria e ano
✅ Grid responsivo de cards

### O que você faz manualmente:
📝 Criar o arquivo HTML do post
📝 Adicionar entrada no `posts.json`
📝 (Opcional) Adicionar imagem de capa

---

## 🚀 Deploy no Render

1. **Crie um repositório no GitHub** com todos os arquivos
2. **Acesse Render.com** e faça login
3. **New → Static Site**
4. **Conecte seu repositório**
5. Configure:
   - **Build Command:** (deixe em branco)
   - **Publish Directory:** `.` (ponto)
6. **Create Static Site**

Seu site estará online em alguns minutos!

**URL:** `https://seu-site.onrender.com`

### Atualizações automáticas
Toda vez que você fizer `git push`, o Render atualiza automaticamente.

---

## 📝 Exemplo Completo

### 1. Crie o arquivo HTML
Arquivo: `posts/2024/12/exemplo.html`

### 2. Adicione a imagem
Arquivo: `images/capas/exemplo.jpg` (1200x630px)

### 3. Registre no posts.json
```json
{
  "title": "Meu Exemplo de Post",
  "excerpt": "Esta é a descrição curta que aparece no card.",
  "date": "2024-12-05",
  "category": "Ficção",
  "thumbnail": "images/capas/exemplo.jpg",
  "url": "posts/2024/12/exemplo.html"
}
```

### 4. Resultado
- ✅ Aparece no grid principal
- ✅ Contador da categoria "Ficção" aumenta
- ✅ Contador do ano "2024" aumenta
- ✅ Pode ser filtrado por categoria ou ano

---

## 🎯 Dicas Pro

### Sem imagem?
Use placeholder automático:
```json
"thumbnail": ""
```

### Múltiplas categorias?
Escolha a principal. Se precisar de tags, podemos adicionar depois.

### Editar um post antigo?
1. Edite o arquivo HTML
2. Atualize excerpt/título no `posts.json` se necessário
3. Commit e push

### Deletar um post?
1. Delete o arquivo HTML
2. Remova a entrada do `posts.json`
3. Commit e push

---

## 🆘 Troubleshooting

### Posts não aparecem?
- Verifique se o `posts.json` está válido (use [JSONLint](https://jsonlint.com))
- Verifique se não esqueceu vírgulas entre os posts
- Abra o Console do navegador (F12) para ver erros

### Imagens não carregam?
- Verifique o caminho no `thumbnail`
- Certifique-se que a imagem existe na pasta `images/capas/`
- Paths são case-sensitive

### Site não atualiza no Render?
- Verifique se fez `git push`
- Veja os logs no painel do Render
- Pode levar 1-2 minutos para atualizar

---

## 📧 Personalização

Para editar seu nome, links do menu, etc:
- **Nome do site:** Edite `.logo` no `index.html`
- **Links do menu:** Edite `<nav>` no `index.html`
- **Cores:** Edite as variáveis em `:root` no CSS
- **Rodapé:** Edite `<footer>` no `index.html`

---

✨ **Tudo pronto!** Agora é só escrever e publicar.
