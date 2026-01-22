const targetDate = new Date("Jan 06, 2026 00:00:00").getTime();
const SECRET_CODE = "2601";
let curTab = 0;
const totalTabs = 4;
const letterText = `
Buat sayangku Baiq Erwina Yolanda, Pemilik Hatiku,

Selamat ulang tahun, Sayang.

Di hari yang istimewa ini, aku hanya ingin berhenti sejenak untuk bersyukur. Terima kasih telah menjadi alasan di balik setiap senyumanku dan menjadi cahaya yang menenangkan di tengah hiruk-pikuk dunia ini. Bersamamu, aku tidak hanya menemukan cinta, tapi aku menemukan rumah.

Terima kasih telah menerima setiap bagian dari diriku, mencintai kelebihanku, dan memeluk kekuranganku dengan begitu tulus. Aku berjanji untuk selalu menjagamu, mencintaimu lebih dalam di setiap detaknya, dan berjalan di sampingmu untuk menjemput semua mimpi kita.

Kamu adalah keajaiban terindah yang pernah Tuhan titipkan dalam hidupku.

I Love You, Forever and Always. ;
— Fauzan Hari
`;

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let width,
  height,
  stars = [];
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
function createStars() {
  stars = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random(),
      fade: Math.random() > 0.5 ? 0.01 : -0.01,
    });
  }
}
createStars();
function animateStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  stars.forEach((s) => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.alpha += s.fade;
    if (s.alpha <= 0.2 || s.alpha >= 1) s.fade *= -1;
    s.y -= s.speed;
    if (s.y < 0) s.y = height;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

function next(id) {
  document.querySelectorAll("section").forEach((s) => {
    s.classList.remove("active");
    setTimeout(() => (s.scrollTop = 0), 800);
  });
  document.getElementById(id).classList.add("active");
}

/* ================= COUNTDOWN (DENGAN DETIK) ================= */
setInterval(() => {
  const diff = targetDate - Date.now();

  if (diff <= 0) {
    // Jika waktu habis
    document.getElementById("goLockBtn").style.display = "inline-block";
    // document.getElementById("skipBtn").style.display = "none"; // Skip btn sudah dihapus
    document.getElementById("d").innerText = "00";
    document.getElementById("h").innerText = "00";
    document.getElementById("m").innerText = "00";
    document.getElementById("s").innerText = "00";
  } else {
    // Rumus Matematika Waktu
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000); // Hitung Detik

    // Tampilkan ke HTML (tambahkan angka 0 jika satuan)
    document.getElementById("d").innerText = d < 10 ? "0" + d : d;
    document.getElementById("h").innerText = h < 10 ? "0" + h : h;
    document.getElementById("m").innerText = m < 10 ? "0" + m : m;
    document.getElementById("s").innerText = s < 10 ? "0" + s : s;
  }
}, 1000);

document.getElementById("pass").addEventListener("keypress", function (e) {
  if (e.key === "Enter") checkPass();
});
function checkPass() {
  const val = document.getElementById("pass").value;
  if (val === SECRET_CODE) {
    next("envelope");
    tryMusic();
    createHearts(window.innerWidth / 2, window.innerHeight / 2);
  } else {
    const err = document.getElementById("err");
    err.style.opacity = 1;
    const input = document.getElementById("pass");
    input.style.transform = "translateX(10px)";
    setTimeout(() => (input.style.transform = "translateX(-10px)"), 100);
    setTimeout(() => (input.style.transform = "translateX(0)"), 200);
    setTimeout(() => (err.style.opacity = 0), 2000);
    document.getElementById("pass").value = "";
  }
}

function openEnv() {
  document.getElementById("env").classList.add("open");
  setTimeout(() => next("story-section"), 1200);
}

function updateProg() {
  const pct = (curTab / (totalTabs - 1)) * 100;
  document.getElementById("prog").style.width = pct + "%";
}

function nextTab() {
  document.getElementById(`tab${curTab}`).classList.remove("active");
  curTab++;
  if (curTab === 3) {
    document.getElementById("navBtn").innerHTML =
      "Selesai <i class='fas fa-heart'></i>";
    document.getElementById("navBtn").onclick = finishStory;
    typeLetter();
    document.getElementById(`tab${curTab}`).classList.add("active");
  } else if (curTab >= totalTabs) return;
  else document.getElementById(`tab${curTab}`).classList.add("active");
  updateProg();
  const btn = document.getElementById("navBtn");
  const rect = btn.getBoundingClientRect();
  createHearts(rect.left + rect.width / 2, rect.top);
}

