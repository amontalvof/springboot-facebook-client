import axios from 'axios';
import orderBy from 'lodash.orderby';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost, addAllPost } from '../redux/reducers/postSlice';
import Post from './Post';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const orderedPosts = orderBy(posts, ['timeStamp'], ['desc']);
    useEffect(() => {
        const fetchData = () => {
            const response = axios
                .get(process.env.NEXT_PUBLIC_FACEBOOK_CLONE_ENDPOINT)
                .then((response) => {
                    dispatch(addAllPost(response.data));
                });
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {orderedPosts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default Posts;
