import Link from 'next/link'
import Date from '@/components/date'

const SERVER_URL = process.env.SERVER_URL;

// this is similar to getStaticProps in page router
async function getPosts() {
  try {
    const res = await fetch(`${SERVER_URL}/posts?published=true`, { next: { revalidate: 60 } })
    const posts = await res.json()

    return posts
  } catch (err) {
    console.log("Error fetching all publications:" + err)
  }
}

const getArticles = (posts) => {
  return posts.map((post) => {
    return (
        <div key={post._id} className='h-60 p-4 text-center bg-white shadow-lg flex flex-col items-center justify-center'>
          <Link href={`/posts/${post._id}`} ><div className='font-medium mb-2'> {post.title} </div></Link>
          <div><Date dateString={post.date_created} /></div>
        </div>
    )
  })
}

export default async function Posts() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-site-gray-500">
      <div className='p-12'>
        <div className='pb-4 text-xl font-medium'>
          All Articles
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {getArticles(posts)}
        </div>
      </div>
    </div>
  )
}
