
function checkFirstName(input) {
    if (input.length < 2) throw "First name must be atleast 2 characters";
    const regex = /[^A-z\s'"]/g;
    if (regex.test(input) || input.includes("_"))
      throw "First name must not contain special characters";
    let count = 0;
    for (char of input) if (char === "'") count++;
    if (count > 1) throw "First name cannot have more than one apostrophe";
  }
  
  function checkLastName(input) {
    if (input.length < 2) throw "Last name must be atleast 2 characters";
  
    const regex = /[^A-z\s'\-"]/g;
    if (regex.test(input) || input.includes("_"))
      throw "Last name must not contain special characters";
    let countApostrophe = 0;
    for (char of input) if (char === "'") countApostrophe++;
    if (countApostrophe > 1)
      throw "Last name cannot have more than one apostrophe";
    let countHyphen = 0;
    for (char of input) if (char === "-") countHyphen++;
    if (countHyphen > 1) throw "Last name cannot have more than one countHyphen";
  }
  

  function checkPhone(phone) {
    if(phone === "N/A" || phone.length === 0 || !phone) return "N/A";
    const regex = /[^0-9]/;
    phone = phone.trim();
    if (regex.test(phone)) throw "Phone number must contain only integer number";
    if (phone.length !== 10) throw "Phone number must have 10 digits";
    return phone;
  }
  function checkPassword(strVal) {
    if (!strVal) return;
    const oneUpper = /[A-Z]/;
    const oneLower = /[a-z]/;
    const oneNumber = /[0-9]/;
    const specialChar = /[^\w\s]/;
    if (typeof strVal !== "string") throw "Password must be a string!";
    strVal = strVal.trim();
    if (strVal.length === 0) throw "Password cannot be an empty string or string with just spaces";
    if (strVal.length < 8) throw "Password must at least 8 characters long";
    if (strVal.includes(" ")) throw "Password must not contain space";
    if (!oneUpper.test(strVal)) throw "Password must contain one upper case";
    if (!oneLower.test(strVal)) throw "Password must contain one lower case letter ";
    if (!oneNumber.test(strVal)) throw "Password must contain one number";
    if (!specialChar.test(strVal) && !strVal.includes("_")) throw "Password must contain one special character";
    return strVal;
  }

const staticForm = document.getElementById("edit-profile-form");

if (staticForm) {
  const firstNameInput = document.getElementById("firstNameInput");
  const lastNameInput = document.getElementById("lastNameInput");
  const phoneNumberInput = document.getElementById("phoneInput");
  const passwordInput = document.getElementById("passwordInput");

  const errorContainer = document.getElementById("error-container");
  const errorTextElem = document.getElementsByClassName("text-goes-here")[0];

  staticForm.addEventListener("submit", (event) => {
    console.log("Submit")
    try {
      errorContainer.classList.add("hidden");

      const firstNameValue = firstNameInput.value;
      const lastNameValue = lastNameInput.value;
      const phoneNumberInputValue = phoneNumberInput.value;
      const passwordInputValue = passwordInput.value;

      const validatedFirstName = checkFirstName(firstNameValue);
      const validatedLastName = checkLastName(lastNameValue);
      const validatedPhone = checkPhone(phoneNumberInputValue);
      const validatedPassword = checkPassword(passwordInputValue);
      if (
        validatedFirstName &&
        validatedLastName &&
        validatedPhone &&
        validatedPassword
      ) {
        errorContainer.style.display = "none";
      }
    } catch (e) {
      event.preventDefault();
      errorTextElem.textContent = "Error: " + e;
      errorContainer.style.display = "block";
    }
  });
}