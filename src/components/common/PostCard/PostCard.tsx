import * as React from 'react';
import { Link } from 'gatsby';
import { Tags } from '@tryghost/helpers-gatsby';
import { readingTime as readingTimeHelper } from '@tryghost/helpers';
import './PostCard.scss';

interface Tag {
  name?: string;
}

interface Post {
  slug: string;
  title: string;
  primary_tag?: {
    slug?: string;
  };
  feature_image?: string;
  featured?: boolean;
  tags?: Tag[];
  excerpt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const postTag = post.primary_tag ? post.primary_tag.slug : 'post';
  const url = `/${postTag}/${post.slug}/`;
  const readingTime = readingTimeHelper(post);

  return (
    <Link to={url} className='post-card'>
      <header className='post-card-header'>
        {post.feature_image && (
          <div
            className='post-card-image'
            style={{
              backgroundImage: `url(${post.feature_image})`,
            }}
          />
        )}
        {post.tags && (
          <div className='post-card-tags'>
            {' '}
            <Tags post={post} visibility='public' autolink={false} />
          </div>
        )}
        {post.featured && <span>Featured</span>}
        <h2 className='post-card-title'>{post.title}</h2>
      </header>
      <section className='post-card-excerpt'>{post.excerpt}</section>
      <footer className='post-card-footer'>
        <div className='reading-time'>
          <div>{readingTime}</div>
        </div>
      </footer>
    </Link>
  );
};

export default PostCard;
