const classPasswords = {
  "1m02": "change-me-1m02",
  "2ec1": "change-me-2ec1",
  "3m03": "change-me-3m03",
  "3m14": "change-me-3m14"
};

const page = document.querySelector("[data-class-page]");

if (page) {
  const classCode = page.dataset.classCode;
  const className = page.dataset.className;
  const passwordForm = document.querySelector("[data-password-form]");
  const passwordError = document.querySelector("[data-password-error]");
  const passwordInput = passwordForm?.querySelector("input[name='password']");
  const storageKey = `english-with-mrs-dunand-${classCode}`;

  const unlockPage = () => {
    document.body.classList.add("page-unlocked");
  };

  if (sessionStorage.getItem(storageKey) === "granted") {
    unlockPage();
  } else if (passwordInput) {
    passwordInput.focus();
  }

  passwordForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (passwordInput?.value === classPasswords[classCode]) {
      sessionStorage.setItem(storageKey, "granted");
      unlockPage();
      passwordError.textContent = "";
      passwordForm.reset();
      return;
    }

    passwordError.textContent = `Incorrect password for ${className}. Please try again.`;
    passwordInput?.select();
  });
}
