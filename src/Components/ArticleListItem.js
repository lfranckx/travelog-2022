import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleListItem(props) {
    const { article } = props;

    return (
        <li className='article_list_item'>
            <div className='article_wrap'>
                <article>
                    <div className='article_content'>
                        <h4>{article.author}</h4>
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                        <Link to={`/article/${article.id}`}>Read more...</Link>
                    </div>
                </article>
            </div>
        </li>
    )
}