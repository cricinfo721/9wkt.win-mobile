import React from "react";
import { useState } from "react";
import SearchGames from "../../components/SearchGames";
import { Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
const SubCasino = ({ header,subCasino, setSubCasino,casinoFilter,casinoFilterHandel }) => {
  const [showGameSearchList, setShowGameSearchList] = useState(false);

  const live = ["SEXY", "EVO", "PT", "PP","HOTROAD","BG"];
  const table = ["SPRIBE","KINGMAKER", "JILI","PG","NETENT"];
  const slot = [
    "JILI",
    "PP",
    "KINGMAKER",
    "DRAGOONSOFT",
    "PT",
    "JDB",
    "SPADE",
    "PG",
    "FC",
    "FASTSPIN",
    "YESBINGO",
    "RT",
    "JOKER",
    "NETENT",
    "PLAY8",
    "BTG","NLC"
  ];
  const fishing = ["JILI","FC", "JDB","YESBINGO","JOKER","SPADE"];
  const arcade = [ "JDB","FC","SPRIBE"];
  const lottery = ["KINGMAKER", "JILI","JOKER","YESBINGO",'SABA'];
  const crash = ["SPRIBE","KINGMAKER", "JILI","PP"];
  const obj = {
    live: live,
    slot: slot,
    table: table,
    fishing: fishing,
    arcade:arcade,
    lottery:lottery,
    lottery:lottery,
    crash:crash
  };
  
  return (
    <>
      <div className="d-flex align-items-center subcasino" style={{marginTop:`52px`}}>
        {obj[header].map((res) => {
          return (
            <span
              onClick={() => setSubCasino(res)}
              className={subCasino === res && "active"}
            >
              {res}
            </span>
          );
        })}
        <Button
          className="search-casino-btn"
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

export default SubCasino;
