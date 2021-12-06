// Variables
const inputs = document.querySelectorAll('.inputBox input')
const registerForm = document.querySelector('.register .form')
const editForm = document.querySelector('.updateUserContainer .form')
const baseUrl = 'https://estagio.eficazmarketing.com/api/'
const formTitle = document.querySelector('.register .title')
const formButton = document.querySelector('.form .buttonSubmit')

let update = {
  userId: null
}

// Validating data and masks
const masks = {
  cep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
  },

  telefone(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  },

  numero(value) {
    return value
      .replace(/\D/g, '')
  },

  uf(value) {
    return value
      .replace(/[^a-z]/ig, '')
      .toUpperCase()
  }
}

inputs.forEach(input => {
  const field = input.id
  input.addEventListener('input', ({ target }) => {
    console.log(target.value)
    target.value = masks[field](target.value)
  })
})

function resetForm() {
  inputs.forEach(input => {
    input.value = ""
  })
}

// Change between "pages" logic
const register = document.querySelector('.register')
const usersView = document.querySelector('.usersView')

const registerButton = document.querySelector('#register')
const usersViewButton = document.querySelector('#usersView')

function showRegister() {
  register.classList.remove('hide')
  usersView.classList.add('hide')
}

function showUsersView() {
  register.classList.add('hide')
  usersView.classList.remove('hide')
}

registerButton.addEventListener('click', () => {
  showRegister()
})

usersViewButton.addEventListener('click', () => {
  showUsersView()
})

// Register user data in api
async function registerUser(userData) {

  try {
    const result = await fetch(`${baseUrl}user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    const data = await result.json()

    showUsers()
    showMessage(data.message)
  } catch (e) {
    console.log(e)
  }

}

// Update user data in api
async function updateUser(userData) {

  try {
    const result = await fetch(`${baseUrl}user/${userData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    const data = await result.json()

    showUsers()
    showMessage(data.message)

    update.userId = null
    // Change form title from register to edit
    formTitle.innerHTML = "Cadastrar"
    // Create an edit button
    formButton.innerHTML = "Cadastrar"
  } catch (e) {
    console.log(e)
  }

}

// Handle register user submit
registerForm.addEventListener('submit', (e) => {
  // If update is not true then it saves the data
  e.preventDefault()
  const data = {}

  inputs.forEach(input => {
    data[input.id] = input.value
  })

  if (!update.userId) {
    registerUser(data)
    resetForm()
    console.log('registro')
  } else {
    updateUser({ ...data, id: update.userId })
    resetForm()
    console.log('edição')
  }
})

// Create handle button functions
async function deleteUsers(id) {
  const result = await fetch(`${baseUrl}user/${id}`, {
    method: 'DELETE'
  })
  const data = await result.json()
  return data
}

// Retrieve user data from api
async function getUsers() {
  const result = await fetch(`${baseUrl}user`)

  const data = await result.json()
  console.log(data)
  return data
}

async function showUsers() {

  const users = await getUsers()
  users.reverse()

  const usersTable = document.querySelector('.usersTable')
  const usersElements = document.querySelectorAll('.user')

  usersElements.forEach(user => {
    usersTable.removeChild(user)
  })

  users.forEach(user => {

    const userElement = document.createElement('tr')
    userElement.classList.add('text')
    userElement.classList.add('user')

    const name = document.createElement('td')
    name.innerHTML = user.nome

    const email = document.createElement('td')
    email.innerHTML = user.email

    const address = document.createElement('td')
    address.innerHTML = `${user.rua}, ${user.numero} ${user.bairro} ${user.cep} ${user.cidade}-${user.uf}`

    const phone = document.createElement('td')
    phone.innerHTML = `${user.telefone}`


    const buttonContainerParent = document.createElement('td')

    // Buttons container
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('flex')

    // Buttons
    const editButton = document.createElement('button')
    editButton.innerHTML = "Editar"
    editButton.classList.add('actionButton')
    editButton.classList.add('edit')

    // Buttons
    const deleteButton = document.createElement('a')
    deleteButton.innerHTML = "Deletar"
    deleteButton.classList.add('actionButton')
    deleteButton.classList.add('delete')

    buttonContainerParent.appendChild(buttonContainer)
    buttonContainer.appendChild(editButton)
    buttonContainer.appendChild(deleteButton)

    userElement.appendChild(name)
    userElement.appendChild(email)
    userElement.appendChild(address)
    userElement.appendChild(phone)
    userElement.appendChild(buttonContainerParent)

    usersTable.appendChild(userElement)

    deleteButton.addEventListener('click', async _ => {
      const result = await deleteUsers(user.id)
      showMessage(result.message)
      showUsers()
    })

    editButton.addEventListener('click', async _ => {
      update.userId = user.id

      // Change form title from register to edit
      formTitle.innerHTML = "Editar"

      // Set data in inputs
      inputs.forEach(input => {
        input.value = user[input.id]
      })

      // Create an edit button
      formButton.innerHTML = "Editar"

      showRegister()
    })

  })

}

showUsers()

// Show success message
const successMessage = document.querySelector('.successMessage')

function showMessage(message) {
  successMessage.classList.remove('hide')
  successMessage.innerHTML = message
  setTimeout(() => {
    successMessage.classList.add('hide')
  }, 6000);
}