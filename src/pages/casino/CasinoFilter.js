import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import SearchGames from "../../components/SearchGames";
const CasinoFilter = ({casinoFilter, setCasinoFilter,header}) => {
  const [showGameSearchList, setShowGameSearchList] = useState(false);

  return (
    <>
      <div className="casinofilter d-flex justify-content-between">
        <div className="d-flex align-items-center">
          {(header == "live" || header == "popular") &&
          <span
            onClick={() => setCasinoFilter("catalog")}
            className={casinoFilter === "catalog" && "active"}
          >
            Catalog
          </span>}
          <span
            onClick={() => setCasinoFilter("latest")}
            className={casinoFilter === "latest" && "active"}
          >
            Latest
          </span>
          <span
            onClick={() => setCasinoFilter("az")}
            className={casinoFilter === "az" && "active"}
          >
            A-Z
          </span>
        </div>

        <Button
          className="bg-transparent border-0 text-dark"
          onClick={() => setShowGameSearchList(true)}
        >
          <AiOutlineSearch className="fs-3" />
        </Button>
      </div>

      {showGameSearchList && (
        <SearchGames setShowGameSearchList={setShowGameSearchList} />
      )}
    </>
  );
};

export default CasinoFilter;
