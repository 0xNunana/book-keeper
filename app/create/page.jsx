'use client'

import { createBook } from '@/utils/create'
import { useState } from "react"

export default function Create() {
  const [error, setError] = useState('')

  async function handleSubmit(formData) {
    const result = await createBook(formData)

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <main>
      <form action={handleSubmit} className='max-w-sm mx-auto text-center'>
        <h2>Add a New Book</h2>
        <input type="text" name="title" placeholder="title" className='block w-full p-2 rounded-sm my-4'/>
        <input type="text" name="author" placeholder="author" className='block w-full p-2 rounded-sm my-4' />
        <input type="number" name="rating" max={10} min={1} placeholder="rating" className='block w-full p-2 rounded-sm my-4' />
        <textarea name="blurb" placeholder="blurb..." className='block w-full p-2 rounded-sm my-4'></textarea>
        <button type="submit" className="bg-rose-500 text-white p-2 rounded-sm text-xs">Add Book</button>
        {error && <div className=" my-4 p-2 text-sm rounded-md border-2 
      border-red-500 bg-red-200 text-red-500;">{error}</div>}
      </form>
    </main>
  )
}