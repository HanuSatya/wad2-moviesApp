import React from "react";
import { useParams } from "react-router-dom";
import PersonDetails from "../components/personDetails";
import PageTemplate from "../components/templatePersonPage";//here to ajust postions
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { getPerson } from "../api/tmdb-api";
//import TemplateMovieRecom from "../components/templateMoiveRecommendations"
//moive info page
const PersonDetailsPage = (props) => {
  const { person_id } = useParams();

  const { data: person, error, isLoading, isError } = useQuery(
    ["person", { person_id: person_id }],
    getPerson
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {person ? (
        <>
          <PageTemplate person={person}>
            <PersonDetails person={person}>    
            </PersonDetails>
          </PageTemplate> 

        </>
      ) : (
        <p>Waiting for person details</p>
      )}
    </>
  );
};

export default PersonDetailsPage;