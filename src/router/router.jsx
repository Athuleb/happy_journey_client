import React from "react"
import { createBrowserRouter } from 'react-router-dom'
import Mainlayout from "../layout/Mainlayout"
import TravelScope from "../modules/destinations/TravelScope"
import ScrollDown from "../modules/scrolldown/ScrollDown"
import Explore from "../modules/explore/Explore"
import SearchResult from "../Search/SearchResult"





const route = createBrowserRouter([
    {
        index:"/",
        element: <Mainlayout />,
        children: [
            {
                index:true,
                element: <ScrollDown />, 
            },
            {
                path: '/travel-scope',
                element: <TravelScope /> 
            },
            {
                path:'/explore',
                element:<Explore/>
            },
            {
                path:'/search',
                element:<SearchResult/>
            }

        ]
    }



])

export default route