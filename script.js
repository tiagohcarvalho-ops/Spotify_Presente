/* ============================================================
   PRESENTE DE ANIVERSÁRIO — SCRIPT PRINCIPAL
   Organize seus dados aqui em cima. É só editar este bloco
   para personalizar o site inteiro (nome, músicas, fotos, carta).
   ============================================================ */

/* ---------- 1. DADOS PARA PERSONALIZAR ---------- */

// Nome de quem vai receber o presente
const FRIEND_NAME = "Samir"; // <-- troque pelo nome dela

// Lista de músicas. Troque "src" pelos arquivos em assets/music/
// e "cover" / "photo" pelos arquivos em assets/images/
const songs = [
  {
    id: 1,
    title: "Sublime renúncia",
    artist: "Leandro & Leonardo",
    duration: "3:16",
    src: "assets/music/sublime.mpeg",
    cover: "assets/images/SBR.jpeg",
    photo: "assets/images/foto1.jpeg",
    memoryTag: "MOMENTO 1",
    memoryTitle: "Como tudo começou",
    memoryText:
      "Acho que fazia pouco tempo que tínhamos começado a conversar, mas uma das minhas memórias favoritas da época da escola é a gente escutando Modão de manhã cedo durante a aula, mas principalmente você me apresentando Sublime Renúncia."
  },
  {
    id: 2,
    title: "É preciso dar um jeito, meu amigo",
    artist: "Erasmo Carlos",
    duration: "3:48",
    src: "assets/music/erasmoA.mpeg",
    cover: "assets/images/erasmo.jpeg",
    photo: "assets/images/Papai.jpeg",
    memoryTag: "MOMENTO 2",
    memoryTitle: "Mini Tradição",
    memoryText:
      "A música não me lembra exatamente você, mas me lembra do dia em que fomos assistir Ainda Estou Aqui no cinema. Também foi o dia em que começamos nossa pequena tradição de ir ver o Papai Noel para você tirar foto com ele."
  },
  {
    id: 3,
    title: "CAJU",
    artist: "Liniker",
    duration: "4:32",
    src: "assets/music/Cajuu.mpeg",
    cover: "assets/images/Linke.jpeg",
    photo: "assets/images/Caju.jpeg",
    memoryTag: "MOMENTO 3",
    memoryTitle: "O primeiro presente",
    memoryText:
      "Esse aqui não tem nem muito o que falar. Foi o primeiro presente de aniversário que eu te dei. Você me apresentou tanto o álbum quanto a carreira da Liniker, e ter vivido a experiência desse show com você e com as meninas foi simplesmente incrível."
  },
  {
    id: 4,
    title: "Atrás/Além",
    artist: "O Terno",
    duration: "4:12",
    src: "assets/music/Atras-Alem.mpeg",
    cover: "assets/images/tim.jpeg",
    photo: "assets/images/VIVI.jpeg",
    memoryTag: "MOMENTO 4",
    memoryTitle: "Cala a boca Tim Bernardes",
    memoryText:
      "Me lembro até hoje do dia em que você me mostrou essa música. Acho que a gente estava na sua casa, conversando e vendo os seus republicados, quando ela apareceu. Lembro de ter ficado viciado e, logo depois, ter ido escutar todas as músicas do Tim. Depois ainda teve o show a que a gente foi, o que ajudou a marcar essa lembrança ainda mais na memória."
  },
  {
    id: 5,
    title: "Beber, Beber",
    artist: "Leonardo",
    duration: "3:32",
    src: "assets/music/Bebeer.mpeg",
    cover: "assets/images/Beber.jpeg",
    photo: "assets/images/cachaca.jpeg",
    memoryTag: "MOMENTO 5",
    memoryTitle: "Feliz aniversário!",
    memoryText:
      "E pra fechar com chave de ouro: feliz aniversário, Vii! Que esse novo ano seja leve, feliz e cheio de momentos pra gente guardar, E SAI LOGO DA BCT QUE A GENTE TEM QUE BEBER PINGA."
  }
];

