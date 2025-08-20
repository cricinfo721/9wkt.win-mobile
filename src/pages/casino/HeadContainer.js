import React, { useState } from "react";
import SubCasino from "./SubCasino";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const HeadContainer = ({ header, setHeader, setSubCasino, subCasino,casinoFilter,casinoFilterHandel }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    arrows: false,
    slidesToShow: 5.5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4.7,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      {/* <Slider {...settings} className="casino-category">
        <div className="category-item">
          <div
            onClick={() => {
              setHeader("popular");
            }}
            className={header === "popular" && "active"}
          >
            <h6>Popular</h6>
            <div>
              {header === "popular" ? (
                <img
                  src="../assets/images/casino-icon/hover-popular.svg"
                  alt=""
                />
              ) : (
                <img src="../assets/images/casino-icon/popular.svg" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="category-item">
          <div
            onClick={() => {
              setHeader("live");
            }}
            className={header === "live" && "active"}
          >
            <h6>Live</h6>
            <div>
              {header === "live" ? (
                <img src="../assets/images/casino-icon/hover-live.svg" alt="" />
              ) : (
                <img src="../assets/images/casino-icon/icon-live.svg" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="category-item">
          <div
            onClick={() => {
              setHeader("table");
            }}
            className={header === "table" && "active"}
          >
            <h6>Table</h6>
            <div>
              {header === "table" ? (
                <img
                  src="../assets/images/casino-icon/hover-table.svg"
                  alt=""
                />
              ) : (
                <img src="../assets/images/casino-icon/icon-table.svg" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="category-item">
          <div
            onClick={() => {
              setHeader("slot");
            }}
            className={header === "slot" && "active"}
          >
            <h6>Slot</h6>
            <div>
              {header === "slot" ? (
                <img src="../assets/images/casino-icon/hover-slot.svg" alt="" />
              ) : (
                <img src="../assets/images/casino-icon/icon-slot.svg" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="category-item">
          <div
            onClick={() => {
              setHeader("fishing");
            }}
            className={header === "fishing" && "active"}
          >
            <h6>Fishing</h6>
            <div>
              {header === "fishing" ? (
                <img
                  src="../assets/images/casino-icon/hover-fishing.svg"
                  alt=""
                />
              ) : (
                <img
                  src="../assets/images/casino-icon/icon-fishing.svg"
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <div className="category-item">
          <div
            onClick={() => {
              setHeader("egame");
            }}
            className={header === "egame" && "active"}
          >
            <h6>Egame</h6>
            <div>
              {header === "egame" ? (
                <img
                  src="../assets/images/casino-icon/hover-egame.svg"
                  alt=""
                />
              ) : (
                <img src="../assets/images/casino-icon/egame.svg" alt="" />
              )}
            </div>
          </div>
        </div>
      </Slider> */}
      {header === "popular" ? (
        ""
      ) : (
        <SubCasino
          setSubCasino={setSubCasino}
          subCasino={subCasino}
          header={header}
          casinoFilter={casinoFilter}
          setCasinoFilter={casinoFilterHandel}
        />
      )}
    </>
  );
};

export default HeadContainer;
