import React, { useState } from "react";



const CasinoPopup = (props) => {
  return (
    <div
      id="common_transfer_to_go"
      className="overlay"
      style={{ display: props.casinoModel ? "flex" : "none" }}
    >
      <div id="commonDialogWrap" className="pop-wrap transfer-wrap-slider">
      <div class="dfx">
         <a href="#"  id="casinoLoginBtn ">
             <img id="show" class="sabaimg" src="../assets/images/spotsaba.webp" alt="" />
         </a>
         </div> 
    
     <div class="dfx">
      
         
         <a href="#"  id="casinoLoginBtn ">
             <img id="show" class="sabaimg" src="../assets/images/E-SPORTS-01.webp" alt="" />
         </a>
         
         
         
         
         <a href="#" id="casinoLoginBtn ">
             <img id="show" class="sabaimg" src="../assets/images/Numbergame.webp" alt="" />
         </a>
         
        
      </div>
      <div class="dfx">
         <a href="#" id="casinoLoginBtn ">
             <img id="show" class="sabaimg" src="../assets/images/VGaming.webp" alt=""  />
         </a>

         <a href="#" id="casinoLoginBtn ">
             <img id="show" class="sabaimg" src="../assets/images/Sabapingoal.webp" alt=""  />
         </a>
         
         </div>
        <ul className="btn-list">
          <li>
            <a
              id="commonCancelBtn"
              href="javascript:void(0)"
              onClick={() => {
                props.setCasinoModel(false);
              
              }}
              className="btn-send"
            >
              Cancel
            </a>
          </li>
          
          
        </ul>

        
      </div>
      
    </div>
  );
};

export default CasinoPopup;
