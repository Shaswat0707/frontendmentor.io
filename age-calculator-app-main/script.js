const inputDay = document.getElementById("input-day");
const inputMonth = document.getElementById("input-month");
const inputYear = document.getElementById("input-year");

const outputDays = document.getElementById("days");
const outputMonths = document.getElementById("months");
const outputYears = document.getElementById("years");

const submitButton = document.querySelector("button.submit");
const monthDaysDict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function handleError(input, message) {
  let nextSibling = input.nextElementSibling;
  nextSibling.innerHTML = message;
  nextSibling.classList.remove("hide");
  nextSibling.classList.add("show");
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    let previousSibling = input.previousElementSibling;
    input.classList.add("red-border");
    previousSibling.classList.add("red-color");
  });
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 4 === 0 && year % 100 !== 0) return true;
  return false;
}

submitButton.onclick = () => {
  const day = Number(inputDay.value.trim()),
    month = Number(inputMonth.value.trim()),
    year = Number(inputYear.value.trim());

  const errorMessages = document.querySelectorAll("p.error.show"),
    inputs = document.querySelectorAll("input.red-border"),
    labels = document.querySelectorAll("label.red-color");

  let errors = false,
    isValidMonth = true,
    currentYear = new Date(Date.now()).getUTCFullYear();

  if (month > 12 || month < 1) {
    handleError(inputMonth, "Must be a valid month");
    errors = true;
    isValidMonth = false;
  }
  if (year < 0) {
    handleError(inputYear, "Must be a valid year");
    errors = true;
  }

  if (year > currentYear) {
    handleError(inputYear, "Must be in the past");
    errors = true;
  }

  if (
    isValidMonth &&
    ((month == 2 && isLeapYear(year) && day > 29) ||
      day < 0 ||
      (day > monthDaysDict[month + 1] && !isLeapYear(year)))
  ) {
    handleError(inputDay, "Must be a valid day");
    errors = true;
  }

  if (day > 31) {
    handleError(inputDay, "Must be a valid day");
    errors = true;
  }

  if (errors === false) {
    errorMessages.forEach((errorMessage) => {
      errorMessage.classList.remove("show");
      errorMessage.classList.add("hide");
    });
    inputs.forEach((input) => {
      input.classList.remove("red-border");
    });
    labels.forEach((label) => {
      label.classList.remove("red-color");
    });
    let inputString = day + " " + month + " " + inputYear.value.trim();
    let inputDate = moment(inputString, "DD MM YYYYY");
    let difference = moment.preciseDiff(inputDate, moment(), true);
    outputDays.innerHTML = difference.days;
    outputMonths.innerHTML = difference.months;
    outputYears.innerHTML = difference.years;
  } else {
    outputDays.innerHTML = "--";
    outputMonths.innerHTML = "--";
    outputYears.innerHTML = "--";
  }
};
