import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";
// import useFetch from "../hooks/useFetch"; it is useful for rest API

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
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

export default function ReviewDetails() {
  const { id } = useParams();
  //used for rest API
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews/" + id
  // );
  // const detailData = data?.data?.attributes;

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const detailData = data?.review?.data?.attributes;
  console.log(data);

  return (
    <div className="review-card">
      <div className="rating">{detailData.rating}</div>
      <h2>{detailData.title}</h2>

      {detailData?.categories?.data.map((c) => (
        <small key={c.id}>{c.attributes.name}</small>
      ))}

      <p>
        <ReactMarkdown>{detailData.body}</ReactMarkdown>
      </p>
    </div>
  );
}
