import "./styles/index.scss";

const form = document.getElementById("form");
const result = document.getElementById("result");
const phone = document.getElementById("phone");
let lastPhoneValue = "";

// 502
// change to (502)
// on delete, it's now (502

function maskPhoneNumber(input) {
  // Remove any non-digit characters from the input
  let phoneNumber = input.value.replace(/\D/g, "");

  console.log("input", input.value);
  console.log("phone number", phoneNumber);
  console.log("lastPhoneValue", lastPhoneValue);
  console.log("====================================");

  // if (input.value.length < lastPhoneValue.length) {
  //   lastPhoneValue = input.value;
  //   input.value = input.value.substring(0, input.value.length - 1);
  //   return;
  // }

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

  console.log("formattedNumber", formattedNumber, phoneNumber);

  input.value = formattedNumber;
}

phone.addEventListener("input", function (e) {
  console.log("input", e.target.value);
  maskPhoneNumber(phone);
});

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const object = Object.fromEntries(formData);
//   const json = JSON.stringify(object);
//   result.innerHTML = "Please wait...";

//   fetch("https://api.web3forms.com/submit", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: json,
//   })
//     .then(async (response) => {
//       let json = await response.json();
//       if (response.status == 200) {
//         result.innerHTML = json.message;
//       } else {
//         console.log(response);
//         result.innerHTML = json.message;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       result.innerHTML = "Something went wrong!";
//     })
//     .then(function () {
//       form.reset();
//       setTimeout(() => {
//         result.style.display = "none";
//       }, 3000);
//     });
// });
