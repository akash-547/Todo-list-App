// Function to save the current list to localStorage
function saveListToLocalStorage() {
  // Get all the visible list items ('li') from the DOM
  const listItems = document.querySelectorAll('li');

  // Create an empty array to store the list data
  const listArray = [];

  // Loop through each list item and only include visible items
  listItems.forEach(item => {
    if (item.style.display !== 'none') {  // Only store visible items
      listArray.push({
        text: item.textContent.replace('\u00D7', ''),  // Remove the '×' symbol from the text
        checked: item.classList.contains('checked')    // Check if the item has the 'checked' class
      });
    }
  });

  // Save the array to localStorage as a JSON string
  localStorage.setItem('todoList', JSON.stringify(listArray));
}

// Function to load the list from localStorage when the page is refreshed or loaded
function loadListFromLocalStorage() {
  // Retrieve the saved list from localStorage
  const storedList = localStorage.getItem('todoList');

  // Check if there is any saved data
  if (storedList) {
    // Parse the JSON string into an array of list items
    const listArray = JSON.parse(storedList);

    // Loop through the array and recreate each list item in the DOM
    listArray.forEach(item => {
      createListItem(item.text, item.checked);  // Create each item with the saved text and checked status
    });
  }
}

// Function to create a new list item and add it to the DOM
function createListItem(text, isChecked = false) {
  // Create a new <li> element (list item)
  const li = document.createElement('li');

  // Create a text node with the provided text
  const textNode = document.createTextNode(text);

  // Append the text node to the list item
  li.appendChild(textNode);

  // If the list item was checked previously, add the 'checked' class
  if (isChecked) {
    li.classList.add('checked');
  }

  // Create a <span> element to serve as the "close" button
  const span = document.createElement("SPAN");

  // Create a text node containing the '×' symbol (for close)
  const txt = document.createTextNode("\u00D7");

  // Assign the 'close' class to the span element
  span.className = "close";

  // Append the '×' text to the span
  span.appendChild(txt);

  // Append the span (close button) to the list item
  li.appendChild(span);

  // Add the new list item to the unordered list (ul) in the DOM
  document.getElementById('myUL').appendChild(li);

  // Attach the close button functionality to hide the list item when clicked
  span.onclick = () => {
    const div = span.parentElement;  // Get the parent element (the list item <li>)
    div.style.display = 'none';      // Hide the list item
    saveListToLocalStorage();        // Save the updated list after removing the item
  };

  // Save the updated list to localStorage after creating the new item
  saveListToLocalStorage();
}

// Add "close" buttons to all existing list items (if they exist on page load)
const myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  const span = document.createElement("SPAN");  // Create a new <span> element for the close button
  const txt = document.createTextNode("\u00D7"); // Add the '×' symbol to the span
  span.className = "close";  // Assign the 'close' class to the span
  span.appendChild(txt);  // Append the '×' text to the span
  myNodelist[i].appendChild(span);  // Append the span to the existing list item

  // Attach the close button functionality to hide the list item
  span.onclick = () => {
    const div = span.parentElement;  // Get the parent list item
    div.style.display = 'none';      // Hide the list item
    saveListToLocalStorage();        // Save the updated list to localStorage
  };
}

// Mark items as "checked" (crossed out) when they are clicked
const list = document.querySelector('ul');  // Select the unordered list (ul)
list.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {  // Check if the clicked element is a list item (li)
    event.target.classList.toggle('checked');  // Toggle the 'checked' class to mark/unmark as done
    saveListToLocalStorage();  // Save the updated checked status to localStorage
  }
});

// Function to create a new list item when the "Add" button is clicked
function newElement() {
  const inputValue = document.getElementById('myInput').value;  // Get the value from the input field

  if (inputValue === '') {
    alert('You must write something!');  // If input is empty, show an alert
  } else {
    createListItem(inputValue);  // Create a new list item with the input value
  }

  document.getElementById('myInput').value = '';  // Clear the input field after adding the item
}

// Load the saved list from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadListFromLocalStorage);


