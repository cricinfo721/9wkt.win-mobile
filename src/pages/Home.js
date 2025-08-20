import React, { useContext } from "react";
import HomeBanner from "../components/HomeBanner";
import LayoutComponent from "../components/shared/Layout";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CurrentNews from "../components/CurrentNews";

const Home = () => {
  const { messagelist, setAnnouncement } = useContext(AuthContext);
  return (
    <div>
      <LayoutComponent visibilityType={true}>
        <HomeBanner />
        {messagelist?.length > 0 && (
          <CurrentNews
            message={messagelist}
            setAnnouncement={setAnnouncement}
          />
        )}
        <Outlet />
      </LayoutComponent>
    </div>
  );
};

export default Home;
