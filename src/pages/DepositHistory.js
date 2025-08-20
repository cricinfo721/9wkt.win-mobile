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
const DepositHistory = () => {
  const { userCoins, user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [listing, setListing] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });
  const handel = () => {
    setFilter({
      ...filter,
      page: filter?.page + 1,
    });
    getData(
      {
        ...filter,
        page: filter?.page + 1,
      },
      "add"
    );
  };
  const getData = async (obj = filter, type) => {
    const { status, data } = await apiGet(apiPath.depositHistory, obj);
    if (status == 200) {
      if (data?.success) {
        setData(data?.results);
        if (type == "add") {
          setListing([...listing, ...data?.results]);
        } else {
          setListing(data?.results);
        }
      }
    }
  };
  const { t } = useTranslation();
  useEffect(() => {
    getData();
  }, []); 
  return (
    <SidebarLayout heading={"Deposit History"}>
      <div className="p-3 pt-4 inner-sidebar-content d-flex flex-column ">
        <div className="balance-deposit-sec">
          <Table bordered className="rounded overflow-hidden bg-white">
            {
              listing?.length > 0 ? listing?.map((res) => {
                  return (
                    <>
                    <thead>
                      <tr>
                        <th colSpan="4"><strong className={`d-block`}>TrxID {res.TransactionId}</strong>
                        <p style={{margin:"5px 0 0 0"}}>{obj.dateFormat(res?.createdAt)}</p></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td width="50%">
                          Deposit Type
                          <strong className={`d-block`}>{res.transactionType}</strong>
                        </td>
                        <td width="50%">
                          Bank
                          <strong className={`d-block`}>{res?.bank_name || res.bank}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%">
                          Amount
                          <strong className={`d-block`}>{res.amount}</strong>
                        </td>
                        <td width="50%">
                          Status
                          <strong className={`d-block`}>
                            <span className={res.status=="completed"? "text-success" :(res.status=="declined")?"text-danger":""}>
                               {startCase(res.status)}
                            </span>
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td width="100%" colSpan={2}>
                          <strong className={`d-block`}>Remark</strong>
                          <p>{res.remark}</p>
                        </td>
                      </tr>
                    </tbody>
                    </>
                  );
              })
            : t("No_record_Found")
            }
          </Table>
        </div>
        {/* {listing?.length > 0
          ? listing?.map((res) => {
              return (
                <div className="balance-deposit-sec">
                  <Table bordered className="rounded overflow-hidden bg-white">
                    <thead>
                      <tr>
                        <th colSpan="4">
                          {obj.dateFormat(res?.createdAt || res?.timeInserted)}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {!isEmpty(res?.casinoBetId) ? (
                          <>
                            <td width="50%">
                              {t("Casino_Bet_Id")}
                              <strong className="d-block">
                                {res?.casinoBetId}
                              </strong>
                            </td>
                            <td width="50%">
                              {t("Client")}
                              <strong className="d-block">
                                {res?.clientName}
                              </strong>
                            </td>
                          </>
                        ) : (
                          <>
                            <td width="50%">
                              {res?.transactionType === "credit"
                                ? t("Credits")
                                : t("Debits")}{" "}
                              <strong
                                className={`d-block ${
                                  res?.transactionType === "credit"
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {res?.transactionType === "credit"
                                  ? res?.amount?.toFixed(2)
                                  : `(${res?.amount?.toFixed(2)})`}
                              </strong>
                            </td>
                            <td width="50%">
                              {t("Balance")}{" "}
                              <strong className="d-block">
                                {res?.newBalance[0]?.toFixed(2)}
                              </strong>
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td
                          style={{ fontSize: "14px" }}
                          width="50%"
                          colSpan="4"
                        >
                          {!isEmpty(res?.casinoBetId) ? "Game Info" : "Remark"}
                          <strong className="d-block">
                            {!isEmpty(res?.casinoBetId)
                              ? `${res?.platform} - ${res?.gameInfo}`
                              : res?.remark}
                          </strong>
                        </td>
                      </tr>
                      {!isEmpty(res?.casinoBetId) ? (
                        <tr>
                          <td style={{ fontSize: "14px" }} width="50%">
                            {t("Stake")}
                            <strong className="d-block">
                              {res?.betAmount}
                            </strong>
                          </td>
                          <td style={{ fontSize: "14px" }} width="50%">
                            {t("Profit_Loss")}
                            <strong className="d-block">
                              {res?.realCutAmount}
                            </strong>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td width="50%" colSpan="4">
                            {res?.createdByData?.username}{" "}
                            <span className="master-pass"></span>
                            {!isEmpty(res?.userData?.firstName) && (
                              <span className="master-pass">
                                {res?.userData?.firstName ||
                                  res?.userData?.lastName}
                              </span>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              );
            })
          : t("No_record_Found")} */}
        {/* {data?.hasNextPage && (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Button
              onClick={handel}
              style={{ background: "black", border: "none" }}
            >
              {t("View_More")} <IoIosArrowForward />
            </Button>
          </div>
        )} */}
      </div>
    </SidebarLayout>
  );
};

export default DepositHistory;
