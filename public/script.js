const box = document.querySelector(".box");
const button = document.querySelector("#button");
const flexContainer = document.querySelector(".flex_container");
const container = document.querySelector(".container");

button.addEventListener("click", (e) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.addEventListener("change", (e) => {
    const img = e.target.files[0];
    clearView();
    addLoadingBar();
    fetchImage(img);
    renderImage(img);
  });
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

box.addEventListener("drop", async (e) => {
  e.preventDefault();

  const img = e.dataTransfer.files[0];

  clearView();
  addLoadingBar();
  fetchImage(img);
  renderImage(img);
});

// utils
function removeLoadingBar(element) {
  const load = document.querySelector(`.${element}`);
  load.parentNode.removeChild(load);
}

function addLoadingBar() {
  const html =
    "<div class='loading_box'> <p class='uploading'>Uploading...</p> <div class='loading'> <div class='load_bar'><div></div> </div>";

  container.insertAdjacentHTML("beforeend", html);
}

async function fetchImage(data) {
  const form = new FormData();
  form.append("image", data);

  await fetch("/", {
    method: "post",
    body: form,
  }).then((res) => console.log("Success"));
}

function img(result) {
  const img = document.createElement("img");
  img.files = result;
  img.classList.add("box-img");
  box.appendChild(img);
  img.setAttribute("src", result);
}

function clearView() {
  flexContainer.classList.add("hidden");
  box.innerHTML = "";
  box.classList.remove("drag-over");
}

function renderImage(data) {
  const reader = new FileReader();

  reader.onload = function (event) {
    box.classList.remove("box");
    box.classList.add("box-2");

    // img
    img(event.target.result);

    // render screen
    removeLoadingBar("loading_box");
    flexContainer.classList.remove("hidden");
  };

  reader.readAsDataURL(data);
}
