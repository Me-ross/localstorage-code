var userInputField = $("#input-field");
var listEl = $('#list-items');

var newInput;
var userInputArray;
var listItemEl;

checkStorage();

//check storage
function checkStorage(){
  userInputArray = JSON.parse(localStorage.getItem("userInput"));
  //if nothing in local storage then save empty array
  if (!userInputArray){
    console.log('initialize array to null');
    userInputArray = [];
    console.log(userInputArray);
  }
}

//listens for the click, split if more than one word
// push to existing storage
$(".form-inline").on("click", "#submitBtn", function (event) 
  {
    event.preventDefault();
    newInput = $(this).siblings("#input-field").val();
    newInput = newInput.split(" ");
    console.log(newInput)
    userInputArray = userInputArray.concat(newInput);
    console.log(userInputArray);
    localStorage.setItem("userInput", JSON.stringify(userInputArray));
    creatListItem ();
  });

function creatListItem(){
  // add listItem for each userinput in array
  for (var i = 0; i < newInput.length; i++) {
    listItemEl = $('<li>'+ newInput[i] + '</li>');
    //add delete button
    listItemEl.append('<button class="delete-btn">Remove</button>');
    listEl.append(listItemEl);

    //clear input field
    $('input[name="input-list"]').val('');
  }
}

function handleRemoveItem(event) {
      // convert button we pressed (`event.target`) to a jQuery DOM object
    var btnClicked = $(event.target);
    console.log(btnClicked);
     
 console.log(btnClicked.parent('li'));

 //need to capture the text content of the li so that we can remove from localstorage Array
//  console.log($('#list-items').children.firstChild.textContent);
   
// get the parent `<li>` element from the button we pressed and remove it
    btnClicked.parent('li').remove();
}
console.log(listItemEl);

listEl.on('click', 'button.delete-btn', handleRemoveItem);
