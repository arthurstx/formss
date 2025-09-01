//DOM elements
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputGit = document.getElementById("github");
const forms = document.getElementById("forms");
const fileInput = document.getElementById("file-upload");
const uploadBox = document.querySelector(".upload-box");

//original placeHolder
const originalPlaceholderName = inputName.getAttribute("placeholder");
const originalPlaceholderEmail = inputEmail.getAttribute("placeholder");

//Validação de nome
function inputNameIsValid() {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return regex.test(inputName.value) && inputName.value.length < 30;
}

//Validação de email
function inputEmailIsValid() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(inputEmail.value);
}

//Aplica estilo de erro e placeholder
function handleValidation(input, isValid, message, originalPlaceholder) {
  if (!isValid) {
    input.classList.add("inputs-err");
    input.value = "";
    input.setAttribute("placeholder", message);
  } else {
    input.classList.remove("inputs-err");
    input.setAttribute("placeholder", originalPlaceholder);
  }
}

//validacao GitHub
function gitHubValidation() {
  if (!inputGit.value.startsWith("@")) {
    inputGit.value = "@" + inputGit.value;
  }
}

//Evita caracteres invalidos no nome
inputName.oninput = () => {
  const isNotACharacter = /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g;
  inputName.value = inputName.value.replace(isNotACharacter, "");
};

//variavel global para armazenar imagem
let uploadedImage = "";

//Upload de imagem
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 500 * 1024) {
      alert("The image must be a maximum of 500KB");
      fileInput.value = "";
      uploadedImage = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = e.target.result;
      uploadBox.innerHTML = `<img src="${uploadedImage}" alt="preview" style="width:150px; border-radius:10px;" />`;
    };
    reader.readAsDataURL(file);
  }
});

//Submit do form
forms.onsubmit = (event) => {
  event.preventDefault();

  gitHubValidation();

  const verified = inputNameIsValid() && inputEmailIsValid();

  //Aplica validacoes
  handleValidation(
    inputName,
    inputNameIsValid(),
    "Enter a name under 30 characters.",
    originalPlaceholderName
  );

  handleValidation(
    inputEmail,
    inputEmailIsValid(),
    "Write a validated email",
    originalPlaceholderEmail
  );

  if (!uploadedImage) {
    alert("Please upload an image before submitting!");
    return;
  }

  if (verified) {
    const form = {
      id: new Date().getTime(),
      name: inputName.value.trim(),
      email: inputEmail.value.trim(),
      gitHub: inputGit.value.trim(),
      image: uploadedImage,
      created_at: new Date(),
    };

    localStorage.setItem("ticket", JSON.stringify(form));
    window.location.href = "html/ticket.html";
  }
};

//verifica se n tem sobrenome

// const validName = name.trim()

//  if (validName.includes(" ")) {
//     return false;
//   }

//verifica se tem sobrenome

//  const words = validName.split(" ");

//    if (words.length < 2) {
//     return false;
//   }
