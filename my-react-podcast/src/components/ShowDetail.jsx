import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show:", error);
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>
    </div>
  );
};
export default ShowDetail;
