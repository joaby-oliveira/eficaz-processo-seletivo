// Variables
const inputs = document.querySelectorAll('.inputBox input')
const form = document.querySelector('form')

async function registerUser(userData) {

  try {
    const result = await fetch('https://estagio.eficazmarketing.com/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const data = await result.json()
  } catch (e) {
    console.log(e)
  }
}

// Handle submit
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = {}

  inputs.forEach(input => {
    data[input.id] = input.value
  })

  registerUser(data)
})

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