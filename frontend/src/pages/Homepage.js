import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
// import useFetch from "../hooks/useFetch"; it is useful for rest API

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default function Homepage() {
  //used for rest API
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews"
  // );
  // const listData = data?.data;

  const { loading, error, data } = useQuery(REVIEWS);
  const listData = data?.reviews?.data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log(data);

  return (
    <div>
      {listData?.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          {review.attributes?.categories?.data.map((c) => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}

          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
