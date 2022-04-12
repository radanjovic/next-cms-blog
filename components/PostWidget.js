import moment from 'moment';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { getRecentPosts, getSimilarPosts } from '../helpers';

export default function PostWidget({categories, slug}) {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect( ()=> {
        if (slug) {
            getSimilarPosts(categories, slug).then(res => setRelatedPosts(res));
        } else {
            getRecentPosts().then(res => setRelatedPosts(res));
        }
    }, [slug]);

    return <div className='bg-[#827397] text-white shadow-lg rounded-lg p-8 mb-8'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {slug ? 'Related Posts' : 'Recent Posts'}
        </h3>
        {relatedPosts.map(post => <div key={post.title} className='flex items-center w-full mb-4'>
            <div className='w-16 flex-none'>
                <img alt={post.title} height='60px' width='60px' className='align-middle rounded-lg' src={post['featured_image'].url} />
            </div>
            <div className='flex-grow ml-4'>
                <p className='text-gray-200 text-xs'>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <Link href={`/post/${post.slug}`} className='text-md'>
                    {post.title}
                </Link>
            </div>
        </div>)}
    </div>
}