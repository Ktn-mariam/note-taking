const getTime = () => {
  const d = new Date()
  let ts = d.toLocaleTimeString().split(' ')
  let time = `${ts[0].split(':')[0]}:${ts[0].split(':')[1]}`

  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let day = d.getDate()
  let month = d.getMonth() + 1
  let year = d.getFullYear()
  time = `${time} ${ts[1]}`
  const timeDisplay = `${time} ${day}/${month}/${year}`
  return timeDisplay
}

export default getTime
