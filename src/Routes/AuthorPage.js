import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleContext } from '../ArticleContext';
import { dummyAuthors } from '../assets/dummy_files/dummyAuthors';
import ArticleListItem from '../Components/ArticleListItem';

//import AuthorApiService from '../Services/AuthorApiService';


export default function AuthorPage() {
    let params = useParams();

    const { error, setError, author, setAuthor, articlesList, setArticlesList } = useContext(ArticleContext);

    useEffect(() => {
        const { username } = params.username;
        setError(null);
        setAuthor(dummyAuthors);
        setArticlesList(dummyAuthors.articles);

        return () => {
            setAuthor({});
            setArticlesList([]);
        }
    }, [])

    console.log(articlesList, 'AuthorPage');

    const renderAuthor = () => {
        if (!author.profile_image) {
            author.profile_image = "https://travelog-files.s3-us-west-1.amazonaws.com/icons/profile.png";
        }

        if (articlesList.length === 0) {
            return (
                <section className='section_content author_section'>
                    <div className='author_bio' >
                        <div>
                            <img src={author.profile_image} alt={"User Profile"} />
                        </div>
                        <h2>{author.name}</h2>
                        <p>{author.about}</p>
                    </div>
                </section>
            )
        }

        return (
            <>
                <section className='section_content author_section'>
                    <div className='author_bio' >
                        <div>
                            <img src={author.profile_image} alt={"User Profile"} />
                        </div>
                        <h2>{author.name}</h2>
                        <p>{author.about}</p>
                    </div>
                </section>
                <section className='section_content articles_section'>
                    <ul>
                        {articlesList.map((article, i) => {
                            return <ArticleListItem key={i} article={article} />
                        })}
                    </ul>
                </section>
            </>
        );
    }

    let content;
    if (error) {
        content = (error.error === "Author doesn't exist")
            ? <h2 className='error'>Sorry, this user was not found.</h2>
            : <h2 className='error'>There was an error in the server. Please try again later.</h2>
    } 
    else if (!author.username) {
        content =   <div className="loader">
                        <div className="spinner"></div>
                    </div>
    }
    else {
        content = renderAuthor();
    }

    return (
        <>
            {content}
        </>
    )
}