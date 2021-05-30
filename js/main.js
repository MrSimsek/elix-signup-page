const inputs = document.querySelectorAll("input");

const nameField = document.getElementById("name"),
  emailField = document.getElementById("email"),
  passwordField = document.getElementById("password"),
  passwordConfirmField = document.getElementById("confirm-password");
privacyAgreementCheckbox = document.getElementById("privacy-agreement");

const toggleMenuButton = document.getElementById("toggle-menu");

const signupForm = document.forms["signup-form"].elements;
const signupFormSubmit = document.getElementById("signup-form__submit");

// when submit button clicked
signupFormSubmit.addEventListener("click", function (event) {
  // don't redirect to an endpoint
  event.preventDefault();

  // loop through form elements
  for (let index = 0; index < signupForm.length; index++) {
    // if input not checkbox and button but empty
    if (
      signupForm[index].type !== "checkbox" &&
      signupForm[index].type !== "button" &&
      signupForm[index].value === ""
    ) {
      // then add red border to it
      addRedBorder(signupForm[index]);
      addRedText(signupForm[index]);

      // if there is icon, remove it
      if (signupForm[index].parentNode.querySelector("i")) {
        removeNode(signupForm[index], "i");
      }

      // add error icon
      addErrorIcon(signupForm[index]);
    }

    // if input not checkbox and button and not empty
    if (
      signupForm[index].type !== "checkbox" &&
      signupForm[index].type !== "button" &&
      signupForm[index].value !== ""
    ) {
      removeRedBorder(signupForm[index]);
      removeRedText(signupForm[index]);

      // if there is icon, remove it
      if (signupForm[index].parentNode.querySelector("i")) {
        removeNode(signupForm[index], "i");
      }

      // add check icon
      addSuccessIcon(signupForm[index]);
    }

    // if input is checkbox
    if (signupForm[index].id === "privacy-agreement") {
      //if checked
      if (!signupForm[index].checked) {
        // add text red
        signupForm[index].parentNode
          .querySelectorAll("span")[1]
          .classList.add("text-red-500");
      } else {
        // remove red text
        signupForm[index].parentNode
          .querySelectorAll("span")[1]
          .classList.remove("text-red-500");
      }
    }
  }

  // if all necessary inputs field, show success message
  if (
    nameField.value &&
    emailField.value &&
    passwordField.value &&
    passwordConfirmField.value &&
    privacyAgreementCheckbox.checked
  ) {
    document.getElementById("input-fields").innerHTML =
      '<i class="block text-center text-green-500 text-5xl mt-3 py-5 fas fa-check-double"></i><p class="text-center">You are successfully signed up!</p>';
  }
});

inputs.forEach(function (input) {
  input.addEventListener("input", function () {
    // ıf has red border, remove it
    removeRedBorder(this);

    // if has icon, remove it
    if (this.parentNode.querySelector("i")) {
      removeNode(this, "i");
    }

    // if has email error message, remove it
    if (document.getElementById("email-not-valid")) {
      document.getElementById("email-not-valid").remove();
    }

    // if has password match error message, remove it
    if (document.getElementById("password-not-match")) {
      document.getElementById("password-not-match").remove();
    }

    if (
      this.type !== "checkbox" &&
      this.type !== "button" &&
      this.value !== ""
    ) {
      addSuccessIcon(this);
    }

    if (
      this.type !== "checkbox" &&
      this.type !== "button" &&
      this.value === ""
    ) {
      addErrorIcon(this);
      addRedBorder(this);
      addRedText(this);
    }

    if (
      this.id === "email" &&
      this.value !== "" &&
      !validateEmail(this.value)
    ) {
      // if has icon, remove it
      if (this.parentNode.querySelector("i")) {
        removeNode(this, "i");
      }
      addErrorIcon(this);
      addRedBorder(this);
      addRedText(this);
      if (!document.getElementById("email-not-valid")) {
        addErrorMessage(this, "email-not-valid", "Email is not valid!");
      }
    }

    if (this.id === "confirm-password" && this.value !== passwordField.value) {
      // if has icon, remove it
      if (this.parentNode.querySelector("i")) {
        removeNode(this, "i");
      }
      addErrorIcon(this);
      addRedBorder(this);
      addRedText(this);
      if (!document.getElementById("password-not-match")) {
        addErrorMessage(this, "password-not-match", "Password must match!");
      }
    }

    if (this.id === "privacy-agreement") {
      if (!this.checked) {
        this.parentNode
          .querySelectorAll("span")[1]
          .classList.add("text-red-500");
      } else {
        this.parentNode
          .querySelectorAll("span")[1]
          .classList.remove("text-red-500");
      }
    }
  });
});

toggleMenuButton.addEventListener("click", function () {
  if (document.getElementById("menu-links").classList.contains("hidden")) {
    document.getElementById("menu-links").classList.remove("hidden");
    document.getElementById("menu-links").classList.add("block");
  } else {
    document.getElementById("menu-links").classList.remove("block");
    document.getElementById("menu-links").classList.add("hidden");
  }
});

function addRedBorder(element) {
  return element.parentNode.classList.add("border-red");
}

function removeRedBorder(element) {
  return element.parentNode.classList.remove("border-red");
}

function addRedText(element) {
  return element.parentNode
    .querySelector("label")
    .classList.add("text-red-500");
}

function removeRedText(element) {
  return element.parentNode
    .querySelector("label")
    .classList.remove("text-red-500");
}

function removeNode(element, nodeType) {
  return element.parentNode
    .querySelector(nodeType)
    .parentNode.removeChild(element.parentNode.querySelector(nodeType));
}

function addErrorIcon(element) {
  const i = document.createElement("i");
  i.classList.add(
    "absolute",
    "right-0",
    "bottom-0",
    "top-0",
    "flex",
    "items-center",
    "text-xl",
    "p-3",
    "text-red-500",
    "fas",
    "fa-times-circle"
  );
  return element.parentNode.appendChild(i);
}

function addSuccessIcon(element) {
  const i = document.createElement("i");
  i.classList.add(
    "absolute",
    "right-0",
    "bottom-0",
    "top-0",
    "flex",
    "items-center",
    "text-xl",
    "p-3",
    "text-green-500",
    "fas",
    "fa-check-circle"
  );
  return element.parentNode.appendChild(i);
}

function addErrorMessage(element, errorType, message) {
  const p = document.createElement("p");
  p.classList.add("text-red-500", "mb-2", "error-message");
  p.id = errorType;
  p.textContent = message;
  return element.parentNode.parentNode.insertBefore(p, element.parentNode);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
