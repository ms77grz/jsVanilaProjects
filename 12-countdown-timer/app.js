const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const headings = document.querySelectorAll('.deadline-format h4')

// setup for 10 days counter
let tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 18, 30, 0)
// const futureDate = new Date(2021, 0, 26, 18, 30, 0)
const year = futureDate.getFullYear()
const month = months[futureDate.getMonth()]
const weekday = weekdays[futureDate.getDay()]
const days = futureDate.getDate()
const hours = futureDate.getHours()
const mins = futureDate.getMinutes()

giveaway.innerHTML = `ends ${weekday}, ${days} ${month} ${year}, ${hours}:${mins}`

// future time in ms
const futureTime = futureDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime()
  const timeDelta = futureTime - today

  // 1s = 1000ms
  // 1m = 60s
  // 1h = 60m
  // 1d = 24h

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  // calculate all values
  let days = Math.floor(timeDelta / oneDay)
  let hours = Math.floor((timeDelta % oneDay) / oneHour)
  let minutes = Math.floor((timeDelta % oneHour) / oneMinute)
  let seconds = Math.floor((timeDelta % oneMinute) / 1000)

  // set values array
  const values = [days, hours, minutes, seconds]

  // format output values
  function formatValue(value) {
    return value < 10 ? `0${value}` : value
  }

  // add values to headings
  headings.forEach(function (heading, index) {
    heading.innerHTML = formatValue(values[index])
    timeDelta < 0 &&
      (deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired`)
  })
}

// countdonw
let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()
