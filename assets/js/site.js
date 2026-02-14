const updateEl = document.querySelector("[data-updated]");
if (updateEl) {
  const now = new Date();
  updateEl.textContent = now.toISOString().split("T")[0];
}
