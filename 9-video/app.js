// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

const videoContainer = document.querySelector('.video-container')
const switchBtn = document.querySelector('.switch-btn')

switchBtn.addEventListener('click', function () {
  this.classList.toggle('slide')
  videoContainer.paused ? videoContainer.play() : videoContainer.pause()
})

// preloader
const preloader = document.querySelector('.preloader')
window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader')
})
