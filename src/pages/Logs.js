import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import SidebarLayout from "../components/shared/SidebarLayout";
import { apiGet } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { compact, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import obj from "../Utils/helpers";
import { useTranslation } from "react-i18next";
const Logs = () => {
  const [data, setData] = useState([]);
  const [listing, setListing] = useState([]);
  const getData = async () => {
    const { status, data } = await apiGet(apiPath.activityLogs);
    if (data?.success) {
      setListing(data?.results?.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
const {t} = useTranslation()
  return (
    <SidebarLayout heading={t("Active_Log")}>
      {/* <div className="select-container">
        <DropdownButton id="dropdown-basic-button" title="Active Log">
          <Dropdown.Item href="#/action-1">Active Log</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Change Password Log</Dropdown.Item>
        </DropdownButton>
      </div> */}
      <div className="p-sm-3 p-2 pt-3">
        <div className="active-log-table">
          {listing?.length > 0
            ? listing?.map((item, index) => {
                return (
                  <Table bordered className="rounded overflow-hidden">
                    <thead>
                      <tr>
                        <th colSpan="4">{obj.dateFormat(item?.createdAt)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="4">
                          {t("Login_Status")}{" "}
                          <strong
                            className="d-block"
                            style={{ color: "green" }}
                          >
                            {item?.activityStatus}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">{t("IP_Address")}</td>
                        <td width="60%">{item?.ip}</td>
                      </tr>
                      <tr>
                        <td width="40%">{t("ISP")}</td>
                        <td width="60%">{item?.isp || "--"}</td>
                      </tr>
                      <tr>
                        <td width="40%">{t("City/State/Country")}</td>
                        <td width="60%">{item?.country}</td>
                      </tr>
                    </tbody>
                  </Table>
                );
              })
            : ""}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Logs;
