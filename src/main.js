import "./styles/index.scss";

const form = document.getElementById("contact-form");
const result = document.getElementById("result");
const phone = document.getElementById("phone");
let lastPhoneValue = "";

function maskPhoneNumber(input) {
  // Remove any non-digit characters from the input
  let phoneNumber = input.value.replace(/\D/g, "");

  lastPhoneValue = input.value;

  // if first digit is 1, handle that case.
  const hasCountryCode = phoneNumber[0] === "1";
  if (hasCountryCode) {
    phoneNumber = phoneNumber.substring(1);
  }

  const prefixNumDigits = hasCountryCode ? 4 : 3;

  if (prefixNumDigits > phoneNumber.length) {
    input.value = phoneNumber;
  }

  let formattedNumber = `${hasCountryCode ? "+1 " : ""}(${phoneNumber.substring(
    0,
    3
  )}`;

  if (phoneNumber.length >= 4) {
    formattedNumber += ") " + phoneNumber.substring(3, 6);
  }

  if (phoneNumber.length >= 7) {
    formattedNumber += "-" + phoneNumber.substring(6, 10);
  }

  input.value = formattedNumber;
}

phone.addEventListener("input", function (e) {
  maskPhoneNumber(phone);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
