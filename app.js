import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {

databaseURL: "https://realtime-database-58151-default-rtdb.firebaseio.com/"

}


//Database Variables
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList");



//DOM Variables
const addBtnEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");
 



//Event Listeners
addBtnEl.addEventListener("click", function(){

let inputValue = inputFieldEl.value;
push(shoppingListInDB,inputValue);
clearInputField();

 
})

onValue(shoppingListInDB, function(snapshot){

 if (snapshot.exists()) {

  let itemArray = Object.entries(snapshot.val());

  clearShoppingList();

  for (let i = 0; i < itemArray.length; i++) {

  let currentItem = itemArray[i];

    let currentItemID = currentItem[0]
    let currentItemValue =  currentItem[1]

  appendItemToList(currentItem)

}

} else {
  shoppingList.innerHTML = "No items here"
}

})

function clearShoppingList() {
    shoppingList.innerHTML = ""
}


function clearInputField () {
  inputFieldEl.value = '';
}

function appendItemToList(item) {

  let newEl = document.createElement("li")

    let itemID = item[0]
    let itemValue = item[1]

  newEl.textContent = itemValue

  newEl.addEventListener("dblclick", function(){


     let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

    remove(exactLocationOfItemInDB);


  })

  shoppingList.append(newEl)
}