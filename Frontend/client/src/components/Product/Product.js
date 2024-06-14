import React from "react";
import { Link } from "react-router-dom";

import "./Product.css";
import ReportIcon from "@mui/icons-material/Report";
// import LanguageTwoToneIcon from '@mui/icons-materialLanguageTwoTone';
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import ClosedCaptionRoundedIcon from "@mui/icons-material/ClosedCaptionRounded";

import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import StarHalfSharpIcon from "@mui/icons-material/StarHalfSharp";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { SkeltonLoading } from "../LandingPage/Landin";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// import ListItemText from '@mui/material/ListItemText';
import Collapse from "@mui/material/Collapse";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import NoteAddSharpIcon from "@mui/icons-material/NoteAddSharp";
import SystemUpdateAltTwoToneIcon from "@mui/icons-material/SystemUpdateAltTwoTone";
import AllInclusiveTwoToneIcon from "@mui/icons-material/AllInclusiveTwoTone";
import PhoneAndroidTwoToneIcon from "@mui/icons-material/PhoneAndroidTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Header } from "../Header/Header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
axios.defaults.withCredentials = true;

export const Product = () => {
  const location = useLocation();
  const pathname  = (location.pathname).split("/");
  const loading = useRef(true);
  let author = "";
  const id = pathname[pathname.length - 1];

  const [ data,setData] = useState({});
  if (data?.visible_instructors?.length > 0){
    for (const inst of data.visible_instructors)
    author = author + " " + inst.display_name;
  console.log(author)
  }
  const [result, setResult] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/courses/${id}`).then((res) => {
      loading.current = false;
      setData(res.data.data);
      res.data.data.curriculum.sort((a, b) => a.sort_order - b.sort_order);
      const results = [];
      res.data.data.curriculum.map((curr) => {
        if (curr?._class === "chapter") {
          console.log(curr)

          results.push(curr);
        }});
      console.log(res.data.data);
      setResult(results);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <PlayCircleFilledRoundedIcon/> */}
      {loading.current ? (
        <>
          <SkeltonLoading />
          <SkeltonLoading />
        </>
      ) : (
<>
<div className="BlackBox">
        <div className="BBText">
          <div className="flex purpal">
            <h5>{data?.category || ""}</h5>
            <span className="icon">
              <ArrowRightSharpIcon />
            </span>
            <h5> {data?.sub_category || ""} </h5>
            <span className="icon">
              <ArrowRightSharpIcon />
            </span>
            <h5>{data?.sub_category || ""}</h5>
          </div>

          <h1 className="white headingTop1">
            {data?.title || "Python for Data Science and Machine Learning Bootcamp"}
          </h1>

          <h3 className="white">
          {data?.published_title || "Learn and grow with full lifetime access to this course."}
          </h3>

          <div>
            <span className=" Ybox">Bestseller</span>
            <span className="darkyellow">
              4.3
              <span>
                <StarPurple500SharpIcon />
                <StarPurple500SharpIcon />
                <StarPurple500SharpIcon />
                <StarPurple500SharpIcon />
                <StarHalfSharpIcon />
              </span>
            </span>
            <span className="purpal underline">({data?.rating > 0 ? data?.rating || "17,379" : "17,379"} rating)</span>
            <span className="white">185,449 students</span>
          </div>

          <div className="Bcreated">
            <span className="white">Created by </span>
            <span className="purpal underline">{author || ""}</span>
          </div>

          <div className="white BBbottom">
            <span className="BBicons">
              <ReportIcon />
            </span>
            <span className="BBbottomText">Last updated {data.updatedAt}</span>
            <span className="BBicons">
              {" "}
              <PublicTwoToneIcon />
            </span>
            <span className="BBbottomText">English</span>
            <span className="BBicons">
              <ClosedCaptionRoundedIcon />
            </span>
            <span className="BBbottomText">
              English [Auto], Indonesian [Auto],{" "}
            </span>
            <span className="BBbottomText underline">6more</span>
          </div>
        </div>

      </div>

      {/* ////////////////////////////-------fixBox---------------//////// */}

      <div className="fixBox FixB">
        <div className="innerFixBox">
          <div className="Ftop2lines">
            <div className="flex FTH">
              <h1 className="FT1">  {data.price !== 'Free' ? `₹${+ data?.price + 1000}` : ''}</h1>
              <span className="FT2"> {data.price} </span>
              {data.price !== 'Free' &&  <span className="FT3"> 75% off </span>}
              
            </div>
            <div className="red">
              <AccessAlarmsIcon />
              <span className="bold">5 hours</span> left at this price!
            </div>
          </div>

          <button className="gotocartBtn">Go to cart</button>
          <>
         {   (data.price !== 'Free') &&
          (
          <Link
            to="/payment"
            state={{ data: data.price - (data.price * 0.75) }}
          >
            <button className="buynowBtn">Buy now</button>
          </Link>)}
          </>
          

          <p className="center">30-Day Money-Back Guarantee</p>

          <div className="ThisCourse">
            <h4>This course includes:</h4>
            <p>
              <OndemandVideoSharpIcon /> {data?.curriculum[data?.curriculum.length - 1]["video"]} video
            </p>
            <p>
              <NoteAddSharpIcon /> {data?.curriculum[data?.curriculum.length - 1]["article"]} articles
            </p>
            <p>
              <SystemUpdateAltTwoToneIcon /> {data?.curriculum[data?.curriculum.length-1]["downlodable"]} downloadable resources
            </p>
            <p>
              <AllInclusiveTwoToneIcon /> Full lifetime access
            </p>
            <p>
              <PhoneAndroidTwoToneIcon /> Access on mobile and TV
            </p>
            <p>
              <EmojiEventsTwoToneIcon /> Certificate of completion
            </p>
          </div>

          <div className="flex gap underline pointer">
            <h4>Share</h4>
            <h4>Gift this course</h4>
            <h4>Apply Coupon</h4>
          </div>

          <div className="training">
            <h3>Training 5 or more people?</h3>
            <p>
              Get your team access to 6,000+ top Udemy courses anytime,
              anywhere.
            </p>
            <button className="buynowBtn btn2">Try Udemy Business</button>
          </div>
        </div>
      </div>
      <div className="MiddleMainDiv">
      <div className="MiddleContent">
      <h2>What you'll learn</h2>

      {result.map((curr) => 
              (
                <>
                {curr?.description &&    (       <div className="flex">
            <table>
              <tr className="MLcon flex">
                <td className="MLcon flex">
                  <span>
                    <DoneRoundedIcon />
                  </span>
                  <p>{curr.description}.</p>
                </td>

              </tr>


            </table>
          </div>)}

          </>
        ))}
        </div>

        <div className="CourseContent">
          <h2>Course content</h2>
          <div className="flex">
            {/* <p>15 sections • 110 lectures • 21h 5m total length</p>
            <h5 className="Expand">Expand all sectons</h5> */}
          </div>

          <div className="CourceMainBox">
            {result.map((curr) => 
              (
                          <div className="CourceBoxs">
                          <List sx={{ width: "100%" }}>
                            <ListItemButton onClick={handleClick}>
                              <div className="OpenBox flex">
                                {open ? (
                                  <ExpandLess className="openArrow" />
                                ) : (
                                  <ExpandMore className="openArrow" />
                                )}
                                <h4>{curr.title}</h4>
                                {/* <span className="CourseCTime">2 lecture • 7 min</span> */}
                              </div>
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 3 }}></ListItemButton>
                                <div className="AfterOpendiv">
                                  <div className="flex ConDiv">
                                    <PlayCircleFilledRoundedIcon className="playIcon" />
                                    <p className="courseInfo">Course Info</p>
                                  </div>
                                  {/* <div className="flex ConDiv">
                                    <PlayCircleFilledRoundedIcon className="playIcon" />
                                    <p className="courseInfo">Course Info</p>
                                  </div>
                                  <div className="flex ConDiv">
                                    <PlayCircleFilledRoundedIcon className="playIcon" />
                                    <p className="courseInfo">Course Info</p>
                                  </div> */}
                                </div>
                              </List>
                            </Collapse>
                          </List>
                        </div>
             ) 
            )}
          </div>

          {/* <div className="moreSection">
            <h5>5 more section</h5>
          </div> */}


        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
</>)}

      {/* --------------------------------------------------------------- */}


    </div>
  );
};
