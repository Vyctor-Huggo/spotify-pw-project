function togglePasswordVisibility() {
    var passwordInput = document.getElementById("passwordInput");
    var toggleButton = document.getElementById("button-addon1");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Ocultar"; 
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Mostrar";
    }
}