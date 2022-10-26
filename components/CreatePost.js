/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoMdPhotos } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsEmojiSmile } from 'react-icons/bs';
import { addPost } from '../redux/reducers/postSlice';

const CreatePost = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const hiddenFileInput = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);
    const [imageError, setImageError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputRef.current.value) return;
        const formData = new FormData();
        formData.append('file', imageToPost);
        formData.append('post', inputRef.current.value);
        formData.append('name', session?.user.name);
        formData.append('email', session?.user.email);
        formData.append('profilePic', session?.user.image);

        axios
            .post(process.env.NEXT_PUBLIC_FACEBOOK_CLONE_ENDPOINT, formData, {
                headers: { Accept: 'application/json' },
            })
            .then((response) => {
                inputRef.current.value = '';
                dispatch(addPost(response.data));
                removeImage();
            })
            .catch((error) => {
                console.error(error);
            });
        setImageError('');
    };

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const addImageToPost = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        const fileSize = event.target.files[0]?.size;
        const fiveHundredKB = 512000;
        if (file) {
            if (fileSize <= fiveHundredKB) {
                setImageError('');
                reader.readAsDataURL(event.target.files[0]);
                reader.onload = (event) => {
                    setImageToPost(event.target.result);
                };
            } else {
                setImageError('File size must be less than 500KB');
            }
        }
    };

    const removeImage = () => {
        setImageToPost(null);
        setImageError('');
    };

    return (
        <div className="bg-white rounded-md shadow-md text-gray-500 p-2 divide-y">
            <div className="flex p-4 space-x-2 items-center">
                <Image
                    src={session?.user?.image}
                    height={40}
                    width={40}
                    className="rounded-full cursor-pointer"
                    alt="Profile Picture"
                />
                <form className="flex flex-1">
                    <input
                        className="rounded-full h-12 flex-grow focus:outline-none font-medium bg-gray-100 px-4"
                        type="text"
                        ref={inputRef}
                        placeholder={`What's on your mind, ${session?.user.name}?`}
                    ></input>
                    <button hidden onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
            {imageToPost && (
                <div
                    onClick={removeImage}
                    className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer"
                >
                    <img
                        src={imageToPost}
                        className="h-10 object-contain"
                        alt="post image"
                    />
                    <RiDeleteBin6Line className="h-8 hover:text-red-500" />
                </div>
            )}
            {imageError && (
                <p className="text-red-500 text-xs text-center">{imageError}</p>
            )}
            <div className="flex justify-evenly py-2">
                <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md">
                    <HiOutlineVideoCamera className="text-red-500" size={20} />
                    <p className="font-semibold text-gray-600">Live Video</p>
                </div>
                <div
                    onClick={handleClick}
                    className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md"
                >
                    <IoMdPhotos className="text-green-500" size={20} />
                    <p className="font-semibold text-gray-600">Photo/Video</p>
                    <input
                        ref={hiddenFileInput}
                        onChange={addImageToPost}
                        type="file"
                        accept="image/*"
                        hidden
                    />
                </div>
                <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:cursor-pointer hover:bg-gray-100 rounded-md">
                    <BsEmojiSmile className="text-yellow-400" size={20} />
                    <p className="font-semibold text-gray-600">
                        Feeling/Activity
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
