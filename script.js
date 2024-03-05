function buttonClick() {

    const isErrorYear = handleErrors("yearInput", "yearHeader", "yearError");
    const isErrorMonth = handleErrors("monthInput", "monthHeader", "monthError");
    const isErrorDay = handleErrors("dayInput", "dayHeader", "dayError");

    if (isErrorYear || isErrorMonth || isErrorDay) {
        return; 
    }

    const yearValue = document.getElementById("yearInput").value;
    const monthValue = document.getElementById("monthInput").value - 1;
    const dayValue = document.getElementById("dayInput").value;

    const date = Date.now() - new Date(yearValue, monthValue, dayValue).getTime();
    let seconds = date / 1000;

    const daysToMonths = 30.417;

    let days = seconds / (60 * 60 * 24);

    console.log(days);
    const years = Math.floor(days / 365);
    days = days - years * 365; 
    const months = Math.floor(days / daysToMonths);
    days = Math.floor(days - months * daysToMonths);

    document.getElementById("yearOutput").innerHTML = years < 10 ? "0" + years : years; 
    document.getElementById("monthOutput").innerHTML = months < 10 ? "0" + months : months;
    document.getElementById("dayOutput").innerHTML = days < 10 ? "0" + days : days;
}

function removeError(headerId, errorTextId) {

    let errorHeader = document.getElementById(headerId);

    if (errorHeader.classList.contains("error")) {
        errorHeader.classList.remove("error");
    }

    let errorText = document.getElementById(errorTextId);

    if (errorText.classList.contains("errorShown")) {
        errorText.classList.remove("errorShown");
        errorText.classList.add("errorHidden");
    }
}

function handleErrors(inputId, headerId, errorTextId) {

    let input = document.getElementById(inputId);
    const errorText = document.getElementById(errorTextId);

    //Empty Error. 
    if (input.value.length == 0) {

        addError(headerId);
        addError(errorTextId);
        errorText.innerHTML = "This field is required"
        return true; 
    }

    const value = Number(input.value); 


    if (inputId.includes("year") && !isValidYear(value)) {
        addError(headerId);
        addError(errorTextId);
        errorText.innerHTML = "Must be a valid year";
        return true; 
    }

    if (inputId.includes("month") && !isValidMonth(value)) {
        addError(headerId);
        addError(errorTextId);
        errorText.innerHTML = "Must be a valid month";
        return true; 
    }

    if (inputId.includes("day") && !isValidDay(value)) {
        addError(headerId);
        addError(errorTextId);
        errorText.innerHTML = "Must be a valid day";
        return true; 
    }

    return false; 
}

function addError(id) {
    let element = document.getElementById(id);
    if (!element.classList.contains("error")) {
        element.classList.add("error");
    }

    //Handling P elements. 
    if (element.classList.contains("errorHidden")) {
        element.classList.remove("errorHidden");
        element.classList.add("errorShown");
    }
}

function isValidYear(year) {

    const yearNow = new Date().getFullYear();
    console.log(yearNow);
    console.log(typeof yearNow);
    console.log(year);
    console.log(typeof year);

    return year < yearNow; 
}

function isValidMonth(month) {
    return month > 0 && month < 13;
}

function isValidDay(day) {
    return day > 0 && day < 32; 
}

const button = document.getElementById("calculate");
button.addEventListener("click", buttonClick);

const yearInput = document.getElementById("yearInput");
const yearClick = () => removeError("yearHeader", "yearError");
yearInput.addEventListener("click", yearClick);

const monthInput = document.getElementById("monthInput");
const monthClick = () => removeError("monthHeader", "monthError");
monthInput.addEventListener("click", monthClick);

const dayInput = document.getElementById("dayInput");
const dayClick = () => removeError("dayHeader", "dayError");
dayInput.addEventListener("click", dayClick);