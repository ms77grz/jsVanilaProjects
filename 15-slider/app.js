const slides = document.querySelectorAll('.slide')
const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`
})

let counter = 0

prevBtn.addEventListener('click', function () {
  counter--
  carousel()
})

nextBtn.addEventListener('click', function () {
  counter++
  carousel()
})

function carousel() {
  // working with slides and not hiding the buttons FIRST METHOD
  /* 
  counter === slides.length && (counter = 0)
  counter < 0 && (counter = slides.length - 1)
 */

  // working with slides and hiding the buttons SECOND METHOD
  counter < slides.length - 1
    ? (nextBtn.style.display = 'block')
    : (nextBtn.style.display = 'none')
  counter > 0
    ? (prevBtn.style.display = 'block')
    : (prevBtn.style.display = 'none')

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`
  })
}

// hide prev button SECOND METHOD
prevBtn.style.display = 'none'
