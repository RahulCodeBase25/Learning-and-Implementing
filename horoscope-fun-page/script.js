// script.js

// Horoscope data
const horoscopeData = {
    aries: "Today is a great day to embrace new challenges.",
    taurus: "Take it slow and enjoy the little things in life.",
    gemini: "Communication will open doors for you today.",
    cancer: "Your emotions might run high—stay calm!",
    leo: "Your leadership qualities will shine brightly.",
    virgo: "A perfect day to focus on self-care.",
    libra: "Seek balance in all things; harmony is key.",
    scorpio: "You have the power to transform any situation.",
    sagittarius: "Adventure calls! Explore new opportunities.",
    capricorn: "Your hard work will pay off, so stay focused.",
    aquarius: "Innovation is your friend today—think outside the box.",
    pisces: "Let your creativity flow and inspire others."
  };
  
  // Sound effect
  const mysticSound = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

  
  // Get elements
  const horoscopeButton = document.getElementById("get-horoscope");
  const resultDiv = document.getElementById("horoscope-result");
  
  // Event listener for the button
  horoscopeButton.addEventListener("click", () => {
    const sign = document.getElementById("zodiac-sign").value;
  
    // If no sign is selected, show a warning message
    if (!sign) {
      resultDiv.textContent = "Please select a zodiac sign!";
      resultDiv.classList.add("show");
      return;
    }
  
    // Play sound and display horoscope
    mysticSound.play();
    resultDiv.textContent = horoscopeData[sign] || "Horoscope not available!";
    resultDiv.classList.add("show");
  
    // Reset animation after a short delay
    setTimeout(() => resultDiv.classList.remove("show"), 4500);
  });
  