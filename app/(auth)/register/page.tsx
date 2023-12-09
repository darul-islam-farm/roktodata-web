'use client'

import { jilla, TJilla } from '@/constants/static'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  name: z.string().min(4, 'আসল নাম আবশ্যক।'),
  email: z.string().email('সঠিক ইমেইল অ্যাড্রেস আবশ্যক।'),
  password: z.string().min(6, 'পাসওয়ার্ড অন্তত ৬ সংখ্যার হতে হবে।'),
  identity: z.string().min(10, 'সঠিক পরিচয়পত্র নম্বর দিন।'),
  gender: z.string().min(4, 'লিঙ্গ নির্বাচন আবশ্যক।'),
  phone: z.string().min(11, 'সঠিক ফোন নাম্বার দিন।'),
  phone2: z.string().min(11, 'সঠিক ফোন নাম্বার দিন।'),
  bloodType: z.string().min(4, 'রক্তের গ্রুপ আবশ্যক'),
  userType: z.string(),
  jilla: z.string(),
  subJilla: z.string(),
  thana: z.string(),
  currentAddress: z.string(),
  permanentAddress: z.string()
})

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <div className='grid gap-y-4 bg-neutral-100 p-4 sm:p-6 rounded-lg my-8 lg:my-16'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>Register an account</h1>
        <p className=''>dfdf</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
      <div>
        <Label htmlFor='name'>আপনার নাম</Label>
        <Input name='name' id='name' />
      </div>
      <div>
        <Label htmlFor='email'>ইমেইল অ্যাড্রেস</Label>
        <Input type='email' id='email' placeholder='user@working-email.com' />
      </div>
      <div>
        <Label htmlFor='password'>পাসওয়ার্ড</Label>
        <Input type='password' id='password' placeholder='x x x x x x' />
      </div>
      <div>
        <Label htmlFor='identity'>আইডেন্টিটি</Label>
        <Input id='identity' />
      </div>
      <div>
        <Label htmlFor='gender'>লিঙ্গ</Label>
        <Select>
          <SelectTrigger className='text-neutral-500'>
            <SelectValue placeholder='নির্বাচন করুন' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='MALE'>পুরুষ</SelectItem>
            <SelectItem value='FEMALE'>নারী</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor='email'>ফোন নাম্বার</Label>
        <Input type='email' id='email' placeholder='Email' />
      </div>
      <div>
        <Label htmlFor='email'>বিকল্প ফোন নাম্বার</Label>
        <Input type='email' id='email' placeholder='Email' />
      </div>
      <div>
        <Label htmlFor='email'>রেজিস্ট্রেশনের ধরণ</Label>
        <Select>
          <SelectTrigger className='text-neutral-500'>
            <SelectValue placeholder='একটি ধরণ নির্বাচন করুন' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='DONOR'>রক্তদাতা</SelectItem>
            <SelectItem value='RECEIVER'>রক্ত গ্রহীতা</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor='email'>জেলা</Label>
        <Select>
          <SelectTrigger className='text-neutral-500'>
            <SelectValue placeholder='একটি জেলা নির্বাচন করুন' />
          </SelectTrigger>
          <SelectContent>
            {jilla.map((item: TJilla) => (
              <SelectGroup key={item.name}>
                <SelectLabel>{item.name}</SelectLabel>
                {item.data.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='email'>উপজেলা</Label>
        <Input type='email' id='email' placeholder='Email' />
      </div>
      <div>
        <Label htmlFor='email'>থানা</Label>
        <Input type='email' id='email' placeholder='Email' />
      </div>
      <div>
        <Label htmlFor='email'>বর্তমান ঠিকানা</Label>
        <Input type='email' id='email' placeholder='Email' />
      </div>
      <div>
        <Label htmlFor='email'>স্থায়ী ঠিকানা</Label>
        <Input type='email' id='email' placeholder='Email' />
      </div>
      <div>
        <Button className='w-full mt-4'>Submit</Button>
      </div>
    </div>
  )
}
