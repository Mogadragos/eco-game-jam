function navigate(destination) {
  const screens = document.getElementsByClassName("screen");

  for (let screen of screens) {
    screen.style.display = "none";

    if (destination == screen.id) screen.style.display = "";
  }
}

function load() {
  const btns = document.getElementsByClassName("btn");

  for (let btn of btns) {
    btn.onclick = (e) => {
      navigate(e.srcElement.getAttribute("to"));
    };
  }
}
