export default function loading() {
  return (
    <div>
      <div className='donor-card pt-8 pb-32'>
        <div className='flex items-center justify-center'>
          <div className='bg-white shadow-lg animate-pulse shadow-black/50 size-32 md:size-40 rounded-full' />
        </div>
      </div>
      <div className='-mt-20 h-[40vh] rounded-t-xl shadow-2xl shadow-dark/20 max-w-[22rem] sm:max-w-[28rem] mx-auto bg-white p-4 flex flex-col gap-y-4'>
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
        <div className=' bg-litetext w-full h-6 rounded-lg animate-pulse' />
      </div>
    </div>
  )
}
