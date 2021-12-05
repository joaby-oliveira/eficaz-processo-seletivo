const registerButton = document.querySelector('#register')
const usersViewButton = document.querySelector('#usersView')



// Change between "pages" logic
const register = document.querySelector('.register')
const usersView = document.querySelector('.usersView')

function showRegister(){
  register.classList.remove('hide')
  usersView.classList.add('hide')
}

function showUsersView(){
  register.classList.add('hide')
  usersView.classList.remove('hide')
}

registerButton.addEventListener('click', () => {
  showRegister()
})

usersViewButton.addEventListener('click', () => {
  showUsersView()
})