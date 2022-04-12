import {useState, useEffect, useRef} from 'react';
import {submitComment} from '../helpers';

export default function CommentsForm({slug}) {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const commentRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const storeDataRef = useRef();

    useEffect( () => {
        nameRef.current.value = window.localStorage.getItem('name');
        emailRef.current.value = window.localStorage.getItem('email');
    }, [])

    function handleSubmitComment() {
        setError(false);

        const comment = commentRef.current.value;
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const storeData = storeDataRef.current.checked;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = {
            name, email, comment, slug
        }

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }

        submitComment(commentObj);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
        commentRef.current.value = '';
        nameRef.current.value = '';
        emailRef.current.value = '';
    }

    return <div className='bg-[#827397] text-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Comment</h3>
        <div className='grid grid-cols-1 gap-4 mb-4'>
            <textarea className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:bg-gray-200 bg-gray-100 text-gray-700' placeholder='Add a Comment...' name='comment' ref={commentRef} required />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <input type='text' ref={nameRef} className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:bg-gray-200 bg-gray-100 text-gray-700' name='name' placeholder='Your Name' required />
            <input type='email' ref={emailRef} className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:bg-gray-200 bg-gray-100 text-gray-700' name='email' placeholder='Your Email' required />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
            <div>
                <input ref={storeDataRef} type='checkbox' id='storeData' name='storeData' value='true' />
                <label htmlFor='storeData' className='text-gray-200 cursor-pointer ml-2'>Save my email and name for the next time I comment</label>
            </div>
        </div>
        {error && <p className='text-xs text-red-500'>All fields are required</p>}
        <div className='mt-8'>
            <button type='button' onClick={handleSubmitComment} className='transition duration-500 ease hover:bg-[#363062] inline-block bg-[#4D4C7D] text-lg rounded-lg text-white px-8 py-3 cursor-pointer'>Submit Comment</button>
        </div>
        {showMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}
    </div>
}