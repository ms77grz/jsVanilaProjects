// set initial count
let count = 0

// select value and buttons
const value = document.querySelector('#value')
const btns = document.querySelectorAll('.btn')

btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    btn.classList.contains('decrease') && count--
    btn.classList.contains('reset') && (count = 0)
    btn.classList.contains('increase') && count++
    value.textContent = count
    count > 0
      ? (value.style.color = 'green')
      : count < 0
      ? (value.style.color = 'red')
      : (value.style.color = '#222')
  })
})
