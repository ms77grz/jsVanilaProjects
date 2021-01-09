import sublinks from './data.js'

const toggleBtn = document.querySelector('.toggle-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebarLinks = document.querySelector('.sidebar-links')
const linksBtn = [...document.querySelectorAll('.link-btn')]

const submenu = document.querySelector('.submenu')
const hero = document.querySelector('.hero')
const nav = document.querySelector('.nav')

// show/hide sidebar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show')
})

// set sidebar
sidebarLinks.innerHTML = sublinks
  .map((sublink) => {
    const { links, page } = sublink
    return `<article>
              <h4>${page}</h4>
              <div class='sidebar-sublinks'>
                ${links
                  .map((link) => {
                    const { label, icon, url } = link
                    return `<a href='${url}'>
                              <i class='${icon}'></i>${label}
                            </a>`
                  })
                  .join('')}  
              </div>
            </article>`
  })
  .join('')

// set submenu
linksBtn.forEach((btn) => {
  btn.addEventListener('mouseover', (e) => {
    const text = e.currentTarget.textContent
    const elementSizePosition = e.currentTarget.getBoundingClientRect()
    // move submenu 3px up
    const bottom = elementSizePosition.bottom - 3
    // get center of the button
    const center = (elementSizePosition.left + elementSizePosition.right) / 2

    // find matching pages
    const tempPage = sublinks.find(({ page }) => page === text)
    // set submenu if page exists
    const { page, links } = tempPage && tempPage
    tempPage &&
      (submenu.classList.add('show'),
      (submenu.style.left = `${center}px`),
      (submenu.style.top = `${bottom}px`),
      (submenu.innerHTML = `
      <section>
        <h4>${page}</h4>
        <div class='submenu-center col-${links.length}'>
          ${links
            .map((link) => {
              return `<a href='${link.url}'>
                        <i class='${link.icon}'></i>${link.label}
                      </a>`
            })
            .join('')}
        </div>
      </section>
      
      `))
  })
})

// hide submenu
hero.addEventListener('mouseover', () => {
  submenu.classList.remove('show')
})

nav.addEventListener('mouseover', (e) => {
  !e.target.classList.contains('link-btn') && submenu.classList.remove('show')
})
