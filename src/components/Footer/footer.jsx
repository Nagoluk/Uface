import React from 'react';
import Footermods from "./footer.module.css";

const Footer = ()=>{
    return(<footer>
              <div className={Footermods.footerWrap}>
               <h3>Contact</h3>
                  <ul>
                      <li>Designed by <b>Dmitriy Naholiuk</b> 2019</li>
                  </ul>
              </div>
            </footer>);
}

export default Footer;