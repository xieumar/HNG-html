const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const modal = document.getElementById("success-modal");
const closeBtn = document.getElementById("close-modal");

[username, email, subject, message].forEach((input) => {
  input.addEventListener("input", () => validateField(input));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isValid = validateInputs();

  if (isValid) {
    form.reset();

    form.querySelectorAll(".input-control").forEach((c) => c.classList.remove("success"));

    modal.classList.add("show");
  }
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateField = (element) => {
  const value = element.value.trim();

  if (element.id === "name") {
    value === "" ? setError(element, "Name is required") : setSuccess(element);
  }

  if (element.id === "email") {
    if (value === "") setError(element, "Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      setError(element, "Enter a valid email address");
    else setSuccess(element);
  }

  if (element.id === "subject") {
    value === "" ? setError(element, "Subject is required") : setSuccess(element);
  }

  if (element.id === "message") {
    if (value === "") setError(element, "Message is required");
    else if (value.length < 10)
      setError(element, "Message must be at least 10 characters");
    else setSuccess(element);
  }
};

const validateInputs = () => {
  let isValid = true;
  [username, email, subject, message].forEach((field) => {
    validateField(field);
    const parent = field.parentElement;
    if (parent.classList.contains("error")) isValid = false;
  });
  return isValid;
};
