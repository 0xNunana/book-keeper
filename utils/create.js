'use server'

 import { client } from "@/lib/redisdb"
import { redirect } from 'next/navigation'

export async function createBook(formData) {
 const {title, rating, author, blurb} = Object.fromEntries(formData)
  

//   //create a random id from 0 to 10000
//   const id = Math.floor(Math.random()*10000)


//   //prevent duplication by only adding it if it doesnt exist NX
//   const unique = await client.zAdd('books',{
//     value:title,
//     score:id
//   },{NX:true})
// //return an error if it already exist
//   if(!unique){
//     return {error:'The book has already been added'}
//   }

//   //save new hash for new book
//   await client.hSet(`books:${id}`,{
//     title,rating,author,blurb
//   });
// redirect('/')

try {
  // Check if the book already exists
  const bookExists = await client.hExists('books', title);

  if (bookExists) {
    return { error: 'The book has already been added' };
  }

  // Save book details in a hash
  await client.hSet(`books:${id}`, { title, rating, author, blurb });

  // Add the book to the sorted set
  await client.zAdd('books', { [id]: id });

  redirect('/');
} catch (error) {
  console.error('Error adding book:', error);
  return { error: 'An unexpected error occurred' };
}


}