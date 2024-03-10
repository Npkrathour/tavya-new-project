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

  // Open modal after 5000 milliseconds (5 seconds)
  setTimeout(function () {
    $("#popModal").modal("show");
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

  function downloadPDF() {
    const pdfFilePath = "assets/images/tavya-wedding-favors.pdf";
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfFilePath;
    downloadLink.download = "tavya-ceramics.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

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

  function sendMailer(form, formData) {
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
        form.reset();

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
        form.reset();
        $("#statusErrorsModal").modal("show");
      });
  }

  // bottom form validation
  let btmForm = document.querySelector("#bottom-form");
  let btmName = document.querySelector("#bottom-form-fname");
  let btmPhone = document.querySelector("#bottom-form-phone");
  let btmEmail = document.querySelector("#bottom-form-email");
  let btmRequirements = document.querySelector("#bottom-form-requirements");

  btmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = handleBtm();

    if (formData !== undefined) {
      sendMailer(btmForm, formData);
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
    const formData = enquiry();
    console.log(formData);
    if (formData !== undefined) {
      sendMailer(EnquiryFrom, formData);
      $("#enquiryModal").modal("hide");
    }
  });

  function enquiry() {
    let enquirynameValue = enquiryName.value;
    let enquirynumberValue = enquiryNumber.value;
    let enquiryemailValue = enquiryEmail.value;
    let enquirybudgetValue = enquiryhamperBudget.value;
    let enquirygiftValue = giftNumber.value;
    let enquiryRequirementsValue = enquiryRequirements.value;

    if (enquirynameValue === "") {
      return showError(enquiryName, "Name is required");
    } else {
      notError(enquiryName);
    }
    if (enquirynumberValue === "") {
      return showError(enquiryNumber, "Number is required");
    } else {
      notError(enquiryNumber);
    }
    if (enquiryemailValue === "") {
      return showError(enquiryEmail, "Email id required");
    } else if (emailRegex.test(enquiryEmail)) {
      return showError(enquiryEmail, "Enter a valid email");
    } else {
      notError(enquiryEmail);
    }

    if (enquirybudgetValue === "") {
      return showError(enquiryhamperBudget, "Enter a budget");
    } else {
      notError(enquiryhamperBudget);
    }

    if (enquirygiftValue === "") {
      return showError(giftNumber, "Enter Gift hampers");
    } else {
      notError(giftNumber);
    }

    if (enquiryRequirementsValue === "") {
      return showError(enquiryRequirements, "Enter a requirements");
    } else {
      notError(enquiryRequirements);
    }

    return {
      formName: "enquiry-form",
      fullName: enquirynameValue,
      email: enquiryemailValue,
      phone: enquirynumberValue,
      hamperBudget: enquirybudgetValue,
      noOfHampers: enquirygiftValue,
      requirement: enquiryRequirementsValue,
    };
  }

  // leads form

  let leadsForm = document.querySelector("#magazineForm");
  let leadsName = document.querySelector("#leadsname");
  let leadsNumber = document.querySelector("#leadsnumber");
  let leadsEmail = document.querySelector("#leadsemail");

  leadsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = leadsHandler();
    if (formData !== undefined) {
      sendMailer(leadsForm, formData);
      $("#magzineModal").modal("hide");
      downloadPDF();
    }
  });

  function leadsHandler() {
    let leadnameValue = leadsName.value;
    let leadsnumberValue = leadsNumber.value;
    let leademailValue = leadsEmail.value;

    if (leadnameValue === "") {
      return showError(leadsName, "Name is required");
    } else if (!fullNameRegex.test(leadnameValue)) {
      return showError(leadsName, "Enter valid Name");
    } else {
      notError(leadsName);
    }
    if (leadsnumberValue === "") {
      return showError(leadsNumber, "Number is required");
    } else {
      notError(leadsNumber);
    }
    if (leademailValue === "") {
      return showError(leadsEmail, "Email id required");
    } else if (emailRegex.test(leadsEmail)) {
      return showError(leadsEmail, "Enter a valid email");
    } else {
      notError(leadsEmail);
    }

    return {
      formName: "magzine-form",
      fullName: leadnameValue,
      email: leademailValue,
      phone: leadsnumberValue,
    };
  }

  // pop form

  let popForm = document.querySelector("#popform");
  let popName = document.querySelector("#popname");
  let popEmail = document.querySelector("#popemail");
  let popNumber = document.querySelector("#popnumber");
  // Get all radio buttons
  var radioButtons = document.getElementsByName("pop-requirements");

  popForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = pophandle();
    if (formData !== undefined) {
      sendMailer(popForm, formData);
      $("#popModal").modal("hide");
    }
  });

  function pophandle() {
    let popupnameValue = popName.value;
    let popupemailValue = popEmail.value;
    let popupnumberValue = popNumber.value;

    var selectedRadioButton = $("input[name=pop-requirements]:checked").val(); //get value from radio button

    if (!selectedRadioButton) {
      return showError(radioButtons[0], "Please select an option");
    } else {
      notError(radioButtons[0]);
    }

    if (popupnameValue === "") {
      return showError(popName, "Name is required");
    } else if (!fullNameRegex.test(popupnameValue)) {
      return showError(popName, "Enter valid Name");
    } else {
      notError(popName);
    }

    if (popupemailValue === "") {
      return showError(popEmail, "Email is required");
    } else if (!emailRegex.test(popupemailValue)) {
      return showError(popEmail, "Enter valid Email");
    } else {
      notError(popEmail);
    }

    if (popupnumberValue === "") {
      return showError(popNumber, "Number is required");
    } else {
      notError(popNumber);
    }

    return {
      formName: "pop-form",
      fullName: popupnameValue,
      email: popupemailValue,
      phone: popupnumberValue,
      requirement: selectedRadioButton,
    };
  }
});
