//a little cute thing I made to update the all rights reserved section cause im lazy updating the year
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
});

//smoothening
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

//form submittion message
function submitForm(event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent.");
  return false;
}

