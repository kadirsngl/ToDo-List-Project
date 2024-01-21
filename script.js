//! HTML'de ID verdiğim öğeleri bu komut ile JS'e çağırıp bir değişkene atıyorum.
let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputText = document.getElementById("inputText");
let clearToDoButton = document.getElementById("clearToDo");


//! Butonuma bir olay dinleyicisi çağırıp, "tıklandığında" bir fonksiyonun devreye girmesini sağlıyorum.
addToDoButton.addEventListener("click", function () {
    const todoText = inputText.value.trim(); //! trim komutuyla input verilerimde ki boşlukları temizliyorum.
    
    if (todoText !== "") { //! if metoduyla, boş girilen input verilerini engelliyorum."Eğer input boş değilse" devam eder.

        let todoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : []; 
        //! localStorage'dan "todoData" adlı anahtarla kaydedilmiş veriyi çek, eğer veri yoksa boş bir dizi oluştur. Eğer boş bir dizi oluşturmasaydık değer "null" dönerdi ve JSON.parse komutuna null değeri verirsek hata alırdık. 

        const newTodo = {
            title: todoText,
            createdAt: new Date().toLocaleString(),
            updateAt: new Date().toLocaleString()
        };

        todoData.push(newTodo); //! Yeni girilen todo verilerini, "todoData" dizinine eklliyorum.

        localStorage.setItem("todoData", JSON.stringify(todoData)); 
        //! todoData dizisini JSON formatına çevirip localStorage'a kaydediyorum. Stringify komutu, verileri JSON string ifadesine çevirir.

    addTodoToList(newTodo); //! Yeni todoları listeye ekliyorum.
    inputText.value = ""; //! İşlemlerin sonunda inputtaki yazıyı sıfırlıyorum.
}
});

//! Safya yüklendiğinde, localStorage'a kaydedilmiş "todoData" verisini çekiyorum.
const showTodos = localStorage.getItem("todoData");
if (showTodos) { //! Eğer "todoData" verisi localStorage'da varsa
    const parsedTodos = JSON.parse(showTodos);  //! JSON formatındaki veriyi .parse ederek bir dizi elde ediyorum.
//! Her bir todo için addTodoToList fonksiyonunu çağırarak sayfaya ekliyorum.
    parsedTodos.forEach(function (yapilacaklar) { 
    addTodoToList(yapilacaklar);
});
}

//! Yeni todo'lar eklemek için kullandığım fonksiyon.
function addTodoToList(todo) { 
  let container = document.createElement("div"); //! Bu komutla yeni öğeler oluşturuyorum.
  let paragraph = document.createElement("p");
  let checkbox = document.createElement("input");

  container.appendChild(paragraph); //! AppenChild ile container içine "paragraph" değerini ekliyorum.
  container.appendChild(checkbox);
  toDoContainer.appendChild(container);
  paragraph.classList.add("paragraph-styling"); //! ClassList ile paragrapha CSS özelliklerini aktarıyorum.
  paragraph.classList.add("paragraph-container");
  checkbox.classList.add("input");

  checkbox.type = "checkbox";
  container.style.display = "flex";
  container.style.justifyContent = "center";

  paragraph.innerHTML = todo.title; //! Paragraph içerisine todoText'den gelen değerleri aktarıyorum.

  checkbox.addEventListener("click", function () { //! Checkbox'a tıklandığında metnin üzerini çiziyorum.
    paragraph.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });
}

clearToDoButton.addEventListener("click", function () { //! Clear tuşuna basılınca çalışması için fonksiyon atıyorum.
  localStorage.removeItem("todoData"); //! localStorage.removeItem komutu ile todoData verilerini siliyorum.
  toDoContainer.innerHTML = ""; //! toDoContainer içerisinde ki HTML öğelerini temizliyorum.

});