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

  return await fetch("https://image-uploader-basic.herokuapp.com/", {
    method: "post",
    body: form,
  }).then((data) => data.status);
}

function clearView() {
  flexContainer.classList.add("hidden");
  box.innerHTML = "";
  box.classList.remove("drag-over");
}

async function renderImage(data) {
  const status = await fetchImage(data);

  const reader = new FileReader();

  reader.onload = function (event) {
    const html = `<div class='flex_container_load' ><img class='icon' src='https://www.aeptc.org/Content/images/success-icon-10.png'><div class='title'>Upload Successfully!</div><div class='drag_and_drop'><div class='box-2' name='image'><img class="box-img" src='${event.target.result}'></div> </div><div class='file_chooser'><input type='text'><button id='button clipboard'>Copy Link</button></div></div>'`;

    removeLoadingBar("flex_container");
    container.insertAdjacentHTML("afterbegin", html);

    const input = document.querySelector("input");
    const title = document.querySelector(".title");
    const icon = document.querySelector(".icon");
    const b = document.querySelector(".box-2");

    if (!document.querySelector(".box-img").src.includes("image")) {
      title.textContent = "Upload Failed";
      icon.src =
        "https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/failed.png";
      b.textContent = "Insert images only";
    } else if (status === 401) {
      title.textContent = "Upload Failed";
      icon.src =
        "https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/failed.png";
      b.textContent = "Image name must be unique";
    } else {
      input.value = window.location.href + "photo-" + data.name;
    }

    document.querySelector("button").addEventListener("click", (e) => {
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand("copy");
    });

    // render screen
    removeLoadingBar("loading_box");
    flexContainer.classList.remove("hidden");
  };

  reader.readAsDataURL(data);
}