// Texto da carta da surpresa final (digitado letra por letra)
const LETTER_TEXT =
`Vi, eu só tenho a agradecer por ter você na minha vida. Desde o dia em que você chegou me chamando para ver duas horas de um filme de uma mulher apanhando, eu senti que tinha algo diferente, e hoje estamos aqui.\n\n` +
`Se eu fosse colocar todas as músicas que me lembram você ou todos os momentos que vivi ao seu lado, eu nunca terminaria isso aqui kkkkk.\n\n` +
`Enfim, feliz aniversário! 🎉\n\n` +
`Aproveita muito o seu dia e espero que possamos viver muito mais momentos musicais juntos kkkkk.\n\n` +
`Continuarei aqui por você até onde Deus permitir. Eu te amo absurdamente, Samir. 💚\n\n` +
`E repito: sai logo da BCT, que a gente ainda tem que beber pinga. 🍻`;



/* ============================================================
   2. RENDERIZAÇÃO DA LISTA DE MÚSICAS
   ============================================================ */

const trackListEl = document.getElementById("trackList");
const friendNameEl = document.getElementById("friendName");
const songCountEl = document.getElementById("songCount");
const totalDurationEl = document.getElementById("totalDuration");

friendNameEl.textContent = FRIEND_NAME;
songCountEl.textContent = `${songs.length} músicas`;
totalDurationEl.textContent = `cerca de ${estimateTotalMinutes(songs)} min`;

function estimateTotalMinutes(list) {
  let totalSeconds = 0;
  list.forEach((s) => {
    const [m, sec] = s.duration.split(":").map(Number);
    totalSeconds += m * 60 + sec;
  });
  return Math.round(totalSeconds / 60);
}

function renderTrackList() {
  songs.forEach((song, index) => {
    const row = document.createElement("div");
    row.className = "track-row";
    row.dataset.index = index;
    row.style.animationDelay = `${index * 0.06}s`;

    row.innerHTML = `
      <span class="track-number">
        <span class="track-index">${index + 1}</span>
        <span class="track-play-icon">♪</span>
      </span>
      <div class="track-main">
        <div class="track-cover">
          <img src="${song.cover}" alt="${song.title}" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.innerHTML='🎵';">
        </div>
        <div class="track-names">
          <span class="track-name">${song.title}</span>
          <span class="track-artist">${song.artist}</span>
        </div>
      </div>
      <span class="track-moment hide-mobile">${song.memoryTitle}</span>
      <span class="track-duration">${song.duration}</span>
    `;

    row.addEventListener("click", () => playSong(index));
    trackListEl.appendChild(row);
  });
}
renderTrackList();

/* ============================================================
   3. PLAYER DE ÁUDIO
   ============================================================ */

const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const playAllBtn = document.getElementById("playAllBtn");

const playerSongName = document.getElementById("playerSongName");
const playerArtistName = document.getElementById("playerArtistName");
const playerCoverImg = document.getElementById("playerCoverImg");
const playerCoverFallback = document.getElementById("playerCoverFallback");

const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const progressBarWrap = document.getElementById("progressBarWrap");
const progressBarFill = document.getElementById("progressBarFill");
const progressBarHandle = document.getElementById("progressBarHandle");

const volumeBarWrap = document.getElementById("volumeBarWrap");
const volumeBarFill = document.getElementById("volumeBarFill");
const volumeIcon = document.getElementById("volumeIcon");

let currentIndex = -1;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

audio.volume = 0.8;

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function playSong(index) {
  currentIndex = index;
  const song = songs[index];

  // Atualiza áudio (substitua os arquivos em assets/music/ pelos reais)
  audio.src = song.src;
  audio.play().catch(() => {
    // Se o arquivo de áudio ainda não existir, a interface continua
    // funcionando normalmente — apenas o som não toca.
    console.warn("Não foi possível reproduzir o áudio. Verifique o arquivo:", song.src);
  });
  isPlaying = true;
  updatePlayButton();

  // Atualiza informações do player
  playerSongName.textContent = song.title;
  playerArtistName.textContent = song.artist;
  setImageWithFallback(playerCoverImg, playerCoverFallback, song.cover);

  // Atualiza destaque na lista
  document.querySelectorAll(".track-row").forEach((row) => {
    row.classList.toggle("playing", Number(row.dataset.index) === index);
  });

  // Atualiza painel de memórias com animação suave
  updateMemoryPanel(song);

  totalTimeEl.textContent = song.duration;
}

