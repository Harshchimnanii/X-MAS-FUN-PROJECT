const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeBtn = document.getElementById("closeBtn");

const today = new Date().getDate();
const opened = JSON.parse(localStorage.getItem("opened")) || [];

/* 🌐 25 CURATED WEIRD + USEFUL WEBSITES */
const surprises = [
  { name: "Quick, Draw!", desc: "AI guesses your drawings in real time.", url: "https://quickdraw.withgoogle.com" },
  { name: "Stellarium Web", desc: "Explore the night sky and constellations.", url: "https://stellarium-web.org" },
  { name: "Falling Sand Game", desc: "Physics-based sandbox simulation.", url: "https://sandspiel.club" },
  { name: "This Is Sand", desc: "Create beautiful sand art online.", url: "https://thisissand.com" },
  { name: "Mondrian And Me", desc: "Generate art inspired by Mondrian.", url: "https://mondrianandme.com" },
  { name: "Binary Music Player", desc: "Binary data converted into sound.", url: "https://www.g200kg.com/en/docs/music_binary.html" },
  { name: "Draw a Stickman", desc: "Draw characters and play a story.", url: "https://www.drawastickman.com" },

  { name: "Zoomquilt", desc: "Infinite zooming artwork.", url: "https://zoomquilt.org" },
  { name: "Koala to the Max", desc: "Reveal pixel art interactively.", url: "https://www.koalastothemax.com" },
  { name: "RGB", desc: "Minimal color-based experiment.", url: "https://rgb.toys" },
  { name: "Blue Ball Machine", desc: "Satisfying chain-reaction animation.", url: "https://abagames.github.io/crisp-game-lib-games/?blueballmachine" },
  { name: "Into Time", desc: "Interactive time storytelling.", url: "http://intotime.com" },
  { name: "Ffffidget", desc: "Digital fidget toy to relax.", url: "https://ffffidget.com" },

  { name: "Endless Horse", desc: "A horse that never ends.", url: "http://endless.horse" },
  { name: "Cat Bounce", desc: "Bouncing cats chaos.", url: "https://cat-bounce.com" },
  { name: "Eel Slap!", desc: "Slap a man with an eel.", url: "https://eelslap.com" },
  { name: "Nyan Cat", desc: "Infinite rainbow cat nostalgia.", url: "https://nyan.cat" },
  { name: "Sad Trombone", desc: "Instant disappointment sound.", url: "https://sad-trombone.com" },
  { name: "Noooooo!", desc: "Darth Vader scream button.", url: "https://nooooooooooooooo.com" },

  { name: "The Useless Web", desc: "One click → random weird site.", url: "https://theuselessweb.com" },
  { name: "Pointer Pointer", desc: "Finds photos pointing at your cursor.", url: "https://pointerpointer.com" },
  { name: "Hacker Typer", desc: "Look like a hacker instantly.", url: "https://hackertyper.net" },
  { name: "Bacon Ipsum", desc: "Lorem Ipsum but bacon.", url: "https://baconipsum.com" },
  { name: "Bored Button", desc: "Click when bored. Magic happens.", url: "https://www.boredbutton.com" }
];

for (let day = 1; day <= 25; day++) {
  const card = document.createElement("div");
  card.className = "day";
  card.innerHTML = `<div class="day-inner">${day}</div>`;

  if (day > today) card.classList.add("locked");
  if (day === today) card.classList.add("today");
  if (opened.includes(day)) card.classList.add("opened");

  card.onclick = () => {
    if (day > today) return;

    const site = surprises[day - 1];

    modal.style.display = "block";
    modalText.innerHTML = `
      <h3>${site.name}</h3>
      <p style="margin:12px 0; font-size:14px;">${site.desc}</p>
      <a class="visit-btn" href="${site.url}" target="_blank">
        Visit Website 🚀
      </a>
    `;

    if (!opened.includes(day)) {
      opened.push(day);
      localStorage.setItem("opened", JSON.stringify(opened));
      card.classList.add("opened");
    }
  };

  calendar.appendChild(card);
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => e.target === modal && (modal.style.display = "none");
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const time = document.getElementById("time");

playBtn.onclick = () => {
  if (music.paused) {
    music.play();
    playBtn.textContent = "⏸";
  } else {
    music.pause();
    playBtn.textContent = "▶";
  }
};

music.ontimeupdate = () => {
  progress.value = (music.currentTime / music.duration) * 100 || 0;

  const mins = Math.floor(music.currentTime / 60);
  const secs = Math.floor(music.currentTime % 60)
    .toString()
    .padStart(2, "0");

  time.textContent = `${mins}:${secs}`;
};

progress.oninput = () => {
  music.currentTime = (progress.value / 100) * music.duration;
};
