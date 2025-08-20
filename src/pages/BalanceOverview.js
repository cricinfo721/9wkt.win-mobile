import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import SidebarLayout from "../components/shared/SidebarLayout";
import { apiGet } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import obj from "../Utils/helpers";
import AuthContext from "../context/AuthContext";
import { isEmpty } from "lodash";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
const BalanceOverview = () => {
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
    const { status, data } = await apiGet(apiPath.transactionLogs, obj);
    if (status == 200) {
      if (data?.success) {
        setData(data?.results);
        if (type == "add") {
          setListing([...listing, ...data?.results?.data]);
        } else {
          setListing(data?.results?.data);
        }
      }
    }
  };
  useEffect(() => {
    if (!isEmpty(user)) {
      getData();
    }
  }, [user]);

  const { t } = useTranslation();
  return (
    <SidebarLayout heading={t("Balance_Overview")}>
      <div className="p-3 pt-4 inner-sidebar-content mb-5">
        <div className="balance-sec">
          <h5>{t("Your_Balances")}</h5>
          <h6 className="fs-4">
            {" "}
            <span>PBU</span> {userCoins?.balance?.toFixed()}
          </h6>
        </div>

        {listing?.length > 0
          ? listing?.map((res) => {
              return (
                <div className="balance-deposit-sec mt-3">
                  <Table bordered className="rounded overflow-hidden bg-white">
                    <thead>
                      <tr>
                        <th style={{ fontWeight: "500" }} colSpan="4">
                          {obj.dateFormat(res?.createdAt)}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: "3px 5px" }} width="50%">
                          {res?.transactionType === "credit"
                            ? t("Deposit")
                            : t("Withdrawal")}{" "}
                          <strong className={`d-block`}>{res?.amount}</strong>
                        </td>
                        <td style={{ padding: "3px 5px" }} width="50%">
                          {t("Balance")}
                          <strong className="d-block">
                            {Number(res?.newBalance)?.toFixed(2)}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" colSpan="4">
                          {res?.createdByData?.username}{" "}
                          {!isEmpty(res?.userData?.username) && (
                            <span className="master-pass">
                              {res?.userData?.username ||
                                res?.userData?.username}
                            </span>
                          )}
                          {/* Master <span className="master-pass">abir3236</span> */}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              );
            })
          : t("No_record_Found")}
        {data?.hasNextPage && (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <Button
              onClick={handel}
              style={{ background: "black", border: "none" }}
            >
              {t("View_More")} <IoIosArrowForward />
            </Button>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default BalanceOverview;
