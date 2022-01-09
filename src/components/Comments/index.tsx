import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ChatLeftText } from "react-bootstrap-icons";

type CommentsProps = {
  commentRequestURL: string;
};

type CommentsData = {
  id: number,
  username: string,
  content: string,
};

const Comments = ({ commentRequestURL }: CommentsProps) => {
  const [comments, setComments] = useState<CommentsData[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const getComments = async () => {
    await axios.get(commentRequestURL)
      .then(r => {
        const { data } = r;
        setComments(data);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getComments();
  }, []);

  const submitComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = { content: `${commentText}` }
    setCommentText('');
    await axios.post(commentRequestURL, body)
      .catch(e => console.log(e))
      .finally(() => getComments());
  };

  return (
    <div className="w-[100%]">
      <div className='flex flex-row w-[100%] items-center text-xl'>
        <ChatLeftText width={24} height={24} />
        <span className='p-2'>Activity</span>
      </div>
      <Form onSubmit={submitComment} className="ml-6 relative">
        <Form.Control
          className='mb-3'
          style={{ minHeight: isFocused ? 120 : 'auto' }}
          value={commentText}
          as="textarea" placeholder="Write a comment"
          onChange={(e) => setCommentText(e.currentTarget.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(Boolean(commentText))}
        />
        {(commentText || isFocused) &&
          (<Button variant="primary" type="submit" >
            Save
          </Button>)
        }
      </Form>
      {[...comments].reverse().map((comment, index) => <div className='ml-6 py-2' key={index}>
        <div><span className="font-bold">{comment.username}</span></div>
        <div className="bg-white p-2 rounded-sm shadow-md"><span>{comment.content}</span></div>
      </div>)}
    </div>
  )
};

export default Comments;