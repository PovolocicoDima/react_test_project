/* eslint-disable react/prop-types */
import MyInput from './UI/MyInput/MyInput';
import MySelect from './UI/MySelect/MySelect';

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="find some"
      />
      <MySelect
        value={filter.sort}
        defaultValue="sorting by"
        onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
        options={[
          { value: 'title', name: 'By title' },
          { value: 'body', name: 'By description' }
        ]}
      />
    </div>
  );
};

export default PostFilter;
