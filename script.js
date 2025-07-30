// Pure function to create a list item element 
const createTipElement = (tip) => { 
  const li = document.createElement("li"); 
  li.textContent = tip; 
  return li; 
}; 

// Pure function to append an element to a parent 
const appendChild = (parent) => (child) => parent.appendChild(child); 

// Higher-order function to render a list of items 
const renderList = (element, createFn, appendFn) => (items) => { 
  items.forEach(item => appendFn(createFn(item))); 
}; 

// Function to fetch and display tips 
const loadTips = () => { 
  fetch('tips.json') 
    .then(response => response.json()) 
    .then(data => { 
      const tipsList = document.getElementById("tips-list"); 
      const appendToTipsList = appendChild(tipsList); 
      const render = renderList(tipsList, createTipElement, appendToTipsList); 
      render(data.tips); 
    }) 
    .catch(err => console.error("Error loading tips:", err)); 
}; 

// Pure function to calculate BMI 
const calculateBMIValue = (weight, height) => { 
  if (height <= 0) return 0; 
  return (weight / (height * height)).toFixed(2); 
}; 

// Pure function to get BMI category 
const getBMICategory = (bmi) => { 
  if (bmi < 18.5) return "You are underweight."; 
  if (bmi <= 24.9) return "You are in the healthy range."; 
  return "You are overweight."; 
}; 

// Function with side effects to handle UI updates 
const displayBMI = () => { 
  const weight = parseFloat(document.getElementById("weight").value); 
  const height = parseFloat(document.getElementById("height").value) / 100; // convert cm to m 
  const resultElement = document.getElementById("bmi-result"); 

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) { 
    resultElement.textContent = "Please enter valid weight and height."; 
    return; 
  } 

  const bmi = calculateBMIValue(weight, height); 
  const category = getBMICategory(bmi); 
  resultElement.textContent = `Your BMI is ${bmi}. ${category}`; 
}; 

// Event Listeners 
document.addEventListener("DOMContentLoaded", loadTips); 
document.getElementById("calculate-btn").addEventListener("click", displayBMI);