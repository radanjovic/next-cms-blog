import {useState, useEffect} from 'react';
import Link from 'next/link';

import { getCategories } from '../helpers';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        getCategories().then(res => setCategories(res));
    }, [])

    return <div className='bg-[#827397] text-white shadow-lg rounded-lg p-8 mb-8 '>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            Categories
        </h3>
        {categories.map(cat => <Link key={cat.slug} href={`/category/${cat.slug}`}>
            <span className='cursor-pointer block pb-3 mb-3'>{cat.name}</span>
        </Link>)}
    </div>
}