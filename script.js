const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const briefForm = document.querySelector("#brief-form");
const formResult = document.querySelector("#form-result");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      navigation.classList.remove("is-open");
    });
  });
}

if (briefForm && formResult) {
  const contactType = briefForm.querySelector("#contact-type");
  const contactValue = briefForm.querySelector("#contact-value");
  const submitButton = briefForm.querySelector(".form-submit");
  const telegramFallback = briefForm.querySelector("#form-telegram-fallback");

  const updateContactField = () => {
    const hints = {
      telegram: { type: "text", placeholder: "@username" },
      phone: { type: "tel", placeholder: "+79991234567" },
      email: { type: "email", placeholder: "name@example.com" },
    };
    const hint = hints[contactType.value] || hints.telegram;
    contactValue.type = hint.type;
    contactValue.placeholder = hint.placeholder;
    contactValue.autocomplete = hint.type === "email" ? "email" : hint.type === "tel" ? "tel" : "off";
  };

  contactType.addEventListener("change", updateContactField);
  updateContactField();

  briefForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!briefForm.reportValidity()) {
      formResult.textContent = "Заполните обязательные поля и подтвердите подготовку сообщения в Telegram.";
      return;
    }

    const formData = new FormData(briefForm);
    const service = briefForm.querySelector("#project-type");
    const serviceValue = service.value === "unsure" ? "other" : service.value;
    const message = [
      "Заявка Digital Agency AI",
      `Имя: ${String(formData.get("contact-name")).trim()}`,
      `Связь: ${String(formData.get("contact-type"))} — ${String(formData.get("contact-value")).trim()}`,
      `Направление: ${serviceValue}`,
      `Задача: ${String(formData.get("project-description")).trim()}`,
    ].join("\n");
    const telegramUrl = new URL("https://t.me/kuzminkrsk");
    telegramUrl.searchParams.set("text", message);
    telegramFallback.href = telegramUrl.toString();
    telegramFallback.hidden = false;
    formResult.textContent =
      "Черновик готов. Проверьте текст в Telegram и нажмите «Отправить», чтобы передать заявку.";
    telegramFallback.focus();
  });
}
