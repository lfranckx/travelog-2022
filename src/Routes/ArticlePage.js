import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArticleContext } from '../ArticleContext';
import Comments from '../Components/Comments';
import dummyArticles from '../assets/dummy_files/dummyArticles';
import { dummyComments } from '../assets/dummy_files/dummyComments';

export default function ArticlePage() {
    let params = useParams();
    
    const { error, setError, article, setArticle, comments, setComments } = useContext(ArticleContext);

    useEffect(() => {
        const articleId = params.articleId;
        setError(null);
        setArticle(dummyArticles[articleId]);
        setComments(dummyComments);
        return () => {
            setArticle({});
        }
    }, [])

    const renderArticle = () => {
        const noimage = "https://travelog-files.s3-us-west-1.amazonaws.com/icons/noimage.png";
        if (!article.image_url) {
            article.image_url = noimage;
        }

        return (
            <>
                <section className='section_content'>
                    <div className='section_title'>
                        <h2>{article.title}</h2>
                        <div className='img_wrap'>
                            <Link to={`/author/${article.username}`}>
                                <img src={article.profile_image} alt='Profile Image' className='profile_image' />
                            </Link>
                        </div>
                        <h3>Article written by <Link to={`/author/${article.username}`}>{article.author}</Link></h3>
                    </div>
                    <div className='article_body'>
                        <p>{article.body}</p>
                    </div>
                </section>
                <Comments article={article} comments={comments} />
            </>
        )
    }

    let content;
    if (error) {
        content = (error.error === "Article doesn't exist")
        ? <h2 className='error'>Sorry, this article does not exist.</h2>
        : <h2 className='error'>There was an error in the server. Please try again later.</h2>
    } 
    // else if (!article.id) {
    //     content = <div className="loader"><div className="spinner"></div></div>;
    // } 
    else {
        content = renderArticle();
    }

    return <>{content}</>;
}