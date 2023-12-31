// injects the HTML string into the DOM
const injectHTML = (componentArray, id = "root") => {
  const root = document.getElementById(id);

  if (!root) {
    console.error(`${id} element not found.`);
    return;
  }

  root.insertAdjacentHTML(
    "beforeend",
    componentArray
      .map((component) => {
        if (typeof component === "function") return component();

        // argument passed to component
        return component[0](component[1]);
      })
      ?.join("")
  );
};

export default injectHTML;
