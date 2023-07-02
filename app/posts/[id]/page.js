import Date from "@/components/date"
import parse from 'html-react-parser'
import {decode} from 'html-entities';
import CommentForm from "./comment_form";

const SERVER_URL = process.env.SERVER_URL;

// getStaticPaths in page router is replaced by generateStaticParams
export async function generateStaticParams() {
  const res = await fetch(`${SERVER_URL}/posts?published=true`, { next: { revalidate: 60 } })
  const posts = await res.json()
 
  return posts.map((post) => ({
    id: post._id,
  }))
}

// This is similar to getStaticProps in page router
async function getPost(params) {
  const res = await fetch(`${SERVER_URL}/posts/${params.id}?published=true`, { next: { revalidate: 60 } })
  const post = await res.json()
  return post
}

// getting comments
// This is similar to getServerSideProps in the pages directory.
async function getComments(postId) {
  // ??? somehow setting { cache: 'no-store' } doesn't work
  const res = await fetch(`${SERVER_URL}/posts/${postId}/comments`, { next: { revalidate: 1 } })
  const comments = await res.json()
  return comments
}

const allComments = (comments) => {
  return comments.map((comment) => {
    const commentContent = '<p>' + comment.content + '</p>'
    const commentAuthor = '<p>' + comment.author_name + '</p>'
    const decodedComment = decode(commentContent, {level: 'html5'});
    const decodedAuthor = decode(commentAuthor, {level: 'html5'});
    return (
      <div key={comment._id} className="min-h-fit bg-white p-2 mb-4">
        <div className="mb-2">{ parse(decodedComment) }</div>
        <div className="font-light text-sm">{ parse(decodedAuthor) }</div>
        <div className="font-light text-sm"><Date dateString={comment.date_created} /></div>
      </div>
    )
  })

}

export default async function Post({ params }) {
  const post = await getPost(params)
  const comments = await getComments(post._id)

  const decodedContent = decode(post.content, {level: 'html5'});

  const lastModified = post.date_updated ? (
    <div className="mb-6 font-light">
      Last Modified: <Date dateString={post.date_updated} />
    </div>
  ) : null;

  return (
    <div className="min-h-screen">
      <div className="min-h-fit bg-white p-12">
        <div className="text-4xl mb-4">{post.title}</div>
        <div className="mb-6 font-light"><Date dateString={post.date_created} /></div>
        { lastModified }
        <article className="prose md:prose-lg mb-8">{ parse(decodedContent) }</article>
      </div>
      <div className="p-12">
        <CommentForm postId = {post._id} serverUrl = {SERVER_URL}/>
        <div className="text-lg mb-2 font-medium">Comments</div>
        {allComments(comments)}
      </div>
    </div>
    
  )
}