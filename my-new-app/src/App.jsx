import React, {useState} from "react"

export default function App(){
  const[data, setData] = useState([]);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(true);

  return(
    <div>
      <h1>Post</h1>
    </div>
  );
}
export default App
