import people from './data.js'

const container = document.querySelector('.slide-container')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

container.innerHTML = people
  .map((person, index) => {
    const { img, name, job, text } = person
    let position = 'next'
    index === 0 && (position = 'active')
    index === people.length - 1 && (position = 'last')

    return `<article class="slide ${position}">
          <img src="${img}"
          alt="${name}" class="img">
          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">${text}</p>
          <div class="quote-icon">
          <i class="fas fa-quote-right"></i>
          </div>
          </article>`
  })
  .join('')

const startSlider = (type) => {
  const active = container.querySelector('.active')
  const last = container.querySelector('.last')
  let next = active.nextElementSibling
  !next && (next = container.firstElementChild)

  active.classList.remove(['active'])
  last.classList.remove(['last'])
  next.classList.remove(['next'])

  type === 'prev'
    ? (active.classList.add('next'),
      last.classList.add('active'),
      next.classList.add('last'))
    : (active.classList.add('last'),
      last.classList.add('next'),
      next.classList.add('active'))
}

nextBtn.addEventListener('click', () => {
  startSlider('next')
})

prevBtn.addEventListener('click', () => {
  startSlider('prev')
})
