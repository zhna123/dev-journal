import Image from 'next/image'
import Link from 'next/link'
import Date from '../components/date';

const SERVER_URL = process.env.SERVER_URL;

// this is similar to getStaticProps in page router
async function getPosts() {
  try {
    const res = await fetch(`${SERVER_URL}/posts?published=true`, { next: { revalidate: 60 } })
    const posts = await res.json()

    return posts.slice(0, 6)
  } catch (err) {
    console.log("Error fetching all publications:" + err)
  }
}

const getArticles = (posts) => {
  return posts.map((post) => {
    return (
        <div key={post._id} className='h-60 p-4 text-center border-site-gray-500 shadow-lg hover:bg-site-gray-500 flex flex-col items-center justify-center'>
          <Link href={`/posts/${post._id}`} ><div className='font-medium mb-2'> {post.title} </div></Link>
          <div><Date dateString={post.date_created} /></div>
        </div>
    )
  })
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen">
      <div className='bg-white flex flex-col items-center justify-center min-h-fit py-6'>
        <Image
              priority
              src="/images/profile.jpeg"
              className="rounded-full h-36 w-36 mb-6"
              height={144}
              width={144}
              alt=""
            />
        <div className='text-slate-500 font-light text-center px-12'>
          Hello. I am Na, a web developer. <br />
          Welcome to my website! <br />
        </div>
      </div>
      <div className='p-12'>
        <p className='pb-4 text-xl font-medium'>Categories</p>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 p-12 bg-teal-500'>
          <div className='bg-white h-40'>01</div>
          <div className='bg-white h-40'>02</div>
          <div className='bg-white h-40'>03</div>
          <div className='bg-white h-40'>04</div>
        </div>
      </div>
      <div className='bg-white p-12'>
        <div className='pb-4 text-xl font-medium relative'>
          Recent Articles
          <Link href={"/posts"}>
            <button 
              className='absolute right-0 bg-site-gray-500 hover:bg-site-gray-600 active:bg-site-gray-700 p-2 text-sm font-thin'>
                See All
            </button>
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {getArticles(posts)}
        </div>
      </div>
    </div>
  )
}
