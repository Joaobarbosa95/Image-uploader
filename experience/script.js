const div = document.querySelector("div");

let data;

div.addEventListener("dragstart", (e) => {});

div.addEventListener("dragover", (e) => {
  e.preventDefault();
});

div.addEventListener("dragenter", (e) => {
  //
});
div.addEventListener("dragover", (e) => {
  //   console.log(data);
});
div.addEventListener("ondrop", (e) => {
  e.preventDefault();
  const d = e.dataTransfer.items;
  //   console.log("1", d);
  //   document.createElement("img").appendChild("div");
});

div.addEventListener("drop", async (e) => {
  e.preventDefault();
  //   console.log(e);

  data = e.dataTransfer.files[0];
  //   console.log(data);

  // read file
  const reader = new FileReader();
  reader.onload = function (event) {
    console.log(event);
    // img element
    const img = document.createElement("img");
    img.files = data;
    img.classList.add("box");
    div.appendChild(img);

    img.setAttribute("src", event.target.result);
  };

  reader.readAsDataURL(data);
});
