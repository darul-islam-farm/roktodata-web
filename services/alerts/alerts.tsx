import COLORS from '@/constants/colors'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

type TErrorProps = {
  title?: any
  body?: string
  icon?: 'error' | 'success' | 'warning' | 'info' | 'question'
  timer?: number
}

type TConfirmProps = TErrorProps & {
  confirm?: string
  cancel?: string
  precom: any
} & Omit<TErrorProps, 'timer'>

type TConfirmPropsAsync = TErrorProps & {
  precom: () => Promise<any>
  successText?: string
} & Omit<TErrorProps, 'timer icon'>

export function errorAlert({
  title,
  body,
  icon = 'error',
  timer = 5000
}: TErrorProps) {
  return Swal.fire({
    title,
    html: body,
    icon: icon,
    timer,
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

export async function confirmAlert({
  title,
  body,
  confirm,
  cancel,
  precom
}: TConfirmProps) {
  const result = await Swal.fire({
    title: title,
    html: body,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: COLORS.success,
    cancelButtonColor: COLORS.primary,
    confirmButtonText: confirm || 'Confirm',
    cancelButtonText: cancel || 'Cancel'
  })
  return result.isConfirmed && precom()
}

export async function confirmAlertAsync({
  title,
  body,
  precom,
  successText
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
      const res = await precom()
      if (res.ok) toast.success(successText || 'successfully done the task.')
      else if (res.error)
        errorAlert({ title: 'একটি ইরর হয়েছে', body: res.error })
    } catch (error) {
      errorAlert({ title: 'একটি ইরর হয়েছে।', body: error as string })
    }
  }
}
