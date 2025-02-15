import SwiperBanner from "../../components/SwiperBanner/SwiperBanner";
import React, { useEffect } from "react";
import style from "./HomePage.module.css";
import Cards from "../../components/Cards/Cards";

const HomePage = () => {

  return (
    <>
    <SwiperBanner></SwiperBanner>
    <Cards></Cards>
    </>
  )
}

export default HomePage;
