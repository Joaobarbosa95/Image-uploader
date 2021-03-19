const file = document.querySelector(".file");

file.addEventListener("dragsenter", (e) => {});

file.addEventListener("dragover", (e) => {
  e.preventDefault();
});

file.addEventListener("dragleave", (e) => {});

file.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
  const img = e.dataTransfer.files[0];

  const input = document
    .querySelector(".input")
    .addEventListener("click", (e) => {
      // console.log(file.files[0]);
      const form = new FormData();
      form.append("image", img);
      fetch("http://localhost:1000/", {
        method: "post",
        body: form,
      });
      setTimeout(() => {
        file.setAttribute("onclick", "location.href='/pringles'");
        file.click();
      }, 5000);
    });
});
