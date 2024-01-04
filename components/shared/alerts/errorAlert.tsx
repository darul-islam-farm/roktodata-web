import Swal from 'sweetalert2'

type TPorps = {
  title: any
  body?: string
  icon?: 'error' | 'success' | 'warning' | 'info' | 'question'
  timer?: number
}

export default function errorAlert({
  title,
  body,
  icon = 'error',
  timer
}: TPorps) {
  return Swal.fire({
    title: title,
    html: body,
    icon: icon,
    timer: timer,
    timerProgressBar: true
  })
}
