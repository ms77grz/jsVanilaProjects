// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date')
date.innerHTML = new Date().getFullYear()
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

navToggle.addEventListener('click', function () {
  const containerHeight = linksContainer.getBoundingClientRect().height
  const linksHeight = links.getBoundingClientRect().height
  containerHeight === 0
    ? (linksContainer.style.height = `${linksHeight}px`)
    : (linksContainer.style.height = 0)
})
// ********** fixed navbar ************
const navbar = document.getElementById('nav')
const topLink = document.querySelector('.top-link')

window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset
  const navHeight = navbar.getBoundingClientRect().height
  scrollHeight >= navHeight
    ? navbar.classList.add('fixed-nav')
    : navbar.classList.remove('fixed-nav')
  scrollHeight >= 500
    ? topLink.classList.add('show-link')
    : topLink.classList.remove('show-link')
})
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link')

scrollLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    // disable default behaviour
    e.preventDefault()
    // navigate to specific spot
    // get id from href
    const id = e.currentTarget.getAttribute('href').slice(1)
    // select element by id
    const element = document.getElementById(id)
    // get element top position
    let topPosition = element.offsetTop
    // calculate heights
    const navHeight = navbar.getBoundingClientRect().height
    const containerHeight = linksContainer.getBoundingClientRect().height
    const isFixedNav = navbar.classList.contains('fixed-nav')
    // get real top position
    topPosition = topPosition - navHeight
    // subtract navbar height if it is not fixed
    !isFixedNav && (topPosition = topPosition - navHeight)
    // add container height in smaller view
    navHeight > 82 && (topPosition = topPosition + containerHeight)
    // scroll to element top position
    window.scrollTo({
      left: 0,
      top: topPosition,
    })
    // close hamburger menu
    linksContainer.style.height = 0
  })
})
