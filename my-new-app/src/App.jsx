import { useState, useEffect } from "react";
import blogPostsImage from "./assets/images/blog-posts.png";
import errorMessageImage from "./assets/images/error-message.png";

// Component for fetching data
const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      // If the response is not "ok", throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Return the JSON data from the response
  } catch (error) {
    // Rethrow the error to be handled by the component
    throw new Error(error.message);
  }
};

// Main App component
export default function App() {
  const [data, setData] = useState([]); // State for storing fetched data
  const [error, setError] = useState(null); // State for storing error messages
  const [loading, setLoading] = useState(true); // State for managing loading state

  useEffect(() => {
    // Function to fetch data and handle state updates
    const loadData = async () => {
      try {
        const result = await fetchPosts(); // Fetch data using the fetchPosts function
        setData(result); // Update state with fetched data
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to fetch data. Please try again later."); // Update state with error message
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    loadData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once on mount

  // Conditional rendering based on state
  if (loading) {
    return <div className="loading-div">Loading...</div>; // Display loading message
  }

  if (error) {
    return (
      <div className="error-div">
        <img src={errorMessageImage} alt="Error Message" />
        <p>An error has occurred: {error}</p>
      </div>
    ); // Display error message
  }

  return (
    <div>
      <h1>Posts</h1>
      <img src={blogPostsImage} alt="Blog Posts" />
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
