import React, { useContext, useState } from "react";
import BetSlipContext from "../context/BetSlipContext";
import OutsideClickHandler from "react-outside-click-handler";
import { FaTelegram } from "react-icons/fa6";
import { FaRegCopy, FaShareAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";

const MessageRefer = ({ setShare, share, setEdit, profileData }) => {
  function copy(text) {
    toast.success("Link Copied!");
    return window.navigator.clipboard.writeText(text);
  }
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShare(false);
      }}
    >
      <div className={`message refer-share p-title p-3 d-flex flex-column`}>
        <div>
          <span style={{ fontWeight: "600" }} className="title w-100">Invite Friends</span>
          {/* <br />
          <span>
            Hey! Here's your special Discount worth $100 on Bkash. Ready to
            Play?
          </span> */}
        </div>
        {/* <div className="d-flex justify-content-between align-items-center">
          <span>Share Via</span>
          <span
            style={{
              height: "1px",
              width: "75%",
              background: "black",
              marginTop: "5px",
            }}
          ></span>
        </div> */}
        <div className="refer-share-button">
          <div className="d-flex mb-3">
            <button
              onClick={() =>
                copy(
                  `https://9wkt.win/register?referral_code=${profileData?.referalCode}`
                )
              }
              className="btn btn-primary me-3"
            >
              {profileData?.referalCode}{" "}
              <FaRegCopy style={{ marginLeft: "7px" }} />{" "}
            </button>
            <button
              onClick={() =>
                setEdit({
                  status: true,
                  item: profileData?.referalCode
                    ? profileData?.referalCode
                    : "",
                })
              }
              className="refer-share-button-edit btn success btn text-white "
            >
              <MdModeEdit style={{ marginRight: "3px" }} />
              Edit
            </button>
          </div>
          <div className="refer-share-button-inner">
            <a
              href={`https://web.whatsapp.com/send?text=https://9wkt.win/register?referral_code=${profileData?.referalCode}`}
              target="_blank"
              style={{ marginRight: "5px" }}
            >
              {" "}
              <FaWhatsapp color="green" size={26} />{" "}
            </a>

            <FacebookShareButton
              style={{ marginRight: "5px" }}
              url={`https://9wkt.win/register?referral_code=${profileData?.referalCode}`}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://9wkt.win/register?referral_code=${profileData?.referalCode}`}
              style={{ marginRight: "5px" }}
            >
              <XIcon size={26} round />
            </TwitterShareButton>
            <TelegramShareButton
              url={`https://9wkt.win/register?referral_code=${profileData?.referalCode}`}
            >
              <TelegramIcon size={26} round />
            </TelegramShareButton>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default MessageRefer;
