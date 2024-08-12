import { response } from "express";
import React, {useEffect, useState} from "react"

export default function App(){
  const[data, setData] = useState([]);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try{
        constresponse = await fetch("https://jsonplaceholder.typicode.com/posts");
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

  return(
    <div>
      <h1>Post</h1>
    </div>
  );
}
