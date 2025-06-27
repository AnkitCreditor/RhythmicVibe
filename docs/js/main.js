let step = 0;
let userResponses = {};
let userIntent = ""; // book / attend / promote

document.getElementById('chat-icon').addEventListener('click', function () {
  const chatBox = document.getElementById('chatbotBox');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';

  if (step === 0) {
    askNextQuestion();
  }
});

function sendMessage(userTyped = null) {
  const input = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");
  const userText = userTyped || input.value.trim();

  if (userText === "") return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = userText;
  chatBody.appendChild(userMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  input.value = "";

  // Store intent & responses
  if (step === 1) {
    userIntent = userText.toLowerCase();
    userResponses.intent = userIntent;
  } else {
    switch (userIntent) {
      case "book":
        if (step === 2) userResponses.artist = userText;
        if (step === 3) userResponses.eventType = userText;
        if (step === 4) userResponses.date = userText;
        if (step === 5) userResponses.contact = userText;
        break;
      case "attend":
        if (step === 2) userResponses.genre = userText;
        if (step === 3) userResponses.location = userText;
        if (step === 4) userResponses.contact = userText;
        break;
      case "promote":
        if (step === 2) userResponses.musicType = userText;
        if (step === 3) userResponses.platform = userText;
        if (step === 4) userResponses.contact = userText;
        break;
    }
  }

  setTimeout(() => {
    askNextQuestion();
  }, 600);
}

function askNextQuestion() {
  const chatBody = document.getElementById("chatBody");
  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";

  step++;

  if (step === 1) {
    botMsg.innerHTML = `
      Hey there! 🎧 What brings you to RhythmicVibe today?<br><br>
      <button onclick="sendMessage('Book')">🎤 Book an Artist</button>
      <button onclick="sendMessage('Attend')">🎫 Attend an Event</button>
      <button onclick="sendMessage('Promote')">📢 Promote My Music</button>
    `;
  }

  // Book an artist
  if (userIntent === "book") {
    switch (step) {
      case 2:
        botMsg.textContent = "Which artist are you interested in booking?";
        break;
      case 3:
        botMsg.textContent = "What type of event is it? (Concert / Wedding / Private Party)";
        break;
      case 4:
        botMsg.textContent = "When would you like to schedule the performance?";
        break;
      case 5:
        botMsg.textContent = "Can you share your contact (email or phone)?";
        break;
      case 6:
        botMsg.innerHTML = `
          Awesome! 🎶 Here's what you've shared:<br><br>
          🎤 Artist: ${userResponses.artist}<br>
          📍 Event Type: ${userResponses.eventType}<br>
          📅 Date: ${userResponses.date}<br>
          📞 Contact: ${userResponses.contact}<br><br>
          We'll get back to you shortly!
        `;
        break;
    }
  }

  // Attend event
  if (userIntent === "attend") {
    switch (step) {
      case 2:
        botMsg.textContent = "Which genre are you into? (EDM / Rock / Hip-Hop / Classical)";
        break;
      case 3:
        botMsg.textContent = "Which city are you looking to party in?";
        break;
      case 4:
        botMsg.textContent = "Drop your email or number so we can share the hottest events!";
        break;
      case 5:
        botMsg.innerHTML = `
          Thanks! 🎉 Here's what you've told us:<br><br>
          🎶 Genre: ${userResponses.genre}<br>
          📍 City: ${userResponses.location}<br>
          📞 Contact: ${userResponses.contact}<br><br>
          We'll send event updates your way!
        `;
        break;
    }
  }

  // Promote music
  if (userIntent === "promote") {
    switch (step) {
      case 2:
        botMsg.textContent = "What type of music are you promoting? (Single / Album / Mixtape)";
        break;
      case 3:
        botMsg.textContent = "Which platforms are you targeting? (Instagram / YouTube / Spotify etc.)";
        break;
      case 4:
        botMsg.textContent = "Great! Lastly, share your contact info (email or number):";
        break;
      case 5:
        botMsg.innerHTML = `
          You're all set! 🚀 Here's a summary:<br><br>
          🎵 Type: ${userResponses.musicType}<br>
          🌐 Platforms: ${userResponses.platform}<br>
          📞 Contact: ${userResponses.contact}<br><br>
          Our promo team will reach out soon!
        `;
        break;
    }
  }

  chatBody.appendChild(botMsg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Restart bot
document.getElementById("restartBot").addEventListener("click", () => {
  const chatBody = document.getElementById("chatBody");
  chatBody.innerHTML = "";
  step = 0;
  userResponses = {};
  userIntent = "";
  askNextQuestion();
});
