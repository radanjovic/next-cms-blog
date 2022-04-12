import {useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import {getComments} from '../helpers';

export default function Comments({slug}) {
    const [comments, setComments] = useState([]);

    useEffect( () => {
        getComments(slug).then(res => {
            setComments(res)
        })
    }, [])

    return <>
        {comments.length > 0 ? (
            <div className='bg-[#827397] text-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                    {comments.length === 1 ? '1 Comment': `${comments.length} Comments`}
                </h3>
                {comments.map(comment => (
                <div key={comment.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
                    <p className='mb-4'>
                        <span className='font-semibold'>{comment.name}</span>
                        <span className='font-normal text-sm text-gray-300'>{' '}
                        on
                        {' '}
                        {moment(comment.createdAt).format('MMM DD, YYYY')}</span>
                    </p>
                    <p className='whitespace-pre-line text-white w-full'>{parse(comment.comment)}</p>
                </div>))}
            </div>
        ) : (<div className='bg-[#827397] text-gray-300 shadow-lg rounded-lg p-8'>
            <p>No Comments Yet. Be The First One to Comment on This Post.</p>
        </div>)}
    </>
}