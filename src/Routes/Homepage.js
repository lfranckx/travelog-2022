import '../Styles/Homepage.scss';
import React, { useContext, useEffect } from 'react';
import { ArticleContext } from '../ArticleContext';
import ArticleListItem from '../Components/ArticleListItem';
import dummyArticles from '../assets/dummy_files/dummyArticles';

export default function Homepage() {
    const { error, setError, articlesList, setArticlesList } = useContext(ArticleContext);
    
    useEffect(() => {
        setError(null);
        setArticlesList(dummyArticles);
    }, []);

    if (articlesList.length === 0) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        );
    }
    
    const articles = articlesList.map((article, i) => {
        return (
            <ArticleListItem key={i} article={article} />
        );
    });
    
    return (
        <section className='section_content'>
            <div className='section_title'>
                <h2>Share authentic Travel Stories</h2>
                <h3>Connect with other travelers and inspire</h3>
            </div>

            <h3 className='italic'>Stories,</h3>
            {
                error ? <h2 className='error'>There was an error.</h2> 
                : <ul>{articles}</ul>
            }
        </section>
    )
}