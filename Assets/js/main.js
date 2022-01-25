const botaoAdiciona = document.querySelector("#adicionar");
const campoInserir = document.querySelector("#inserir");
const ulList = document.querySelector(".ul-list");


function criaTarefas(textoInput) {
  const li = document.createElement("li");
  li.innerHTML = textoInput;
  ulList.appendChild(li);
  criarBotaoApaga(li);
}

function criarBotaoApaga(li) {
  const botaoApaga = document.createElement("button");
  botaoApaga.innerText = "Apagar";
  botaoApaga.setAttribute("class", "apagar");
  li.appendChild(botaoApaga);
}

campoInserir.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!campoInserir.value) {
      return alert("Entre com uma tarefa");
    }
    criaTarefas(campoInserir.value);
    salvarTarefas();
    campoInserir.value = "";
    e.preventDefault();
  }
  campoInserir.focus();
});

botaoAdiciona.addEventListener("click", () => {
  if (!campoInserir.value) {
    return alert("Entre com uma tarefa");
  }
  criaTarefas(campoInserir.value);
  salvarTarefas()
  campoInserir.value = "";
  campoInserir.focus();
});

document.addEventListener("click", (e) => {
  const elemento = e.target;

  if (elemento.classList.contains("apagar")) {
    elemento.parentElement.remove();
  }
});

function salvarTarefas (){
    const valoresLi = ulList.querySelectorAll('li')
    const arrayValores = []


    for (let valores of valoresLi) {
        const valoresEditados = valores.innerText.replace('Apagar',' ').trim()
        arrayValores.push(valoresEditados)
    }

    console.log (arrayValores)
    const valoresJSON = JSON.stringify(arrayValores)
    localStorage.setItem('tarefas', valoresJSON)

}

function recuperaTarefasSalvas () {
   const tarefas = localStorage.getItem('tarefas')
   const arrayRecuperado = JSON.parse (tarefas)

   for (let valoresArray of arrayRecuperado){
        criaTarefas(valoresArray)
   }
}

recuperaTarefasSalvas ()
