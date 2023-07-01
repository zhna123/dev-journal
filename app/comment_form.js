'use client'

import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

const SERVER_URL = process.env.SERVER_URL;

export default function CommentForm({ postId }) {
  const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful, errors } } 
    = useForm({ defaultValues: { content: "", author_name: "" } });

  const router = useRouter()
  
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${SERVER_URL}/posts/${postId}/comments`, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        router.refresh()
      } else {
        const result = await res.json();
        throw new Error(result)
      }
    } catch(e) {
      console.log("error when submitting comment:" + e)
    }  
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ content: "", author_name: "" });
    }
  }, [formState, reset]);

  return (
    <>
    <div className="mb-2 text-lg font-medium">Leave a comment</div>
    <div className="mb-12">
      <form onSubmit={handleSubmit(onSubmit)} method="post" action="" className="flex flex-col">
      <div>
          <label className="block mb-2" htmlFor="comment">What do you think?</label>
          <textarea id="comment" 
                    {...register("content", { 
                                    required: "Content is required",
                                    maxLength: {
                                      value: 300,
                                      message: "Content needs to be under 300 characters"
                                    } 
                                  }
                                )
                    } 
                    className="form-textarea w-full border-none" 
                    rows="5">
          </textarea>
          <ErrorMessage
            errors={errors}
            name="content"
            render={({ message }) => <p className='text-red-600'>{message}</p>}
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="name">Name</label>
          <input id="name" 
                  {...register("author_name", { 
                                  required: "Name is required",
                                  maxLength: {
                                    value: 20,
                                    message: "Name needs to be under 20 characters"
                                  } 
                                }
                              )
                  } 
                  type="text" 
                  className="form-input border-none"/>
        </div>
        <ErrorMessage
            errors={errors}
            name="author_name"
            render={({ message }) => <p className='text-red-600'>{message}</p>}
        />
        <input type="submit" className="form-input mr-auto border-none bg-teal-500 hover:bg-teal-600 active:bg-teal-700 cursor-pointer mt-4" />
      </form>
    </div>
    </>
  )
}