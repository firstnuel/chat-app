export  function formatDate(isoString) {
  const date = new Date(isoString)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


  const dayName = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const prefix = hours > 11 ? 'PM' : 'AM'

  return `${dayName}, ${dayOfMonth} ${year}, ${hours}:${minutes} ${prefix}`
}


export function isSameMinute(isoString1, isoString2) {

  if (!isoString2) return false
  // Create Date objects from the ISO strings
  const date1 = new Date(isoString1)
  const date2 = new Date(isoString2)

  // Compare year, month, day, hour, and minute
  return (
    date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() &&
      date1.getHours() === date2.getHours() &&
      date1.getMinutes() === date2.getMinutes()
  )
}