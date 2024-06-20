import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

export default function ShowDetail() {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showDetails) {
    return <div>No show details available.</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Image src={showDetails.image} fluid />
        </Col>
        <Col md={8}>
          <h1>{showDetails.title}</h1>
          <p>{showDetails.description}</p>
          <h3>Seasons:</h3>
          {showDetails.seasons.map((season) => (
            <Card key={season.id} className="mb-3">
              <Card.Body>
                <Card.Title>Season {season.seasonNumber}</Card.Title>
                <Card.Text>
                  <ul>
                    {season.episodes.map((episode) => (
                      <li key={episode.id}>{episode.title}</li>
                    ))}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