function finishStory() {
  createHearts(window.innerWidth / 2, window.innerHeight / 2);
  const overlay = document.createElement("div");
  overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:2000;display:flex;justify-content:center;align-items:center;opacity:0;transition:0.5s;backdrop-filter:blur(5px);`;
  overlay.innerHTML = `<div style="text-align:center;color:white;padding:20px;transform:scale(0.8);transition:0.5s;">
    <h1 style="margin-bottom:20px;">I Love You!</h1>
    <p>Semoga aku dan kamu bisa terus
melangkah bareng, jadi pasangan yang
sama-sama tumbuh dan sukses dengan
cara yang bikin hati tenang. Semoga hidup
kita selalu dicukupkan, cukup dalam rezeki
cukup kesempatan, dan cukup ruang untuk
bahagia. Aku juga berharap setiap langkah
yang kita ambil dipermudah, dijauhkan dari
hal-hal yang bikin kita jatuh, dan dikelilingi
keluarga yang sehat serta aman. Apa pun
yang sedang kita usahakan sekarang,
semoga diberi arah yang jelas dan
kekuatan untuk kita jalani bersama. Dan
semoga, dalam keadaan apa pun nanti aku
dan kamu tetap saling memilih, tetap saling
jaga, dan tetap jalan bersama.</p>
    <button onclick="window.location.href='https://wa.me/+6281392718123'" style="margin-top:20px;padding:10px 20px;background:var(--primary);border:none;border-radius:20px;color:white;">Tutup</button>
  </div>`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.style.opacity = 1;
    overlay.querySelector("div").style.transform = "scale(1)";
  }, 10);
}

function typeLetter() {
  const el = document.getElementById("finalPaper");
  el.innerHTML = "";
  const lines = letterText.split("\n");
  let lineIndex = 0,
    charIndex = 0;
  function type() {
    if (lineIndex < lines.length) {
      let curLine = lines[lineIndex];
      let p = el.lastElementChild;
      if (!p || p.tagName !== "P") {
        p = document.createElement("p");
        p.style.marginBottom = "15px";
        p.style.minHeight = "1.6rem";
        el.appendChild(p);
      }
      p.textContent += curLine.charAt(charIndex);
      charIndex++;
      el.scrollTop = el.scrollHeight;
      if (charIndex >= curLine.length) {
        lineIndex++;
        charIndex = 0;
      }
      setTimeout(type, 30 + Math.random() * 50);
    }
  }
  type();
}

const bgm = document.getElementById("bgm");
const vinyl = document.getElementById("vinylBtn");
const notes = document.querySelectorAll(".note");
let isPlaying = false;
function tryMusic() {
  if (!isPlaying) {
    bgm.volume = 0.5;
    bgm
      .play()
      .then(() => {
        isPlaying = true;
        vinyl.classList.add("spinning");
        notes.forEach((n) => (n.style.opacity = 1));
      })
      .catch((e) => console.log("Audio blocked"));
  }
}
function toggleMusic() {
  if (isPlaying) {
    bgm.pause();
    vinyl.classList.remove("spinning");
    notes.forEach((n) => (n.style.opacity = 0));
  } else {
    bgm.play();
    vinyl.classList.add("spinning");
    notes.forEach((n) => (n.style.opacity = 1));
  }
  isPlaying = !isPlaying;
}
function createHearts(x, y) {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("div");
    h.className = "heart-burst";
    h.innerHTML = '<i class="fas fa-heart"></i>';
    h.style.left = x + "px";
    h.style.top = y + "px";
    const angle = Math.random() * Math.PI * 2,
      velocity = 50 + Math.random() * 100;
    h.style.setProperty("--tx", Math.cos(angle) * velocity + "px");
    h.style.setProperty("--ty", Math.sin(angle) * velocity + "px");
    h.style.fontSize = Math.random() * 15 + 10 + "px";
    h.style.color = ["#ff3b6c", "#ffd700", "#ffffff"][
      Math.floor(Math.random() * 3)
    ];
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 800);
  }
}
document.addEventListener("click", (e) => {
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON")
    createHearts(e.clientX, e.clientY);
});
