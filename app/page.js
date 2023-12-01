import { client } from '@/lib/redisdb'
import Link from 'next/link'

const getBooks = async () => {
  const result = await client.zRangeWithScores('books',0 ,-1)
 
  const books = await Promise.all(result.map((b)=>{
    return client.hGetAll(`books:${b.score}`)
  }))
  return books;
}

export default async function Home() {

  const books = await getBooks()

  return (
    <main className='max-w-[720px] mx-auto'>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="bg-rose-500 text-white p-2 rounded-sm text-xs">Add a new book</Link>
      </nav>
       {books.map((book)=>(
        <div key={book.title} className='bg-white p-5 rounded-md shadow-sm my-5'>
          <h2 className='mb-0 font-bold'>{book.title}</h2>
          <p className='lowercase text-xs font-bold text-gray-500;
      font-variant: small-caps'>By {book.author}</p>
          <p className='mb-2 text-sm text-gray-500'>{book.blurb}</p>
          <p className='mb-2 text-sm text-gray-500'>Rating: {book.rating}</p>
        </div>
      ))}  
      
      <p className='mb-2 text-sm text-gray-500;'>List of books here.</p>
    </main>
  )
}
