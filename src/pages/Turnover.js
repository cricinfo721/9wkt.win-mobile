import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import SidebarLayout from "../components/shared/SidebarLayout";
import { apiGet } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import obj from "../Utils/helpers";
import objConstant from "../Utils/constants";
import AuthContext from "../context/AuthContext";
import { compact, isEmpty, startCase } from "lodash";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import Nodata from "../components/Nodata";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import ProgressBar from "@ramonak/react-progress-bar";
import Modal from "react-bootstrap/Modal";

const Turnover = () => {
  const { userCoins, user } = useContext(AuthContext);
  const [pageCount, setPageCount] = useState(0);
  const [viewpage, setViewPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [detail, showDetail] = useState({});
  const handleCloseVerify = () => {
    showDetail({ status: false });
  };
  const [filter, setFilter] = useState({
    status: "active",
    page: 1,
    limit: 100,
  });

  const getData = async (obj = filter, type) => {
    setLoader(true);
    const { status, data } = await apiGet(apiPath.getTurnover, obj);
    if (status == 200) {
      if (data?.success) {
        setData(data?.results);
        setLoader(false);
      }
    }
  };

  const handlePageClick = (event) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: event.selected + 1,
      };
    });
    setViewPage(event.selected);
  };

  useEffect(() => {
    setPageCount(data?.totalPages || []);
  }, [data]);

  useEffect(() => {
    getData();
    setViewPage(filter.page ? filter.page - 1 : 0);
  }, [filter?.status, filter?.page]);

  return (
    <SidebarLayout heading={"Turnover"}>
      <div className="inner-sidebar-content d-flex flex-column tunrover-page">
        <div className="">
          <ul className="atab">
            <li
              className={filter?.status == "active" ? "active" : ""}
              onClick={(e) => {
                setFilter({
                  ...filter,
                  status: "active",
                  page: 1,
                });
                setViewPage(0);
              }}
            >
              <Link className="">
                Active{" "}
                <span className="count-num">
                  {data?.dataCount?.active || 0}
                </span>
              </Link>
            </li>
            <li
              className={filter?.status == "completed" ? "active" : ""}
              onClick={(e) => {
                setFilter({
                  ...filter,
                  status: "completed",
                  page: 1,
                });
                setViewPage(0);
              }}
            >
              <Link className="">
                {" "}
                Completed{" "}
                <span className="count-num">
                  {data?.dataCount?.completed || 0}
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="balance-deposit-sec">
          <div class="ng-trigger-tabPageTriggerAni">
            <ul class="ticket-wrap ng-trigger-staggerFadeAnimation ">
              {!isLoader ? (
                data?.data?.length > 0 ? (
                  data?.data?.map((res) => {
                  var ratio=  Number((res?.usedAmount /res?.originalAmount) *100).toFixed(2);
                 
                    return (
                      <li
                        class="ticket completed "
                        idx="455882865"
                        onClick={() => showDetail({ status: true, data: res })}
                      >
                        <div class="ticket-inner">
                          <div class="ticket-inner-left">
                            <div class="title">
                              {" "}
                              {res?.isBonusTurnover ? "Bonus" : "Normal"}{" "}
                            </div>
                            <div class="detail">
                              <div class="date ">
                                {" "}
                                Event ends in : 2099/12/31{" "}
                              </div>
                              <div class="detail-btn">
                                <a>Details</a>
                              </div>
                            </div>
                            <div class="discount">
                              <div class="amount">
                                <i id="locale-util-dicrective-7">
                                  <span>৳</span>{" "}
                                  {Number(res?.originalAmount).toFixed(2)}
                                </i>
                              </div>
                            </div>
                            <div class="progress-bar">
                              <div class="bar">
                                <div class="bar-inner" style={{width:ratio+"%"}}></div>
                              </div>
                              <div class="number">
                                <span> 0 </span>
                                <span  style={{width:ratio+"%"}} className="dynamic-pro">{res?.usedAmount>0 && res?.usedAmount!=Number(res?.originalAmount) ?Number(res?.usedAmount).toFixed(2):""}</span>
                                <span>
                                  {Number(res?.originalAmount).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            {/* <ProgressBar 
                                            completed={res.usedAmount}
                                            bgColor="#ffe800"
                                            labelAlignment="left"
                                            isLabelVisible={false}
                                            labelColor="#e80909"
                                            animateOnRender
                                            /> */}
                          </div>
                          <div class="ticket-inner-right">
                            <div class="">{res.status}</div>
                          </div>
                        </div>
                        <div class="ticket-deco open-pop">
                          <div class="line"></div>
                          <div class="line"></div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <Nodata />
                )
              ) : (
                <div class="loader2"></div>
              )}
            </ul>
          </div>

          {detail?.status && (
            <Modal centered show={detail?.status} onHide={handleCloseVerify}>
              <Modal.Header closeButton className="turn-pop-header">
                <Modal.Title>Normal</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="turnover-table-inner">
                  <div class="arrow" style={{ opacity: `0.8` }}>
                    <span class="table-indicator"></span>
                  </div>

                  <Table className="rounded mb-0 turnover-table">
                    <tr>
                      <th>Transaction Amount</th>
                      <th>Bonus</th>
                      <th>Turnover Requirement</th>
                      <th> Turnover Completed</th>
                      <th> Completed Ratio</th>
                      <th> Turnover Create Time</th>
                    </tr>
                    <tr>
                      <td>{Number(detail?.data?.originalAmount).toFixed(2)}</td>
                      <td>{"0.00"}</td>
                      <td>{Number(detail?.data?.originalAmount).toFixed(2)}</td>
                      <td>{Number(detail?.data?.usedAmount).toFixed(2)}</td>
                      <td>
                        {Number((detail?.data?.usedAmount / detail?.data?.originalAmount) *100).toFixed(2)}
                      </td>
                      <td>{obj.dateFormat(detail?.data?.createdAt)}</td>
                    </tr>
                  </Table>
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          )}

          {/* <Table bordered className="rounded overflow-hidden bg-white">
            {
                !isLoader?
              data?.data?.length > 0 ? data?.data?.map((res) => {
                  return (
                    <>
                    <thead>
                      <tr>
                        <th colSpan="4">{obj.dateFormat(res?.createdAt)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td width="50%">
                        Original Amount
                          <strong className={`d-block`}>{res.originalAmount}</strong>
                        </td>
                        <td width="50%">
                        Used Amount
                          <strong className={`d-block`}>{res?.usedAmount}</strong>
                        </td>
                      </tr>
                     
                      <tr>
                        <td width="50%">
                          Status
                          <strong className={`d-block`}>{res.status}</strong>
                        </td>
                        <td width="50%"></td>
                      </tr>
                    </tbody>
                    </>
                  );
              })
            : <Nodata/>
            :<div class="loader2"></div>
            }
            <span class="loader2"></span>

          </Table> */}
        </div>
        <div className="bottom-pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            forcePage={viewpage}
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            activeClassName="p-1"
            activeLinkClassName="pagintion-li"
          />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Turnover;
