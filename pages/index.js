import PostCard from '../components/PostCard';
import Categories from '../components/Categories';
import PostWidget from '../components/PostWidget';
import FeaturedPosts from '../components/FeaturedPosts';

import {getPosts} from '../helpers';

export default function HomePage({posts}) {
  return <div className="container mx-auto px-10 mb-8">

    <FeaturedPosts />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

      <div className="lg:col-span-8 col-span-1">
        {posts.map((post, i) => <PostCard key={post.node.title} post={post.node} />)}
      </div>

      <div className="lg:col-span-4 col-span-1">
        <div className="lg:sticky relative top-8">
          <PostWidget />
          <Categories />
        </div>
      </div>

    </div>

  </div>
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props : {
      posts,
    }
  }
}