// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editID = ''

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem)
// clear items
clearBtn.addEventListener('click', clearItems)
// load items
window.addEventListener('DOMContentLoaded', setupItems())

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault()
  const value = grocery.value
  const id = new Date().getTime().toString()
  value && !editFlag
    ? (createListItem(id, value),
      // display alert
      displayAlert(`${value} added to the list`, 'success'),
      // show container
      container.classList.add('show-container'),
      // add to local storage
      addToLocalStorage(id, value),
      // set back to default
      setBackToDefault())
    : value && editFlag
    ? ((editElement.innerHTML = value),
      displayAlert(`changed to ${value}`, 'success'),
      // edit local storage
      editLocalStorage(editID, value),
      setBackToDefault())
    : displayAlert('please enter value', 'danger')
}

function displayAlert(message, status) {
  // display alert
  alert.textContent = message
  alert.classList.add(`alert-${status}`)
  // remove alert
  setTimeout(() => {
    alert.textContent = ''
    alert.classList.remove(`alert-${status}`)
  }, 1000)
}

// clear items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item')
  items.length > 0 &&
    items.forEach(function (item) {
      list.removeChild(item)
    })
  container.classList.remove('show-container')
  displayAlert('empty list', 'danger')
  setBackToDefault()
  localStorage.removeItem('list')
}

// delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement
  const value = element.firstChild.innerHTML
  const id = element.dataset.id
  list.removeChild(element)
  list.children.length === 0 && container.classList.remove('show-container')

  displayAlert(`${value} removed`, 'danger')
  setBackToDefault()
  // remove from local storage
  removeFromLocalStorage(id)
}

// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement
  // set edit element
  editElement = element.firstChild
  // set form value
  grocery.value = editElement.innerHTML
  editFlag = true
  editID = element.dataset.id
  submitBtn.textContent = 'edit'
}

// set back to default
function setBackToDefault() {
  grocery.value = ''
  editFlag = false
  editID = ''
  submitBtn.textContent = 'submit'
}

// ****** LOCAL STORAGE **********
// localStorage API
// setItem
// getItem
// removeItem
// save as string
function addToLocalStorage(id, value) {
  const grocery = { id, value }
  let items = getLocalStorage()
  items.push(grocery)
  localStorage.setItem('list', JSON.stringify(items))
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage()
  items = items.filter(function (item) {
    return item && item.id !== id
  })
  localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(id, value) {
  let items = getLocalStorage()
  items = items.map(function (item) {
    item.id === id && (item.value = value)
    return item
  })
  localStorage.setItem('list', JSON.stringify(items))
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : []
}
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage()
  items.length > 0 &&
    items.map(function (item) {
      createListItem(item.id, item.value)
      container.classList.add('show-container')
    })
}

function createListItem(id, value) {
  const element = document.createElement('article')
  // add class
  element.classList.add('grocery-item')
  // add id attribute to element
  const attr = document.createAttribute('data-id')
  attr.value = id
  element.setAttributeNode(attr)
  element.innerHTML = `<p class="title">${value}</p>
                       <div class="btn-container">
                       <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
                       <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
                       </div>`
  const deleteBtn = element.querySelector('.delete-btn')
  const editBtn = element.querySelector('.edit-btn')
  deleteBtn.addEventListener('click', deleteItem)
  editBtn.addEventListener('click', editItem)
  // append element to list
  list.appendChild(element)
}
