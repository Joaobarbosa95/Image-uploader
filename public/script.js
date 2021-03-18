const box = document.querySelector(".box");
const button = document.querySelector("#button");
const flexContainer = document.querySelector(".flex_container");
const container = document.querySelector(".container");

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

  flexContainer.classList.add("hidden");

  const html =
    "<div class='loading_box'> <p class='uploading'>Uploading...</p> <div class='loading'> <div class='load_bar'><div></div> </div>";

  container.insertAdjacentHTML("beforeend", html);

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

    // render screen
    removeLoading("loading_box");
    flexContainer.classList.remove("hidden");
  };

  setTimeout(() => reader.readAsDataURL(data), 5000);
});

function removeLoading(element) {
  const load = document.querySelector(`.${element}`);
  load.parentNode.removeChild(load);
}
