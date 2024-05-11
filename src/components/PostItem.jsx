/* eslint-disable react/prop-types */
import MyButton from '../UI/MyButton/MyButton';

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        {/* <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>Открыть</MyButton> */}
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
