export default function CardSkeleton({ count = 3 }) {
  return (
    <div className='my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: count }, (i, j) => j).map((c) => (
        <div
          key={c}
          className='bg-extralight  rounded-lg shadow animate-pulse h-60'
        />
      ))}
    </div>
  )
}
