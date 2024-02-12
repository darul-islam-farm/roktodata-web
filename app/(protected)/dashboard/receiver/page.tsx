import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ড্যাশবোর্ড'
}

export default function Home() {
  return (
    <main>
      <div className='h-screen flex items-center justify-center'>
        <div>
          <h1 className='font-bold text-3xl text-primary'>
            Receiver Dashboard
          </h1>
        </div>
      </div>
    </main>
  )
}
