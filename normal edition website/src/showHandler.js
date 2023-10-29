const formWrap = document.getElementsByClassName("formwrap")[0];
const showBtn = document.getElementsByClassName("showbtn")[0];

showBtn.addEventListener("click", showHandler);

function showHandler() {
  if (formWrap.classList.contains("active")) {
    formWrap.classList.remove("active");
    showBtn.textContent = "SHOW";
  } else {
    formWrap.classList.add("active");
    showBtn.textContent = "HIDE";
  }
}
