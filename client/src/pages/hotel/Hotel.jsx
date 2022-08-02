import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList.jsx/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../components/hookes/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
const Hotel = () => {

  const itemId=useParams();
  console.log(itemId)
  const navigate=useNavigate()
  // console.log(itemId.id);

  const {data,loading,error}=useFetch(`/hotels/find/${itemId.id}`)
  console.log(data)
  const { dates, options } = useContext(SearchContext);
  console.log(dates)
  const {user} = useContext(AuthContext)
  
  
  

  



  console.log(options)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days=dayDifference(dates[0].endDate, dates[0].startDate)
  console.log(days)

 

 


  


  const [slideNumber,setSlideNumber] = useState(0)
  const [open,setOpen] = useState(false)
  const [openModal,setOpenModal] = useState(false)
  const handleOpen = (i)=>{
    setSlideNumber(i)
    setOpen(true)
  }
  const handleMove=(side)=>{
    if(side==="l"){
      if(slideNumber>0){
        setSlideNumber(slideNumber-1);
        console.log(slideNumber)
      }else{
        setSlideNumber(5)
      }
    }else if(side==="r"){
      if(slideNumber<5){
        setSlideNumber(slideNumber+1);
        console.log(slideNumber)
      }else{
        setSlideNumber(0)
      }
    }
  }
  
  const handleClick = () => {
    
    if(user){
      setOpenModal(true)
      
    }else{
      navigate("/login")
    }
  };
  
  const photos = [
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/332080178.jpg?k=71329d5eb9328027aa177fcaaf82a865a7c410686f8be3f02c9f346b42f1172a&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/180178950.jpg?k=12caf3a74d7b36e2c4c7561cafd852bfe03cd464d32fb6eab130d6bdb995e810&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/180180523.jpg?k=612f1cf173cdfb46ba0de5a5d6d69a24730f2d8797b01449149a2e05be87d423&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/180178947.jpg?k=e8d6ec82ddc5348717de86b25c55f976ee0cc6575f87ca0a609cb79f81d5187a&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/180182886.jpg?k=bf043c6bb764d71ab494f717e27da7e8f08e34afb030912d0b5e946712861de4&o=&hp=1",
    },
    {
      src: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/180182886.jpg?k=bf043c6bb764d71ab494f717e27da7e8f08e34afb030912d0b5e946712861de4&o=&hp=1",
    },
  ];
  console.log("this is cheap",data.cheapestPrice)
  console.log(days)
  console.log(options.room)

  
  

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(!open)}/>
            <FontAwesomeIcon  onClick={()=>handleMove("l")}  icon={faCircleArrowLeft} className="arrow"/>
            <div className="silderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon  onClick={()=>handleMove("r")} icon={faCircleArrowRight} className="arrow"/>
          </div>}
        <div className="hotelWrapper"> 
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location -{data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over Rs.{data.cheapestPrice} at this property and get a free airport
            taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo,i) => (
              <div key={i} className="hotelImgWrapper">
                <img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}night stay!</h1>
              <span>
                Located in the real heart of krakow,this property has an excellent location score of 9.8! 
              </span>
              <h2>
                <b>Rs.{days * data.cheapestPrice * options.room}</b>  ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>

        </div>
        
      <MailList/>
      <Footer/>
      </div>
      {openModal&&<Reserve setOpen={setOpenModal} hotelId={itemId.id}/>}
    </div>
  );
};

export default Hotel;
