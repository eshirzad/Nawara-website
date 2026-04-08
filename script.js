const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal-section");
const avgValueInput = document.getElementById("avg-value");
const missedCallsInput = document.getElementById("missed-calls");
const businessDaysInput = document.getElementById("business-days");
const dailyLossOutput = document.getElementById("daily-loss");
const monthlyLossOutput = document.getElementById("monthly-loss");

const formatCurrency = (value) => `$${value.toLocaleString()}`;

const calculateLoss = () => {
  if (!avgValueInput || !missedCallsInput || !businessDaysInput) {
    return;
  }

  const avgValue = Number(avgValueInput.value) || 0;
  const missedCalls = Number(missedCallsInput.value) || 0;
  const businessDays = Number(businessDaysInput.value) || 0;
  const dailyLoss = avgValue * missedCalls;
  const monthlyLoss = dailyLoss * businessDays;

  if (dailyLossOutput) {
    dailyLossOutput.textContent = formatCurrency(dailyLoss);
  }

  if (monthlyLossOutput) {
    monthlyLossOutput.textContent = formatCurrency(monthlyLoss);
  }
};

[avgValueInput, missedCallsInput, businessDaysInput].forEach((input) => {
  input?.addEventListener("input", calculateLoss);
});

calculateLoss();

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}
