const box = document.querySelector(".box");
const button = document.querySelector("#button");

button.addEventListener("click", (e) => {
  // Open file chooser
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
});

box.addEventListener("dragsenter", (e) => {
  box.classList.add("drag-over");
});

box.addEventListener("dragover", (e) => {
  e.preventDefault();
  box.classList.add("drag-over");
});

box.addEventListener("dragleave", (e) => {
  box.classList.remove("drag-over");
});

box.addEventListener("drop", (e) => {
  e.preventDefault();
  box.classList.remove("drag-over");
  const data = e.dataTransfer.files[0];
  box.innerHTML = "";

  // Loading
  const p = document.createElement("p");
  p.innerText = "LOADING";
  box.appendChild(p);

  // read img
  const reader = new FileReader();
  reader.onload = function (event) {
    box.innerHTML = "";
    box.classList.add("box-2");
    box.classList.remove("box");
    // img
    const img = document.createElement("img");
    img.files = data;
    img.classList.add("box-img");
    box.appendChild(img);
    img.setAttribute("src", event.target.result);
  };

  setTimeout(() => reader.readAsDataURL(data), 5000);
});
