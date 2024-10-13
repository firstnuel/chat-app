export  function formatDate(isoString, noYear=false) {
  const date = new Date(isoString)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


  const dayName = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const prefix = hours > 11 ? 'PM' : 'AM'

  const fmtDate = noYear?
    `${dayName}, ${dayOfMonth} ${year}, ${hours}:${minutes} ${prefix}`
    : `${dayName}, ${hours}:${minutes} ${prefix}`

  return fmtDate
}


export function isSameMinute(isoString1, isoString2) {

  if (!isoString2) return false

  const date1 = new Date(isoString1)
  const date2 = new Date(isoString2)

  return (
    date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() &&
      date1.getHours() === date2.getHours() &&
      date1.getMinutes() === date2.getMinutes()
  )
}

export function isSameMonthAndYear(isoString1, isoString2) {
  const date1 = new Date(isoString1)
  const date2 = new Date(isoString2)

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}