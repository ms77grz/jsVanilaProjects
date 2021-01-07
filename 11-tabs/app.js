const btns = document.querySelectorAll('.tab-btn')
const about = document.querySelector('.about')
const articles = document.querySelectorAll('.content')

about.addEventListener('click', function (e) {
  const id = e.target.dataset.id
  id &&
    (btns.forEach(function (btn) {
      // remove active from all buttons
      btn.classList.remove('active')
      // add active to clicked button
      e.target.classList.add('active')
    }),
    // hide all articles
    articles.forEach(function (article) {
      article.classList.remove('active')
    }),
    // add active to article
    (element = document.getElementById(id)),
    element.classList.add('active'))
})
