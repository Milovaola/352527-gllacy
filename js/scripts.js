document.addEventListener('DOMContentLoaded', function(e) {
  const enter = document.querySelector(".enter");
  const loginPopup = document.querySelector(".modal-login");
  const busket = document.querySelector(".busket");
  const popup = document.querySelector(".modal-busket");
  const email = loginPopup.querySelector("[name=email]");
  const form = loginPopup.querySelector("form");
  const password = loginPopup.querySelector("[name=password]");
  const feedback = document.querySelector(".feedback-form-button");
  const feedbackPopup = document.querySelector(".modal-feedback");

  const close = document.querySelector(".modal-close");

  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }
  busket.addEventListener("click", function(evt) {
    evt.preventDefault();

    if (document.querySelector('.modal-show') && !popup.classList.contains('modal-show')) {
      document.querySelector('.modal-show').classList.remove('modal-show')

      popup.classList.toggle("modal-show");
    }
    else {
      popup.classList.toggle("modal-show");
    }
  });

  enter.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (document.querySelector('.modal-show') && !loginPopup.classList.contains('modal-show')) {
      document.querySelector('.modal-show').classList.remove('modal-show')
    loginPopup.classList.toggle("modal-show");
  }
  else {
    loginPopup.classList.toggle("modal-show");
  }
    if (storage) {
      email.value = storage;
      password.focus();
    } else {
      email.focus();
    }
  });


  setEventListener(feedback, 'click', function(e) {
    e.preventDefault();
    on()
    feedbackPopup.classList.add("modal-show");
  });
  setEventListener(close, 'click', function(e) {
    e.preventDefault();
    off()
    feedbackPopup.classList.remove("modal-show");
  });


  form.addEventListener("submit", function (evt) {
    if (!email.value || !password.value) {
      evt.preventDefault();
      loginPopup.classList.remove("modal-error");
      loginPopup.offsetWidth = popup.offsetWidth;
      loginPopup.classList.add("modal-error");
      console.log("Нужно ввести эл.почту и пароль");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("email", email.value);
      }
    }
  });
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (loginPopup.classList.contains("modal-show")) {
        loginPopup.classList.remove("modal-show");
        loginPopup.classList.remove("modal-error");
      }
    }
  });
});

function getNodeByClassName(className) {
  try {
    return document.querySelector(className)
  }
  catch {
    console.log(className + 'not found on page')
  }

  return null
}

function setEventListener(node, event, callback) {
  if (!node) return

  node.addEventListener(event, callback)
}
function on() {
  document.querySelector(".overlay").style.display = "block";
}

function off() {
  document.querySelector(".overlay").style.display = "none";
}
