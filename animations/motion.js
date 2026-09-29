const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
const pointerQuery = matchMedia(
  "(hover: hover) and (pointer: fine) and (min-width: 901px)",
);
export const canAnimate = () => !motionQuery.matches && pointerQuery.matches;

export function sectionReveal() {
  if (!("IntersectionObserver" in window) || motionQuery.matches) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.add("visible");
        observer.unobserve(target);
      });
    },
    { threshold: 0.06 },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("ready");
    observer.observe(element);
  });
  motionQuery.addEventListener("change", () => {
    if (motionQuery.matches) {
      observer.disconnect();
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("visible"));
    }
  });
}

export function pointerEffects() {
  const cursor = document.querySelector(".custom-cursor");
  const stage = document.querySelector(".portrait-stage");
  const hero = document.querySelector(".hero");
  let activeController;
  let frame = 0;
  function updateMode() {
    activeController?.abort();
    cancelAnimationFrame(frame);
    frame = 0;
    cursor.classList.toggle("enabled", canAnimate());
    cursor.style.opacity = "0";
    stage.style.removeProperty("--portrait-x");
    stage.style.removeProperty("--portrait-y");
    document
      .querySelectorAll(".magnetic")
      .forEach((el) => el.style.removeProperty("transform"));
    document
      .querySelectorAll(".project-visual")
      .forEach((el) => el.style.removeProperty("transform"));
    if (!canAnimate()) return;
    activeController = new AbortController();
    const { signal } = activeController;
    let x = 0,
      y = 0;
    document.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType === "touch") return;
        x = event.clientX;
        y = event.clientY;
        const target = event.target.closest(
          "[data-cursor], a, button, summary",
        );
        const label =
          target?.dataset.cursor ||
          (target?.matches('a[target="_blank"]') ? "OPEN" : target ? "GO" : "");
        cursor.classList.toggle("active", Boolean(label));
        cursor.querySelector("span").textContent = label;
        if (frame) return;
        frame = requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          cursor.style.opacity = "1";
          frame = 0;
        });
      },
      { signal, passive: true },
    );
    document.documentElement.addEventListener(
      "pointerleave",
      () => {
        cursor.style.opacity = "0";
      },
      { signal },
    );
    document.addEventListener(
      "focusin",
      () => {
        cursor.style.opacity = "0";
      },
      { signal },
    );
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType === "touch") return;
        const rect = hero.getBoundingClientRect();
        stage.style.setProperty(
          "--portrait-x",
          `${(event.clientX / rect.width - 0.5) * 12}px`,
        );
        stage.style.setProperty(
          "--portrait-y",
          `${((event.clientY - rect.top) / rect.height - 0.5) * 8}px`,
        );
      },
      { signal, passive: true },
    );
    hero.addEventListener(
      "pointerleave",
      () => {
        stage.style.setProperty("--portrait-x", "0px");
        stage.style.setProperty("--portrait-y", "0px");
      },
      { signal },
    );
    document.querySelectorAll(".magnetic").forEach((element) => {
      element.addEventListener(
        "pointermove",
        (event) => {
          const rect = element.getBoundingClientRect();
          element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.09}px, ${(event.clientY - rect.top - rect.height / 2) * 0.09}px)`;
        },
        { signal, passive: true },
      );
      element.addEventListener(
        "pointerleave",
        () => {
          element.style.transform = "";
        },
        { signal },
      );
    });
    document.querySelectorAll(".project-visual").forEach((element) => {
      element.addEventListener(
        "pointermove",
        (event) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          element.style.transform = `perspective(1200px) rotateX(${-y * 1.5}deg) rotateY(${x * 2}deg)`;
        },
        { signal, passive: true },
      );
      element.addEventListener(
        "pointerleave",
        () => {
          element.style.transform = "";
        },
        { signal },
      );
    });
  }
  motionQuery.addEventListener("change", updateMode);
  pointerQuery.addEventListener("change", updateMode);
  updateMode();
}
