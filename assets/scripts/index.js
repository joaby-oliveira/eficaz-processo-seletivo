const registerButton = document.querySelector('#register')
const usersViewButton = document.querySelector('#usersView')

const register = document.querySelector('.register')
const usersView = document.querySelector('.usersView')

registerButton.addEventListener('click', () => {
  register.classList.remove('hide')
  usersView.classList.add('hide')
  console.log(usersView);
})

usersViewButton.addEventListener('click', () => {
  register.classList.add('hide')
  usersView.classList.remove('hide')
})