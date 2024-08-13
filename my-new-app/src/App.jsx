import { response } from "express";
import React, {useEffect, useState} from "react"
import errorMessage from "./assets/images/error-message.png"
import BlogPostsImage from"./assets/images/blog-posts.png" 


export default function App(){
  const[data, setData] = useState([]);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);

      } catch(error) {
        setError("Failed to fetch data. Please try again later.");
      } finally{
        setLoading(false);

      }


    };
    fetchData();

  }, []);

  if(loading) {
    return <div className="loading-div">Loading...</div>;

  }
  if(error) {
    return(
      <div className="error-div">
        <img src={errorMessage} alt="Error Message" />
        <p>An error has occurred: {error}</p>
      </div>
    );
  }

  return(
    <div>
      <h1>Post</h1>
    <img src={BlogPostsImage} alt="Blog Posts" />
    <ol>
      {data.map((post) => (
      <li key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </li>
    ))}
    </ol>
    </div>
  );
}
