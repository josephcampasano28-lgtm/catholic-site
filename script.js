// ---------- Daily reflection ----------
const reflections = [
  { text: "Make a few minutes of quiet today. God speaks most clearly when we stop rushing.", ref: "Psalm 46:10" },
  { text: "Prayer doesn't have to be a show. Find a quiet spot and talk to God honestly.", ref: "Matthew 6:6" },
  { text: "Try to keep God in the background of the whole day, with joy, prayer, and thanks.", ref: "1 Thessalonians 5:16-18" },
  { text: "Worried about something? Hand it to God in prayer, one worry at a time.", ref: "Philippians 4:6" },
  { text: "If you feel worn out, Jesus invites you to come to him and rest.", ref: "Matthew 11:28" },
  { text: "Jesus gives one clear command: love one another the way he loves you.", ref: "John 13:34" },
  { text: "Mercy is how we imitate God. Who can you show mercy to today?", ref: "Luke 6:36" },
  { text: "Trust God even when you can't see the whole path ahead.", ref: "Proverbs 3:5" },
  { text: "The Lord is a shepherd who guides and protects. You can walk through hard times without fear.", ref: "Psalm 23" },
  { text: "Peacemakers are called blessed. Look for one way to bring peace to a hard situation today.", ref: "Matthew 5:9" },
  { text: "What does God ask? To act justly, to love mercy, and to walk humbly with him.", ref: "Micah 6:8" },
  { text: "Dress your heart in compassion, kindness, humility, gentleness, and patience.", ref: "Colossians 3:12" },
  { text: "Stay joyful in hope, patient in hard times, and faithful in prayer.", ref: "Romans 12:12" },
  { text: "Be strong and don't be afraid. God is with you wherever you go.", ref: "Joshua 1:9" },
  { text: "When we serve someone in need, we serve Christ himself.", ref: "Matthew 25:40" }
];

const dayNumber = Math.floor(Date.now() / 86400000);
const todays = reflections[dayNumber % reflections.length];
const textEl = document.getElementById("daily-text");
const refEl = document.getElementById("daily-ref");
if (textEl && refEl) {
  textEl.textContent = todays.text;
  refEl.textContent = "Read it: " + todays.ref;
}

// ---------- Prayer checklist ----------
const tasks = [
  "Morning prayer",
  "Read today's Mass readings",
  "Pray a decade of the Rosary",
  "Do one act of kindness",
  "Thank God before bed"
];

const listEl = document.getElementById("checklist");
if (listEl) {
  const today = new Date().toDateString();
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem("prayerChecklist")) || {};
  } catch (e) {
    saved = {};
  }
  if (saved.date !== today) saved = { date: today, done: [] };

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = saved.done.includes(i);
    box.addEventListener("change", () => {
      if (box.checked) {
        saved.done.push(i);
      } else {
        saved.done = saved.done.filter((n) => n !== i);
      }
      localStorage.setItem("prayerChecklist", JSON.stringify(saved));
    });
    label.appendChild(box);
    label.append(" " + task);
    li.appendChild(label);
    listEl.appendChild(li);
  });
}

// ---------- Search ----------
const pages = [
  { title: "Prayer", url: "prayer.html", keywords: "prayer pray our father hail mary glory be sign of the cross habit meditation contemplative" },
  { title: "The Sacraments", url: "sacraments.html", keywords: "sacraments baptism confirmation eucharist confession penance reconciliation anointing sick holy orders matrimony marriage" },
  { title: "The Mass", url: "mass.html", keywords: "mass liturgy word eucharist communion readings homily sunday" }
];  { title: "The Mass", url: "mass.html", keywords: "mass liturgy word eucharist communion readings homily sunday" },
  { title: "Commandments and Beatitudes", url: "commandments.html", keywords: "commandments ten beatitudes law sin examination conscience mercy peace meek" }
  { title: "Commandments and Beatitudes", url: "commandments.html", keywords: "commandments ten beatitudes law sin examination conscience mercy peace meek" },
  { title: "Confession Guide", url: "confession.html", keywords: "confession reconciliation penance forgiveness sin absolution contrition priest child teen adult examination conscience" }
const searchBox = document.getElementById("search-box");
const results = document.getElementById("search-results");
if (searchBox && results) {
  searchBox.addEventListener("input", () => {
    const q = searchBox.value.trim().toLowerCase();
    results.innerHTML = "";
    if (!q) return;
    const hits = pages.filter((p) =>
      (p.title + " " + p.keywords).toLowerCase().includes(q)
    );
    if (hits.length === 0) {
      results.textContent = "No pages found yet.";
      return;
    }
    hits.forEach((p) => {
      const a = document.createElement("a");
      a.href = p.url;
      a.textContent = p.title;
      results.appendChild(a);
    });
  });
}
