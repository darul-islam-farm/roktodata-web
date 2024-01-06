import COLORS from '@/constants/colors'
import Swal from 'sweetalert2'

type TErrorProps = {
  title: any
  body?: string
  icon?: 'error' | 'success' | 'warning' | 'info' | 'question'
  timer?: number
}

type TConfirmProps = TErrorProps & {
  precom: Function
} & Omit<TErrorProps, 'timer'>

export function errorAlert({
  title,
  body,
  icon = 'error',
  timer
}: TErrorProps) {
  return Swal.fire({
    title: title,
    html: body,
    icon: icon,
    timer: timer,
    timerProgressBar: true
  })
}

export async function confirmAlert({
  title,
  body,
  icon = 'question',
  precom
}: TConfirmProps) {
  const result = await Swal.fire({
    title: title,
    html: body,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: COLORS.success,
    cancelButtonColor: COLORS.primary,
    confirmButtonText: 'Confirm'
  })
  return result.isConfirmed && precom()
}
