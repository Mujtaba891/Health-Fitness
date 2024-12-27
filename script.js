// Load Tips from JSON
document.addEventListener("DOMContentLoaded", loadTips);

function loadTips() {
  fetch('tips.json')
    .then(response => response.json())
    .then(data => {
      const tipsList = document.getElementById("tips-list");
      data.tips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsList.appendChild(li);
      });
    })
    .catch(err => console.error("Error loading tips:", err));
}

// BMI Calculator
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100; // convert cm to m
  const bmi = (weight / (height * height)).toFixed(2);

  let resultText = `Your BMI is ${bmi}. `;
  if (bmi < 18.5) {
    resultText += "You are underweight.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    resultText += "You are in the healthy range.";
  } else {
    resultText += "You are overweight.";
  }

  document.getElementById("bmi-result").textContent = resultText;
}