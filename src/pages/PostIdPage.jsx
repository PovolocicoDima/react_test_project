import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import MyLoader from '../components/UI/MyLoader/MyLoader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, isError] = useFetching(async () => {
    const response = await PostService.getPostById(params.id);
    setPost(response.data);
  });

  const [fetchCommentById, commentIsLoading, commentIsError] = useFetching(async () => {
    const response = await PostService.getCommentById(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchCommentById(params.id);
  }, []);

  return (
    <div>
      {(isLoading || commentIsLoading) ?? <MyLoader />}
      <h1>Correct Page number: {params.id}</h1>
      <h3>{post.title}</h3>
      <hr />
      <h4>{post.body}</h4>
      <div>
        <div style={{ marginTop: 30, marginBottom: 30 }}>Comments:</div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <hr />
            <p>
              <strong>Author:</strong> {comment.email}
            </p>
            <p>Description: {comment.email}</p>
            <p>Text: {comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostIdPage;
