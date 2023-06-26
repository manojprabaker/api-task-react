import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Home.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setdata] = useState([]);
  // const [limit, setlimit] = useState(111);
  const [pageCount, setpageCount] = useState(12);
  const [sortCat, setsortCat] = useState("flight_number");
  const [sortBy, setsortBy] = useState("asc");
  const [pageOffset, setpageOffset] = useState(0);
  //const [pPP, setpPP] = useState(10);

  const [perPage, setperPage] = useState(10);
  const [setdataLength, setsetdataLength] = useState(111);
  const navigate = useNavigate();
  useEffect(() => {
    getUpdatedApi();
    getDataApi();
  }, []);
  useEffect(() => {
    getDataApi();
  }, [pageOffset, perPage, sortCat, sortBy]);

  const getDataApi = () => {
    axios
      .get(
        `https://api.spacexdata.com/v3/launches?limit=${perPage}&offset=${pageOffset}&sort=${sortCat}&order=${sortBy}`
      )
      .then((res) => {
        console.log("data", res.data);
        setdata(res.data);
      })
      .catch((error) => console.log(error));
  };
  // console.log(data.length);

  // const [page, setPage] = useState(1);
  const handlePageChange = (e, value) => {
    //console.log(value);
    let t = perPage;
    let vals = (value - 1) * t;
    console.log(vals);
    setpageOffset(vals);
    // getDataApi();
  };
  const options = ["10", "25", "50", "75", "100"];
  const defaultOption = options[0];
  const onSelect = (e) => {
    let pP = parseInt(e.value);
    //setpPP(pP);
    setperPage(pP);
    console.log(e.value);
    let temp = parseInt(setdataLength / pP + 1);
    console.log(temp);
    setpageCount(temp);
    // let offset = pageOffset * e.value;
    // console.log(offset);
    // let limit = data.length / pP;
    // limit = parseInt(limit + 1);
    // console.log(limit);
    // setpageCount(limit);
    // getDataApi();
  };
  const sortCategory = ["Flight Number", "Mission Name", "Launch Year"];
  let defCategory = sortCategory[0];
  const onSelected = (e) => {
    console.log(e.value);
    if(e.value=="Flight Number")
    {
      let tee="flight_number"
      setsortCat(tee);
    }
    else if(e.value=="Mission Name")
    {
      let tee="mission_name"
      setsortCat(tee);
    }
    else{
      let tee="launch_year"
      setsortCat(tee);
    }
    //setsortCat(e.value);
  };
  const sortOrder = ["Ascending", "Descending"];
  let defSortorder = sortOrder[0];
  const sortOrderfn = (e) => {
    console.log(e.value);
    if (e.value == "Ascending") {
      let te = "asc";
      setsortBy(te);
    } else {
      let te = "desc";
      setsortBy(te);
    }
    //setsortBy(e.value);
  };

  const getUpdatedApi = () => {
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((res) => {
        console.log("data", res.data);
        //setdata(res.data);
        setsetdataLength(res.data.length);
      })
      .catch((error) => console.log(error));
  };
  const goNext = (n) => {
    //console.log("he",n);
    navigate(`/Details?no=${n}`);
  };
  return (
    <div>
      <div className="sort-div">
        <div className="sortings">
          <span>Items Per Page</span>{" "}
          <Dropdown
            options={options}
            onChange={onSelect}
            value={defaultOption}
            className="perpage"
          />
        </div>
        <div className="sortings">
          <span>Sort By</span>
          <Dropdown
            options={sortCategory}
            onChange={onSelected}
            value={defCategory}
            className="sortby"
          />
        </div>
        <div className="sortings">
          <span>Sort Order</span>
          <Dropdown
            options={sortOrder}
            onChange={sortOrderfn}
            value={defSortorder}
            className="sortorder"
          />
        </div>
      </div>
      <div className="main-div">
        {data?.map((d, index) => {
          return (
            <div key={index} className="rocket-box">
              {d.flight_number}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 10 }}
                  image="{d.links.flickr_images[0]}"
                  title="green iguana"
                />
                <img src={d.links.flickr_images[0]} style={{ width: "100%" }} />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {d.mission_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {d.details}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => goNext(d.flight_number)}>
                    Deails
                  </Button>
                  <Button size="small">
                    <a
                      href={d.links.wikipedia}
                      target="_blank"
                      className="wikipedia"
                    >
                      Wikipedia
                    </a>
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          count={pageCount}
          color="secondary"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;

// [13:55, 6/23/2023] Monisha Fabevy: List page: Mission name (mission_name) Details (details) Image (flickr_images) Btns => view detail => rocket full detail, link => wikipedia (wikipedia) Detail page: Mission name Details Image => slides link => wikipedia
// [13:55, 6/23/2023] Monisha Fabevy: GET All Launches URL: https://api.spacexdata.com/v3/launches
// [13:55, 6/23/2023] Monisha Fabevy: GET One Launch URL: https://api.spacexdata.com/v3/launches/{{flight_number}}
// [13:57, 6/23/2023] Monisha Fabevy: List page: Per Page => dropdown => 10, 25, 50, 75, 100 Sort => flight_number, mission_name, launch_year Order => asc, desc https://api.spacexdata.com/v3/launches?limit=10&offset=0&sort=flight_number&order=asc
