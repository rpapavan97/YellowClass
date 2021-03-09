import React, { useState, useEffect } from "react";
import { Heading } from "./components/Heading";
import { Loader } from "./components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import "./App.css";

import axios from "axios";

function App() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setIndex] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const UnsplashImage = ({ url, index }) => (
    <img
      src={url}
      alt=""
      onClick={() => {
        setIndex(index);
        setisOpen(true);
        console.log(index);
      }}
    />
  );

  useEffect(() => {
    fetchImages();
  });

  const fetchImages = () => {
    const apiRoot = "https://api.unsplash.com";
    const accesskey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accesskey}&count=20`)
      .then((res) => setImages([...images, ...res.data]));
  };

  const breakpointColumnsObj = {
    default: 7,
    1200: 4,
    950: 3,
    768: 2,
    576: 1,
  };

  return (
    <>
      <Heading />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {selected
            ? null
            : images.map((image, index) => (
                <UnsplashImage url={image.urls.thumb} index={index} />
              ))}
        </Masonry>
      </InfiniteScroll>
    </>
  );
}

export default App;
