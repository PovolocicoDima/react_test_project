import { useEffect, useRef, useState } from 'react';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import { getPageCount } from '../utils/pages';
import MyButton from '../components/UI/MyButton/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MyLoader from '../components/UI/MyLoader/MyLoader';
import MyPagination from '../components/UI/MyPagination/MyPagination';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import { useObserver } from '../hooks/useObserver';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [fetchPosts, isLoading, isError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const lastItem = useRef(null);
  useObserver(lastItem, page < totalPages, isLoading, () => {
    setPage(page + 1);
  });
  useEffect(() => {
    fetchPosts();
  }, [page]);

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
      <div ref={lastItem} style={{ height: 20, backgroundColor: 'red' }}></div>
      <MyPagination totalPages={totalPages} page={page} changePage={setPage} />
    </div>
  );
}

export default Posts;
