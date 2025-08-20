import { debounce, isEmpty, update } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { gamesLiveArray } from "../constraints/constants";
import NoEvent from "./NoEvent";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const SearchGames = ({ setShowGameSearchList }) => {
  const [search, setSearch] = useState("");
  const [upadated, setUpdated] = useState([]);
  const navigate = useNavigate();
  const { user, launchEGTCasino, launchCasino } = useContext(AuthContext);
  const filterArray = (value) => {
    setUpdated(
      gamesLiveArray?.filter((res) => {
        return res?.name?.toLowerCase().includes(value?.toLowerCase());
      })
    );
  };
  function handleChange(event) {
    setSearch(event.target.value);
    debounceFn(event.target.value);
  }
  const debounceFn = useMemo(() => debounce(filterArray, 500), []);
  return (
    <div className="search-games-sec">
      <Form>
        <div className="position-relative">
          <Form.Control
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search platform, games, and more......"
          />
          <Button
            className="bg-transparent border-0 text-dark position-absolute end-0 top-0 pt-0 fs-4"
            onClick={() => setShowGameSearchList(false)}
          >
            <RxCross2 />
          </Button>
        </div>

        <div className="search-listing mt-sm-3 ">
          <ul className="p-0 m-0">
            <div className="w-100 mb-3 match-list">
              {upadated?.length > 0 ? (
                <ul className="p-0">
                  {upadated?.map((res, index) => {
                    return (
                      <li
                        onClick={() => {
                          if (!isEmpty(user)) {
                            if (!isEmpty(res?.gameid)) {
                              launchEGTCasino({
                                platForm: res?.platForm,
                                gameType: res?.gameType,
                                casinoType: res?.casinoType,
                                gameid: res?.gameid,
                              });
                            } else {
                              if (
                                res?.platForm !== "" &&
                                res?.gameType !== "" &&
                                res?.casinoType !== ""
                              ) {
                                launchCasino({
                                  platForm: res?.platForm,
                                  gameType: res?.gameType,
                                  casinoType: res?.casinoType,
                                });
                              }
                            }
                          } else {
                            navigate("/login");
                          }
                        }}
                      >
                        {res?.name}
                        {/* Footb
                        <strong className="match-special-word">a</strong>
                        ll Rules */}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <NoEvent />
              )}
            </div>
          </ul>
        </div>
      </Form>
    </div>
  );
};

export default SearchGames;
