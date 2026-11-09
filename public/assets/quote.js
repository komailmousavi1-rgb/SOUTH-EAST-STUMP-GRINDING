const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const search = new URLSearchParams(window.location.search);
const campaign = new URLSearchParams();

for (const key of campaignKeys) {
  const value = search.get(key)?.trim().slice(0, 150);
  if (value) campaign.set(key, value);
}

if (campaign.size) {
  for (const link of document.querySelectorAll("[data-quote-link]")) {
    const url = new URL(link.href);
    url.search = campaign.toString();
    link.href = url.href;
  }
}

const form = document.querySelector('form[name="stump-quote"]');

if (form) {
  for (const [key, value] of campaign) form.elements.namedItem(key).value = value;

  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector("span");
  const error = form.querySelector('[role="alert"]');

  const phone = form.elements.namedItem("phone");
  phone.addEventListener("input", () => phone.setCustomValidity(""));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled) return;

    for (const name of ["name", "suburb"]) {
      const field = form.elements.namedItem(name);
      field.value = field.value.trim();
    }

    if (phone.value.replace(/\D/g, "").length < 8) {
      phone.setCustomValidity("Enter a phone number with at least 8 digits.");
    }
    if (!form.reportValidity()) return;

    const data = new URLSearchParams(new FormData(form));
    button.disabled = true;
    label.textContent = "Sending…";
    error.hidden = true;

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });
      if (!response.ok) throw new Error("Submission failed");
      window.location.assign(form.action);
    } catch {
      error.textContent = "We couldn’t send your enquiry. Your details are still here. Please try again.";
      error.hidden = false;
      button.disabled = false;
      label.textContent = "Send my enquiry";
    }
  });
}
