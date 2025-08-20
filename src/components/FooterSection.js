import React ,{useState} from "react";
import { useTranslation } from "react-i18next";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className={isReadMore ? "text full-text" : "text "}>
      {isReadMore ? text.slice(0, 300) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "black" }}
      >
        {isReadMore ? "Show More" : " Show Less"}
      </span>
    </p>
  );
};
const FooterSection = () => {
  const { t } = useTranslation();
  const [showImg, setShowImg] = useState(true);
  const navigate = useNavigate();
  return (
    <>
    <div className="readmore-text">
    <b>
          9wkt Live - No.1 Online Gaming and Betting ID Provider in Bangladesh
        </b>
  <ReadMore>
          In recent years, the online gaming and betting industry in Bangladesh
          has seen exponential growth, attracting players who seek excitement
          and rewarding experiences. As more people embrace digital platforms,
          the demand for reliable and diverse gaming options has surged. Our
          platform stands out as a top choice, offering an extensive range of
          games and betting opportunities from renowned providers worldwide.
          Diverse Gaming Options from Top Providers One of the key factors that
          set us apart is the sheer variety of gaming options we offer. We’ve
          partnered with some of the most reputable game providers in the
          industry to bring you a world-class gaming experience. Whether you're
          into sports betting, casino games, or unique online gaming
          experiences, we’ve got you covered. Our platform features games from
          Microgaming, a leader in the online gaming industry, known for its
          high-quality slot games and progressive jackpots. For sports
          enthusiasts, SABA Sports and SBO Sports provide a comprehensive
          sportsbook covering a wide range of sports, including football,
          cricket, basketball, and more. If you’re a fan of interactive and
          visually engaging games, providers like Pocket Games, CQ9, and JDB
          offer a plethora of options, ranging from slots to arcade-style games.
          Evolution and Big Gaming deliver a superior live casino experience,
          bringing the thrill of a real casino directly to your screen with
          games like live blackjack, roulette, and baccarat. We also cater to
          poker aficionados with offerings from BPOKER and a range of other card
          games from providers like KA Gaming and WorldMatch. For a more casual
          gaming experience, LUDO and So De provide fun, easy-to-play options
          that are perfect for all ages. Exclusive Game Providers and Titles Our
          platform is constantly expanding its game library, and we’re proud to
          include exclusive providers like Sexy, Red Tiger, Spade Gaming, King
          Maker, JILI, Play8, Fa Chai, Pragmatic Play, and Playtech. These
          providers bring a mix of classic and innovative games, ensuring that
          there’s something for everyone, whether you prefer traditional slots
          or more modern, feature-rich titles. For those who seek the ultimate
          in gaming variety, we offer titles from WorldMatch, Play'n Go, SV388,
          and NETENT, all of which are known for their high-quality graphics and
          immersive gameplay. UG Sports and PLAYSTAR add to the diversity with a
          mix of sports betting and casino games, while RICH88, FASTSPIN, ICF,
          SPRIBE, and HotRoad round out our offerings with fast-paced, exciting
          games that keep you on the edge of your seat. Why Choose Us? When it
          comes to online gaming and betting in Bangladesh, our platform is
          second to none. We prioritize safety, security, and fair play,
          ensuring that your gaming experience is both enjoyable and secure. Our
          platform is licensed and regulated, and we use state-of-the-art
          encryption technology to protect your personal and financial
          information. Our user-friendly interface makes it easy to navigate
          through our extensive range of games and sports betting options,
          whether you’re a seasoned player or new to online gaming. Plus, with
          our dedicated customer support team available 24/7, help is always
          just a click away. Join Us Today and Start Winning If you’re ready to
          take your gaming and betting experience to the next level, join us
          today. Not only will you gain access to an unparalleled selection of
          games and sports betting opportunities, but you’ll also be able to
          take advantage of our generous bonuses and promotions. For those who
          refer friends to our platform, we offer exclusive referral bonuses.
          Every time your referred friends sign up and start playing, you’ll
          earn rewards that can be used to enhance your own gaming experience.
          It’s a win-win situation – the more friends you refer, the more you
          can win! Conclusion Don’t miss out on the best online gaming and
          betting platform in Bangladesh. With top providers like Microgaming,
          SABA Sports, JDB, CQ9, Pocket Games, and many more, we offer a
          comprehensive gaming experience that’s unmatched in the region. Sign
          up today and start exploring all that our platform has to offer.
          Remember, your next big win could be just a click away! Enjoy Your
          Betting with 9wkt Live!!
        </ReadMore>
        </div>
        <div class="payment-inner">
          <div class="payment-row title-sponsor">
            <h2>{t("Sponsor")}</h2>
            <ul className="sponsor_block m-0 d-flex flex-wrap footer-top">
              <li className="d-grid">
                <img src="../assets/images/sponser1.png" alt="" />
                <div class="item__content">
                  <div class="txt">AFC Bournemouth</div>
                  <div class="sub-txt">
                    <span> Front Of Shirt Partner </span>
                    <span> 2024 - 2025 </span>
                  </div>
                </div>
              </li>
              <li className="d-grid">
                <img src="../assets/images/sponser2.png" alt="" />
                <div class="item__content">
                  <div class="txt">Bologna FC 1909</div>
                  <div class="sub-txt">
                    <span>Betting Partner </span>
                    <span> 2023 - 2024 </span>
                  </div>
                </div>
              </li>
              <li className="d-grid">
                {" "}
                <img src="../assets/images/sponser3.png" alt="" />
                <div class="item__content">
                  <div class="txt">Quetta Gladiators</div>
                  <div class="sub-txt">
                    <span>Titanium Sponsor</span>
                    <span> 2023 </span>
                  </div>
                </div>
              </li>
              <li className="d-grid">
                {" "}
                <img src="../assets/images/sponser4.png" alt="" />
                <div class="item__content">
                  <div class="txt">Sunrisers Eastern Cape</div>
                  <div class="sub-txt">
                    <span>Title Sponsor</span>
                    <span> 2023 - 2024 </span>
                  </div>
                </div>
              </li>
              <li className="d-grid">
                {" "}
                <img src="../assets/images/sponser5.png" alt="" />
                <div class="item__content">
                  <div class="txt">Deccan Gladiators</div>
                  <div class="sub-txt">
                    <span>Title Sponsor</span>
                    <span> 2023 - 2024 </span>
                  </div>
                </div>
              </li>
              <li className="d-grid">
                {" "}
                <img src="../assets/images/sponser6.svg" alt="" />
                <div class="item__content">
                  <div class="txt">St Kitts & Nevis Patriots</div>
                  <div class="sub-txt">
                    <span>Title Sponsor</span>
                    <span> 2023 - 2024 </span>
                  </div>
                </div>
              </li>
              <li className="d-grid">
                {" "}
                <img src="../assets/images/sponser7.svg" alt="" />
                <div class="item__content">
                  <div class="txt">Biratnagar Kings</div>
                  <div class="sub-txt">
                    <span>Title Sponsor</span>
                    <span> 2023 - 2024 </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
        <div class="payment-inner">
          <div class="payment-row title-sponsor">
            <h2>{t("Brand Ambassadors")}</h2>
            <ul className="d-flex flex-wrap brand_ambassadors_block footer-top">
              <li>
                <img src="../assets/images/ambassadors1.png" alt="" />
                <div className="d-flex flex-column ms-1">
                  <p className="fw-bold mb-0">{t("Mia Khalifa")}</p>
                  <strong className="fw-normal fst-italic">2020</strong>
                </div>
              </li>
              <li>
                <img src="../assets/images/ambassadors2.png" alt="" />
                <div className="d-flex flex-column ms-1">
                  <p className="fw-bold mb-0">{t("Kevin Pietersen")}</p>
                  <strong className="fw-normal fst-italic">2024-2026</strong>
                </div>
              </li>
              <li>
                {" "}
                <img src="../assets/images/ambassadors3.png" alt="" />
                <div className="d-flex flex-column ms-1">
                  <p className="fw-bold mb-0">{t("Amy Jackson")}</p>
                  <strong className="fw-normal fst-italic">2023-2024</strong>
                </div>
              </li>
              <li>
                {" "}
                <img src="../assets/images/ambassadors4.png" alt="" />
                <div className="d-flex flex-column ms-1">
                  <p className="fw-bold mb-0">{t("Hansika Motwani")}</p>
                  <strong className="fw-normal fst-italic">2023-2024</strong>
                </div>
              </li>
              <li>
                {" "}
                <img src="../assets/images/ambassadors5.png" alt="" />
                <div className="d-flex flex-column ms-1">
                  <p className="fw-bold mb-0">{t("Wasim Akram")}</p>
                  <strong className="fw-normal fst-italic">2024-2025</strong>
                </div>
              </li>
            </ul>
          </div>
        </div>
    <div class="pay">
      
      <div class="payment-inner">
      <h2>{t("Payment_Methods")}</h2>
      <ul className="payment-img">
        <li>
          <img src="../assets/images/pay1.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay2.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay3.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay4.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay5.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay6.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay7.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay8.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay9.webp" alt="" />
        </li>
        <li>
          <img src="../assets/images/pay10.webp" alt="" />
        </li>
      </ul>
      <div class="payment-inner">
        <div class="payment-row social-row">
          <h2>{t("Responsible_Gaming")}</h2>
          <ul>
            <li>
              <Link to="/">
                <img src="../assets/images/r1.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="../assets/images/r2.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="../assets/images/r3.png" alt="" />
              </Link>
            </li>
          </ul>
        </div>
        <div class="payment-row social-row">
          <h2>{t("Community_Websites")}</h2>
          <ul>
            <li>
              <Link to="/">
                {" "}
                <img src="../assets/images/facebook.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src="../assets/images/instagram.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                {" "}
                <img src="../assets/images/twitter.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                {" "}
                <img src="../assets/images/pinterest.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                {" "}
                <img src="../assets/images/youtube.png" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                {" "}
                <img src="../assets/images/telegram-channel.png" alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
       
      </div>
      <div class="payment-inner gaming-lic">
        <div class="payment-row">
          <h2>{t("Gaming License")}</h2>
          <ul>
            <li>
              <Link to="/">
                <img src="../assets/images/gaming_license.png" alt="" />
              </Link>
            </li>
            
          </ul>
        </div>
        <div class="payment-row social-row">
          <h2>{t("APP Download")}</h2>
          <ul>
            <li>
              <Link to="/">
                {" "}
                <img src="../assets/images/android-en.png" alt="" />
              </Link>
            </li>
           
            
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
          <div class="d-flex align-items-center">
            <img src={logo} />
            <div class="link-wrap">
              <h6>{t("Win Like A King")}</h6>
              <p>{t("Rights_Reserved")}</p>
            </div>
          </div>
        </div>
        <div class="footer__license license">
          <h1 class="license__title"> </h1>
          <p class="license__content">
            <a href="/">9wkt.win</a> is owned and operated by BJ88 Holdings
            Limited. registration number: 15839, registered address: Hamchhako,
            Mutsamudu, Autonomous Island of Anjouan, Union of Comoros. Contact
            us <a href="mailto:#">9wkt@gmail.com</a>.{" "}
            <a href="/">9wkt.win</a> is licensed and regulated by the Government
            of the Autonomous Island of Anjouan, Union of Comoros and operates
            under License No. ALSI-202410030-FI1. <a href="/">9wkt.win</a> has
            passed all regulatory compliance and is legally authorized to
            conduct gaming operations for any and all games of chance and
            wagering.
          </p>
        </div>
    </div>
    </>
  );
};

export default FooterSection;
