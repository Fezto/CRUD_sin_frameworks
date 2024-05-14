export function renderButton({ parent, name, id, on_click }) {
  let button = document.createElement("button");
  button.textContent = name;
  button.id = id;
  button.onclick = on_click;
  parent.appendChild(button);
}
