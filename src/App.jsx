import { useEffect, useState } from 'react';
import './styles/App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './UI/MyModal/MyModal';
import MyLoader from './UI/MyLoader/MyLoader';
import MyButton from './UI/MyButton/MyButton';
import { usePosts } from './hooks/usePosts';
import { useFetching } from './hooks/useFetching';
import PostService from './API/PostService';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [fetchPosts, isLoading, isError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const cretePost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={cretePost} />
      </MyModal>
      <hr style={{ margin: '15px, 0px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {isError ?? <h1>{isError}</h1>}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MyLoader />
        </div>
      ) : (
        <PostList
          loading={isLoading}
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="JS POSTS!"
        />
      )}
    </div>
  );
}

export default App;
