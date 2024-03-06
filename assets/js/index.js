$(document).ready(function () {
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 1000,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });

  // Pop up
  // Reinitialize modal script
  $("#exampleModal").modal({
    show: false,
  });

  // Open modal after 5000 milliseconds (5 seconds)
  setTimeout(function () {
    $("#exampleModal").modal("show");
  }, 4000);

  // The Slideshow class.
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    nav: true,
    navText: [
      '<span class="iconify" data-icon="fluent:ios-arrow-left-24-filled"></span>',
      '<span class="iconify" data-icon="fluent:ios-arrow-right-24-filled"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // pop up slider
  $(".pop-up-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  function showError(input, message) {
    let inputParent = input.parentElement;
    inputParent.classList.add("error");
    let span = inputParent.querySelector("span");
    span.innerText = message;
  }

  function notError(input) {
    let inputParent = input.parentElement;
    inputParent.classList.remove("error");
  }

  const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // bottom form validation
  let btmForm = document.querySelector("#bottom-form");
  let btmName = document.querySelector("#bottom-form-fname");
  let btmPhone = document.querySelector("#bottom-form-phone");
  let btmEmail = document.querySelector("#bottom-form-email");
  let btmRequirements = document.querySelector("#bottom-form-requirements");

  btmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = handleBtm();

    console.log(formData);

    if (formData !== undefined) {
      $(".form-loading").show();
      fetch("https://tavya.vercel.app/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "70dda1017d7fc1afd90e019fedd4ddfb93d6ea373821d175eaf524b02ac13c65",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          $(".form-loading").hide();
          btmForm.reset();

          if (response.ok) {
            $("#statusSuccessModal").modal("show");
          } else {
            console.error("Error:", response.statusText);
            $("#statusErrorsModal").modal("show");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          $(".form-loading").hide();
          btmForm.reset();
          $("#statusErrorsModal").modal("show");
        });
    }
  });

  function handleBtm() {
    let nameValue = btmName.value;
    let phoneValue = btmPhone.value;
    let emailValue = btmEmail.value;
    let requirementsValue = btmRequirements.value;

    if (nameValue === "") {
      return showError(btmName, "FullName is required");
    } else if (!fullNameRegex.test(nameValue)) {
      return showError(btmName, "Enter valid Name");
    } else {
      notError(btmName);
    }

    if (phoneValue === "") {
      return showError(btmPhone, "value is required");
    } else if (isNaN(phoneValue)) {
      return showError(btmPhone, "Enter Only digit");
    } else if (phoneValue.length !== 10) {
      return showError(btmPhone, "Enter only ten digit number");
    } else {
      notError(btmPhone);
    }

    if (emailValue === "") {
      return showError(btmEmail, "Enter valid Value");
    } else if (!emailRegex.test(emailValue)) {
      return showError(emailValue, "invalid email");
    } else {
      notError(btmEmail);
    }

    if (requirementsValue === "") {
      return showError(btmRequirements, "kindly select an option.");
    } else {
      notError(btmRequirements);
    }

    return {
      formName: "bottom-form",
      fullName: nameValue,
      email: emailValue,
      phone: phoneValue,
      requirement: requirementsValue,
    };
  }

  // Enquiry From

  let EnquiryFrom = document.querySelector("#enquiryForm");
  let enquiryName = document.querySelector("#enquiryName");
  let enquiryNumber = document.querySelector("#enquiryNumber");
  let enquiryEmail = document.querySelector("#enquiryEmail");
  let enquiryhamperBudget = document.querySelector("#enquiryhamperBudget");
  let giftNumber = document.querySelector("#giftNumber");
  let enquiryRequirements = document.querySelector("#enquiryRequirements");

  EnquiryFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    enquiry();
  });

  function enquiry() {
    let enquirynameValue = enquiryName.value;
    let enquirynumberValue = enquiryNumber.value;
    let enquiryemailValue = enquiryEmail.value;
    let enquirybudgetValue = enquiryhamperBudget.value;
    let enquirygiftValue = giftNumber.value;
    let enquiryRequirementsValue = enquiryRequirements.value;

    const enquiryNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const enquiryemailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (enquirynameValue === "") {
      showError(enquiryName, "Name is required");
    } else {
      notError(enquiryName);
    }
    if (enquirynumberValue === "") {
      showError(enquiryNumber, "Number is required");
    } else {
      notError(enquiryNumber);
    }
    if (enquiryemailValue === "") {
      showError(enquiryEmail, "Email id required");
    } else if (enquiryNameRegex.test(enquiryEmail)) {
      showError(enquiryEmail, "Enter a valid email");
    } else {
      notError(enquiryEmail);
    }
    if (enquirybudgetValue === "") {
      showError(enquiryhamperBudget, "Enter a budget");
    }
    if (enquirygiftValue === "") {
      showError(enquiryhamperBudget, "Enter a Hampers");
    } else {
      notError(enquiryhamperBudget);
    }
    if (enquirygiftValue === "") {
      showError(giftNumber, "Enter Gift hampers");
    } else {
      notError(giftNumber);
    }
    if (enquiryRequirementsValue === "") {
      showError(enquiryRequirements, "Enter a requirements");
    } else {
      notError(enquiryRequirements);
    }
  }

  // leads form

  let leadsForm = document.querySelector("#magazineForm");
  let leadsName = document.querySelector("#leadsname");
  let leadsNumber = document.querySelector("#leadsnumber");
  let leadsEmail = document.querySelector("#leadsemail");

  leadsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    leadshandle();
  });

  function leadshandle() {
    let leadnameValue = leadsName.value;
    let leadsnumberValue = leadsNumber.value;
    let leademailValue = leadsEmail.value;

    if (leadnameValue === "") {
      showError(leadsName, "Name is required");
    } else if (!fullNameRegex.test(leadsName)) {
      notError(leadsName, "Enter valid Name");
    } else {
      notError(leadsName);
    }
    if (leadsnumberValue === "") {
      showError(leadsNumber, "Number is required");
    } else {
      notError(leadsNumber);
    }
    if (leademailValue === "") {
      showError(leadsEmail, "Email id required");
    } else if (emailRegex.test(leadsEmail)) {
      showError(leadsEmail, "Enter a valid email");
    } else {
      notError(leadsEmail);
    }
  }

  // pop form

  let popForm = document.querySelector("#popform");
  let popName = document.querySelector("#popname");
  let popNumber = document.querySelector("#popnumber");

  popForm.addEventListener("submit", (e) => {
    e.preventDefault();
    pophandle();
  });

  function pophandle() {
    let popupnameValue = popName.value;
    let popupnumberValue = popNumber.value;

    if (popupnameValue === "") {
      showError(popName, "Name is required");
    } else if (!fullNameRegex.test(popName)) {
      notError(popName, "Enter valid Name");
    } else {
      notError(popName);
    }
    if (popupnumberValue === "") {
      showError(popNumber, "Number is required");
    } else {
      notError(popNumber);
    }
  }
});

// change color

function myFunction() {
  document.getElementById("changeColor").style.background = "red";
}
