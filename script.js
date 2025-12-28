function verifyNews() {
  let text = document.getElementById("newsInput").value;
  let score = 100;
  let reasons = [];

  if (text.length < 20) {
    score -= 20;
    reasons.push("Text too short to verify");
  }

  if (!text.includes("http")) {
    score -= 20;
    reasons.push("No source link found");
  } else {
    reasons.push("Source link detected");
  }

  let trusted = ["WHO", "government", "police", ".gov", ".edu"];
  let trustedFound = trusted.some(word =>
    text.toLowerCase().includes(word.toLowerCase())
  );

  if (trustedFound) {
    reasons.push("Trusted authority mentioned");
  } else {
    score -= 10;
    reasons.push("No trusted authority found");
  }

  if (!text.match(/\d{4}/)) {
    score -= 10;
    reasons.push("No date mentioned");
  } else {
    reasons.push("Date detected");
  }

  let panicWords = ["BREAKING", "SHOCKING", "URGENT", "ALERT", "SHARE NOW"];
  panicWords.forEach(word => {
    if (text.toUpperCase().includes(word)) {
      score -= 10;
      reasons.push("Panic word detected: " + word);
    }
  });

  if (text.includes("!!!") || text.includes("???")) {
    score -= 10;
    reasons.push("Excessive punctuation detected");
  }

  if (score < 0) score = 0;

  let level =
    score >= 80 ? "🟢 High Credibility" :
    score >= 50 ? "🟡 Medium Credibility" :
    "🔴 Low Credibility";

  document.getElementById("score").innerText =
    `Credibility Score: ${score}/100 (${level})`;

  let list = document.getElementById("reasons");
  list.innerHTML = "";
  reasons.forEach(r => {
    let li = document.createElement("li");
    li.innerText = r;
    list.appendChild(li);
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}
