const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialC = ["+", "-", "*", "/", "%", "="];
let output = "";
//Function to handle calculation
const calculate = (btnValue) => {
    if(btnValue === "=" && output !== ""){ // If "=" button is pressed and output is not empty
        if (output.includes("/0")){
            output = "undefined";
        }else{
        output = eval(output.replace("%", "/100")); // Replace "%" with "/100" to handle percentage, then evaluate the expression
        }
    }else if (btnValue === "AC") { // If "AC" button is pressed, clear the output
        output = ""
    }else if (btnValue === "DEL") { // If "DEL" button is pressed, remove the last character from the output
        output = output.toString().slice(0, -1);
    }else{
        if(output === "" && specialC.includes(btnValue))  // If the output is empty and the first button pressed is an operator, do nothing
            return;
        output += btnValue;
    }
    display.value = output; // Update the display with the current output
};
// Handle click for each button
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
// Handle Keyboard
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || specialC.includes(key)) {  // This will check if key is a num or special character
        calculate(key);
    }else if (key === "Enter") {
        calculate("=");
    }else if (key === "Backspace") {
        calculate("DEL");
    }else if (key === "Escape") {
        calculate("AC")
    }
}); 