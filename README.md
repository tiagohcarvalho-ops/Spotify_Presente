# 🎁 Presente de Aniversário — Playlist Personalizada

Site no estilo de um app de música, todo dedicado a uma amiga especial.

## Como personalizar

Abra o arquivo **`script.js`** e edite o bloco no topo do arquivo:

1. **`FRIEND_NAME`** — coloque o nome dela.
2. **`songs`** — array com as 5 (ou quantas quiser) músicas. Para cada uma, edite:
   - `title` / `artist` / `duration`
   - `src` → caminho do MP3 dentro de `assets/music/`
   - `cover` → capa da música em `assets/images/`
   - `photo` → foto da memória em `assets/images/`
   - `memoryTag`, `memoryTitle`, `memoryText` → o texto da lembrança
3. **`LETTER_TEXT`** — o texto da carta que aparece na surpresa final (use `\n\n` para parágrafos).

## Como adicionar os arquivos

```
assets/
  music/      → coloque aqui musica1.mp3, musica2.mp3, etc.
  images/     → coloque aqui as capas e fotos (capa1.jpg, memoria1.jpg, etc.)
  icons/      → ícones extras, se quiser usar no lugar dos emojis
```

Se uma imagem ainda não existir, o site mostra um ícone de fallback (📸/🖼️/🎵)
automaticamente — então você pode publicar o site mesmo antes de ter todas
as fotos prontas, e ir trocando depois.

## Como rodar

Como o player carrega arquivos locais (MP3/imagens), abra o `index.html`
através de um servidor local (não em `file://`), por exemplo:

```bash
# Python já instalado na maioria dos sistemas
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Estrutura

```
index.html   → estrutura da página
style.css    → todo o visual (tema escuro, verde, glassmorphism, animações)
script.js    → player de música, memórias, confetes, partículas e a surpresa final
assets/      → suas músicas e fotos
```

Feito com carinho. 💚
