let addToDoButton = document.getElementById("addToDo")
let toDoContainer = document.getElementById("toDoContainer")
let inputText = document.getElementById("inputText")
let clearToDoButton = document.getElementById("clearToDo")

addToDoButton.addEventListener("click", function() {
    let container = document.createElement("div");
    let paragraph = document.createElement("p");
    let checkbox = document.createElement("input");

    container.appendChild(paragraph);
    container.appendChild(checkbox);
    toDoContainer.appendChild(container);
    paragraph.classList.add("paragraph-styling");
    paragraph.classList.add("paragraph-container");
    checkbox.classList.add("input")

    checkbox.type = "checkbox";
    container.style.display ="flex"
    container.style.justifyContent ="center"

    paragraph.innerHTML = inputText.value;
    inputText.value= "";

    checkbox.addEventListener("click", function(){
        paragraph.style.textDecoration = checkbox.checked ? "line-through" : "none"
    })

    clearToDoButton.addEventListener("click", function(){
        paragraph.remove();
        checkbox.remove()
    })
})
