import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = () => {
  const params = useParams();
  const [sessionSport, setsessionSport] = useState(null);
  const getSessionSport = async () => {
    try {
      const { data } = axios.get(`/planification/${params.id}`);
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    getSessionSport();
  }, []);

  return <div>Details</div>;
};
export default Details;
