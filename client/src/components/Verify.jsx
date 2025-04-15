import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/info";

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState({message:"Verifying..." , code:200});
  const id = searchParams.get("id");


  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/users/verify?id=${id}`)
        .then((response) => {
            console.log(response.data)
          if (response.status===200) {
            setStatus({...status , message:"Verification Successful!" , code:null  });
          } else {
            setStatus({...status , message:"Verification Failed. Please try again." , code:status.code});
          }
        })
        .catch((error) => {
          console.error(error);
          setStatus({...status , message:"Verification Failed. Please try again." , code:status.code});
        });
    } else {
      setStatus({...status , message:"Id not provided in the url" , code:status.code});
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verification Page</h1>
      <p className=" mt-4 bg-blue-500 text-white text-2xl font-semibold">{status.message}</p>
      { status.code===200 && <Link to={'/login'}><button  className="py-2 px-4 bg-green-600 text-white rounded-sm ">
        Now Go to Login Page and Enter Same Email & Pasword
        </button>
      </Link> }
    </div>
  );
};

export default Verify;



