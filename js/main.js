(function () {
  var openButtons = document.querySelectorAll("[data-modal-open]");
  var modal = document.getElementById("order-modal");
  var form = document.getElementById("order-form");

  if (!modal) {
    return;
  }

  var overlay = modal.querySelector(".modal__overlay");
  var closeButtons = modal.querySelectorAll("[data-modal-close]");

  function openModal() {
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    var firstInput = modal.querySelector("input, select, textarea");
    if (firstInput) {
      firstInput.focus();
    }
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameInput = form.querySelector("#order-name");
    var phoneInput = form.querySelector("#order-phone");
    var commentInput = form.querySelector("#order-comment");
    var isValid = true;

    function setInvalid(input, invalid) {
      var group = input.closest(".form__group");
      if (!group) {
        return;
      }
      if (invalid) {
        group.classList.add("form__group--invalid");
        isValid = false;
      } else {
        group.classList.remove("form__group--invalid");
      }
    }

    var nameValue = nameInput.value.trim();
    setInvalid(nameInput, nameValue.length < 2);

    var phoneValue = phoneInput.value.trim();
    var phoneOk = /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(phoneValue);
    setInvalid(phoneInput, !phoneOk);

    if (commentInput) {
      setInvalid(commentInput, false);
    }

    if (!isValid) {
      return;
    }

    form.reset();
    closeModal();
    alert("Заявка принята. Мы перезвоним для подтверждения.");
  });
})();