function setImageWithFallback(imgEl, fallbackEl, src) {
  imgEl.classList.remove("loaded");
  const testImg = new Image();
  testImg.onload = () => {
    imgEl.src = src;
    imgEl.classList.add("loaded");
    if (fallbackEl) fallbackEl.style.display = "none";
  };
  testImg.onerror = () => {
    imgEl.removeAttribute("src");
    if (fallbackEl) fallbackEl.style.display = "flex";
  };
  testImg.src = src;
}

function togglePlayPause() {
  if (currentIndex === -1) {
    playSong(0);
    return;
  }
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(() => {});
  }
  isPlaying = !isPlaying;
  updatePlayButton();
}

function updatePlayButton() {
  playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
}

function playNext() {
  if (songs.length === 0) return;
  let nextIndex;
  if (isShuffle) {
    nextIndex = Math.floor(Math.random() * songs.length);
  } else {
    nextIndex = (currentIndex + 1) % songs.length;
  }
  playSong(nextIndex);
}

function playPrev() {
  if (songs.length === 0) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(prevIndex);
}

playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);
playAllBtn.addEventListener("click", () => {
  if (currentIndex === -1) playSong(0);
  else togglePlayPause();
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active-toggle", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active-toggle", isRepeat);
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } else {
    playNext();
  }
});

