import { Component } from "react";
import { Col, Row } from "reactstrap";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaInstagramSquare,
} from "react-icons/fa";

class Footer extends Component {
  render() {
    return (
      <footer>
  
        
            <p text-align="left">&copy; Baylor's Chick Inn 2021</p>
          
        
            <a href='https://www.instagram.com/baylorschickinn/' target='_blank' rel="noreferrer"><FaInstagramSquare  className='socialIcon'/></a>
            <a href='https://www.facebook.com/BaylorsChickInn' target='_blank' rel="noreferrer"><FaFacebookSquare className='socialIcon'/></a>
            <a href='https://twitter.com/BaylorsI' target='_blank' rel="noreferrer"><FaTwitterSquare className='socialIcon'/></a>
            <a href='https://www.pinterest.com/baylormercer/_saved/' target='_blank' rel="noreferrer"><FaPinterestSquare className='socialIcon'/></a>
         
     
      </footer>
    );
  }
}
export default Footer;
