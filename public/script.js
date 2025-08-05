const socket = io();
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const allMessages = document.getElementById("messages");

// Generate random user ID for current user
const userId = Math.floor(Math.random() * 1000000);

// Receive messages
socket.on("message", (data) => {
  const { message, sender } = data;

  const p = document.createElement("p");
  p.innerText = message;

  // Check if the message was sent by this user
  if (sender === userId) {
    p.classList.add("sent");
  } else {
    p.classList.add("received");
  }

  allMessages.appendChild(p);
  allMessages.scrollTop = allMessages.scrollHeight; // Auto-scroll
});

// Send message on button click
sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit("user-message", { message, sender: userId });
    messageInput.value = "";
    messageInput.focus();
  }
});

// Send message on Enter key
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
