import COLORS from '@/constants/colors'
import Swal from 'sweetalert2'

type TErrorProps = {
  title?: any
  body?: string
  icon?: 'error' | 'success' | 'warning' | 'info' | 'question'
  timer?: number
}

type TConfirmProps = TErrorProps & {
  precom: any
} & Omit<TErrorProps, 'timer'>

type TConfirmPropsAsync = TErrorProps & {
  precom: () => Promise<any>
} & Omit<TErrorProps, 'timer icon'>

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

export function successAlert({
  title,
  body,
  icon = 'success',
  timer = 3000
}: TErrorProps) {
  return Swal.fire({
    title: title,
    html: body,
    icon: icon,
    timer: timer,
    timerProgressBar: true
  })
}

export async function confirmAlert({ title, body, precom }: TConfirmProps) {
  const result = await Swal.fire({
    title: title,
    html: body,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: COLORS.success,
    cancelButtonColor: COLORS.primary,
    confirmButtonText: 'Confirm'
  })
  return result.isConfirmed && precom()
}

export async function confirmAlertAsync({
  title,
  body,
  precom
}: TConfirmPropsAsync) {
  const result = await Swal.fire({
    title: title,
    html: body,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: COLORS.success,
    cancelButtonColor: COLORS.primary,
    confirmButtonText: 'Confirm'
  })
  if (result.isConfirmed) {
    try {
      await precom()
    } catch (error) {
      errorAlert({ title: 'একটি ইরর হয়েছে।', body: error as string })
    }
  }
}
