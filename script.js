// save list in localStorage
function saveList() {
  let listItems = [];
  let items = document.querySelectorAll('#myUL li');
  for (let i = 0; i < items.length; i++) {
    listItems.push({ text: items[i].innerText.slice(0, -1), checked: items[i].classList.contains('checked') });
  }
  localStorage.setItem('todoList', JSON.stringify(listItems));
}

// Load from localStorage
function loadList() {
  let storedList = localStorage.getItem('todoList');
  if (storedList) {
    let listItems = JSON.parse(storedList);
    for (let i = 0; i < listItems.length; i++) {
      let li = document.createElement("li");
      let t = document.createTextNode(listItems[i].text);
      li.appendChild(t);
      if (listItems[i].checked) {
        li.classList.add('checked');
      }
      document.getElementById("myUL").appendChild(li);
      addCloseButton(li);
    }
  }
}

// Create a "close" button and append it to each list item
function addCloseButton(li) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("x");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Add event listener to the close button
  span.onclick = function() {
      let li = this.parentElement;
      li.parentNode.removeChild(li);
      saveList();
  }
}

// Initialize close buttons for existing list items
let nodelist = document.getElementsByTagName("Li");
for (let i = 0; i < nodelist.length; i++) {
  addCloseButton(nodelist[i]);
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    saveList();
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("add-list-input").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
      addCloseButton(li);
      saveList();
    }
    document.getElementById("add-list-input").value = "";
}

loadList();