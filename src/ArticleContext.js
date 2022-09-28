import React, { useState, createContext } from 'react';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [articlesList, setArticlesList] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [usersArticles, setUsersArticles] = useState([]);

    const value = {
        error: error,
        article: article,
        author: author,
        user: user,
        comments: comments,
        articlesList: articlesList,
        authorsList: authorsList,
        usersArticles: usersArticles,
        setError: setError,
        setArticle: setArticle,
        setAuthor: setAuthor,
        setUser: setUser,
        setComments: setComments,
        setArticlesList: setArticlesList,
        setAuthorsList: setAuthorsList,
        setUsersArticles: setUsersArticles,
    }

    return (
        <ArticleContext.Provider value={value}>
            {children}
        </ArticleContext.Provider>
    )
}