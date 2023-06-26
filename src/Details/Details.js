import React from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "./Details.css";
const Details = () => {
  const [data, setdata] = useState([]);
  const [images, setimages] = useState([]);
  const [searchParams] = useSearchParams();
  let sp = searchParams.get("no");
  console.log(sp);

  useEffect(() => {
    getSingleData();
    console.log(images);
    //  console.log(data);
    // console.log(images.length);
    // if (images.length == 0) {
    //   setimages([
    //     "https://global.jaxa.jp/projects/rockets/h3/images/h3_main_001.jpg",
    //   ]);
    //   console.log("no img");
    // }
    // else{

    // }
  }, []);
  const getSingleData = () => {
    axios
      .get(`https://api.spacexdata.com/v3/launches/${sp}`)
      .then((res) => {
        console.log("data", res.data);

        setimages(res.data.links.flickr_images);
        console.log(res.data.links.flickr_images);
        setdata(res.data);
      })
      .catch((error) => console.log(error));
    //let tt=data.links.flickr_images.length;
    // console.log(tt);
  };

  //   ------------slick-carousel--------------

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1,
    cssEase: "linear",
  };
  return (
    <div>
      <div className="rocket-box-single">
        {data.flight_number}
        <Card sx={{ width: "100%" }}>
          <Slider {...settings}>
            {images.map((im) => {
              return <img src={im} className="flickr-img"/>;
            })}
          </Slider>
          {/* <img src={images}  style={{ width: "100%"}}/> */}
          {/* <img src={data.links.flickr_images.length?data.links.flickr_images[0]:"https://global.jaxa.jp/projects/rockets/h3/images/h3_main_001.jpg"} style={{ width: "100%" }} /> */}
          {/* <div>{data.links.flickr_images[0]}</div> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.mission_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.details}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Details;
