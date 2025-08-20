import React, { useEffect, useState, useContext } from "react";
import LayoutComponent from "../../components/shared/Layout";
import SubCasino from "./SubCasino";
import GameCard from "../../components/GameCard";
import { gamesLiveArray } from "../../constraints/constants";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { compact, head, isEmpty, startCase } from "lodash";
import AuthContext from "../../context/AuthContext";

const Casino = (props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { amounutRefresh, user } = useContext(AuthContext);
  const [header, setHeader] = useState("live");
  const [subCasino, setSubCasino] = useState("");
  const [liveArray, setLiveArray] = useState({});

  useEffect(() => {
    setLiveArray(gamesLiveArray);
  }, []);

  useEffect(() => {
    if (!isEmpty(user)) {
      amounutRefresh();
    }
  }, [user]);
  useEffect(() => {
    if (!isEmpty(searchParams.get("header"))) {
      setHeader(searchParams.get("header"));
      
  
    }
    if (!isEmpty(searchParams.get("subCasino"))) {
      setSubCasino(searchParams.get("subCasino"));
    }
    
  }, [searchParams.get("header"), searchParams.get("subCasino")]);

  useEffect(() => {
    
    if (!isEmpty(header)) {
      
      setLiveArray(
        gamesLiveArray?.filter((res) => {
        return (
          res?.category == header &&
          res?.type ==subCasino
           
        );
      }) || [])
    }
  }, [header,subCasino]);

  // console.log("liveArray",liveArray)
  return (
    <div>
      <LayoutComponent visibilityType={true}>
        <div className="main-casino-wrapper">
          <SubCasino
            header={header}
            setSubCasino={setSubCasino}
            subCasino={subCasino}
          />
          {liveArray?.length > 0 && (
            <div className="games-card-inner ">
              <div className="row">
                {liveArray?.map((res, index) => {
                  return <GameCard key={index} res={res} />;
                })}
              </div>
            </div>
          )}
        </div>
      </LayoutComponent>
    </div>
  );
};

export default Casino;