/* ---- barra de progresso ---- */
audio.addEventListener("timeupdate", () => {
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressBarFill.style.width = `${pct}%`;
  progressBarHandle.style.left = `${pct}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

function seekTo(clientX) {
  const rect = progressBarWrap.getBoundingClientRect();
  const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  if (audio.duration) {
    audio.currentTime = pct * audio.duration;
  }
}

let isDraggingProgress = false;
progressBarWrap.addEventListener("mousedown", (e) => {
  isDraggingProgress = true;
  seekTo(e.clientX);
});
window.addEventListener("mousemove", (e) => {
  if (isDraggingProgress) seekTo(e.clientX);
});
window.addEventListener("mouseup", () => (isDraggingProgress = false));
progressBarWrap.addEventListener("touchstart", (e) => seekTo(e.touches[0].clientX));
progressBarWrap.addEventListener("touchmove", (e) => seekTo(e.touches[0].clientX));

/* ---- controle de volume ---- */
function setVolume(clientX) {
  const rect = volumeBarWrap.getBoundingClientRect();
  const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  audio.volume = pct;
  volumeBarFill.style.width = `${pct * 100}%`;
  volumeIcon.textContent = pct === 0 ? "🔇" : pct < 0.5 ? "🔉" : "🔊";
}
volumeBarFill.style.width = `${audio.volume * 100}%`;

let isDraggingVolume = false;
volumeBarWrap.addEventListener("mousedown", (e) => {
  isDraggingVolume = true;
  setVolume(e.clientX);
});
window.addEventListener("mousemove", (e) => {
  if (isDraggingVolume) setVolume(e.clientX);
});
window.addEventListener("mouseup", () => (isDraggingVolume = false));

/* ============================================================
   4. PAINEL DE MEMÓRIAS (com transição suave)
   ============================================================ */

const memoryPanel = document.getElementById("memoryPanel");
const memoryPhoto = document.getElementById("memoryPhoto");
const memoryPhotoFallback = document.getElementById("memoryPhotoFallback");
const memoryTag = document.getElementById("memoryTag");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const memoryTextWrap = document.querySelector(".memory-text-wrap");

function updateMemoryPanel(song) {
  // fade out
  memoryTextWrap.classList.add("memory-fade-out");
  memoryPhoto.classList.remove("loaded");

  setTimeout(() => {
    memoryTag.textContent = song.memoryTag;
    memoryTitle.textContent = song.memoryTitle;
    memoryText.textContent = song.memoryText;
    setImageWithFallback(memoryPhoto, memoryPhotoFallback, song.photo);

    memoryTextWrap.classList.remove("memory-fade-out");
    memoryTextWrap.classList.add("memory-fade-in");
    setTimeout(() => memoryTextWrap.classList.remove("memory-fade-in"), 500);
  }, 220);
}

/* ============================================================
   5. PARTÍCULAS BRILHANTES NO FUNDO
   ============================================================ */

const particlesCanvas = document.getElementById("particles-canvas");
const pctx = particlesCanvas.getContext("2d");
let particles = [];

function resizeParticlesCanvas() {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}
resizeParticlesCanvas();
window.addEventListener("resize", resizeParticlesCanvas);

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      drift: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.15,
      blink: Math.random() * 0.02 + 0.005
    });
  }
}
createParticles(window.innerWidth < 700 ? 40 : 90);

function animateParticles() {
  pctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  particles.forEach((p) => {
    p.y -= p.speed;
    p.x += p.drift;
    p.opacity += (Math.random() - 0.5) * p.blink;
    p.opacity = Math.min(Math.max(p.opacity, 0.05), 0.7);

    if (p.y < -10) {
      p.y = particlesCanvas.height + 10;
      p.x = Math.random() * particlesCanvas.width;
    }

    pctx.beginPath();
    pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pctx.fillStyle = `rgba(30, 215, 96, ${p.opacity})`;
    pctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================================
   6. CONFETES (abertura do site)
   ============================================================ */

function launchConfetti(canvasEl, options = {}) {
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const colors = ["#1ed760", "#ffffff", "#0fae50", "#9af5bd", "#06200f"];
  const count = options.count || 140;
  const duration = options.duration || 3200;
  const confetti = [];

  for (let i = 0; i < count; i++) {
    confetti.push({
      x: Math.random() * canvasEl.width,
      y: -20 - Math.random() * canvasEl.height * 0.4,
      w: Math.random() * 8 + 4,
      h: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  const start = performance.now();
  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    confetti.forEach((c) => {
      c.y += c.speedY;
      c.x += c.speedX;
      c.rotation += c.rotationSpeed;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  }
  requestAnimationFrame(frame);
}

// Dispara confetes assim que o site abre
window.addEventListener("load", () => {
  const confettiCanvas = document.getElementById("confetti-canvas");
  launchConfetti(confettiCanvas, { count: 160, duration: 3500 });
});

/* ============================================================
   7. SURPRESA FINAL (carta + balões)
   ============================================================ */

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseOverlay = document.getElementById("surpriseOverlay");
const closeSurpriseBtn = document.getElementById("closeSurpriseBtn");
const letterText = document.getElementById("letterText");
const letterCursor = document.getElementById("letterCursor");
const balloonsWrap = document.getElementById("balloons");
const surpriseConfettiCanvas = document.getElementById("surprise-confetti-canvas");

let typingTimeout = null;

function openSurprise() {
  surpriseOverlay.classList.add("active");
  letterText.textContent = "";
  balloonsWrap.innerHTML = "";

  typeLetter(LETTER_TEXT, 0);

  // confetes leves ao abrir a surpresa
  launchConfetti(surpriseConfettiCanvas, { count: 90, duration: 2500 });
}

function typeLetter(text, index) {
  if (index <= text.length) {
    letterText.textContent = text.slice(0, index);
    typingTimeout = setTimeout(() => typeLetter(text, index + 1), 28);
  } else {
    letterCursor.style.display = "none";
    spawnBalloons();
    launchConfetti(surpriseConfettiCanvas, { count: 150, duration: 4000 });
  }
}

function spawnBalloons() {
  const emojis = ["🎈", "🎈", "🎈", "🎉", "🎊"];
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("span");
    b.className = "balloon";
    b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    b.style.left = `${Math.random() * 100}%`;
    b.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
    b.style.animationDelay = `${Math.random() * 1.2}s`;
    balloonsWrap.appendChild(b);
  }
}

function closeSurprise() {
  surpriseOverlay.classList.remove("active");
  clearTimeout(typingTimeout);
  letterCursor.style.display = "inline";
}

surpriseBtn.addEventListener("click", openSurprise);
closeSurpriseBtn.addEventListener("click", closeSurprise);

/* ============================================================
   FIM — Para personalizar o site, edite o bloco no topo deste
   arquivo (FRIEND_NAME, songs[] e LETTER_TEXT) e substitua os
   arquivos dentro de assets/music e assets/images.
   ============================================================ */
