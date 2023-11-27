import axios from "axios";
import React, { useEffect, useState } from "react";


const BlogWebStory = () => {
  const apiUrl = 'https://api.v2.makestories.io/channel/-Nhl244Ii0yriiLoAnZP/stories';
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data, 'response.data')
        setData(response.data.stories); // Update the state with the retrieved data
        setLoading(false); // Set loading to false once data is available
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);


  return (
    <>
      <div id="blog-idea">
        {/* <span id="idea-one">Idea Collection</span> */}
        <span id="idea-one">Our Curated Web stories</span>

        <div id="idea-list" style={{ justifyContent: "flex-start" }}>
          {loading ? (
            <p>Loading data...</p>
          ) : Array.isArray(data) ? (
            data.map((item) => (
              <a href={item.url} target="_blank" key={item.id}>
                <div id="blog-webstory-card">
                  <img
                    src={item.SEO.image}
                  />
                  {/* <span id="nig">{item.title}</span> */}
                  {/* <div>
                    Explore <span>{'>'}</span>
                  </div> */}
                  <div id="idea-cover"></div>
                </div>
              </a>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>

      </div >
    </>
  );
};

export default BlogWebStory;
