import React from 'react'
import { Helmet } from "react-helmet-async";

const Error = () => {
  return (
   <>
     <Helmet>
        <title>ERROR 404</title>
        <meta name="description" content="ERROR 404"/>
      </Helmet>
     <b>404 The page Not Found</b>
   </>
  )
}

export default Error;