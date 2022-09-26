import React, { useContext } from 'react';
import { ArticleContext } from '../ArticleContext';
import { Link } from 'react-router-dom';
import '../Styles/Comments.scss';

export default function Comments (props) {
    const { comments, article } = props;
    const { user, setComment } = useContext(ArticleContext);

    console.log(comments);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const { comment } = ev.target;
        const newComment = {
            comment: comment.value,
            username: user.username,
            author_name: user.name,
            profile_image: user.profile_image,
            article_id: article.id
        }

        setComment(newComment);
    }

    if (user) {
        return (
            <section className='section_content'>
                <form className='comment_post-form'
                    onSubmit={handleSubmit}
                >
                    <div className='field-wrap'>
                        <textarea
                            rows="5"
                            name="comment"
                            aria-label="comment"
                            className="comment"
                            placeholder="Leave a comment"
                            required
                        ></textarea>
                    </div>
                    <button className='btn'>Post</button>
                </form>
            </section>
        )
    }

    if (comments.length > 0) {
        return <ArticleComments comments={comments} />
    }
}

function ArticleComments ({ comments = []}) {
    return (
        <section className='section_content'>
            <ul className='comments-list'>
                {comments.map(comment => 
                    <li key={comment.id} className='comment-list_item'>
                        <Link to={`/author/${comment.username}`}>
                            <div className='user_link'>
                                <div className='img_wrap'><img src={comment.profile_image} alt='User Profile' /></div>
                                <p className='username'>{comment.author_name}</p>
                            </div>
                        </Link>
                        <p className='comment'>{comment.comment}</p>
                    </li>    
                )}
            </ul>
        </section>
    );
}