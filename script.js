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

  briefForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!briefForm.reportValidity()) {
      formResult.textContent = "Заполните обязательные поля и подтвердите согласие на обработку данных.";
      return;
    }

    const formData = new FormData(briefForm);
    const service = briefForm.querySelector("#project-type");
    const serviceValue = service.value === "unsure" ? "other" : service.value;
    const buttonLabel = submitButton.textContent;
    submitButton.disabled = true;
    formResult.textContent = "Проверяем доступность приёма заявок…";

    try {
      const csrfResponse = await fetch("/api/csrf", { credentials: "same-origin" });
      if (!csrfResponse.ok) {
        throw new Error("Сервис приёма заявок сейчас недоступен.");
      }
      const { csrf_token: csrfToken } = await csrfResponse.json();
      if (!csrfToken) {
        throw new Error("Не удалось подготовить защищённый запрос.");
      }

      const consentResponse = await fetch("/api/consents", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          processing_consent: true,
          marketing_consent: formData.get("marketing-consent") === "on",
          idempotency_key: crypto.randomUUID(),
        }),
      });
      const consentResult = await consentResponse.json();
      if (!consentResponse.ok) {
        throw new Error(consentResult.detail || "Согласие не удалось зафиксировать.");
      }

      const contactResponse = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          idempotency_key: crypto.randomUUID(),
          contact_name: String(formData.get("contact-name")).trim(),
          contact_type: String(formData.get("contact-type")),
          contact_value: String(formData.get("contact-value")).trim(),
          service: serviceValue,
          description: String(formData.get("project-description")).trim(),
        }),
      });
      const contactResult = await contactResponse.json();
      if (!contactResponse.ok) {
        throw new Error(contactResult.detail || "Не удалось отправить заявку.");
      }

      formResult.textContent = "Заявка принята в CRM. Автоматические сообщения не отправляются.";
      briefForm.reset();
      updateContactField();
    } catch (error) {
      formResult.textContent =
        error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте позже.";
    } finally {
      submitButton.disabled = false;
      if (buttonLabel) submitButton.textContent = buttonLabel;
    }
  });
}
