import "./list.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import {useLocation} from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../components/hookes/useFetch.js"
import { useEffect } from "react"

const List = () => {
  const location = useLocation()
  const [destination,setDestinaiton] =useState(location.state.destination)
  const [dates,setDates] =useState(location.state.dates)
  const [openDate,setOpenDate] =useState(false)
  const [options,setOptions] =useState(location.state.options)
  const [min,setMin]=useState(undefined)
  const [max,setMax]=useState(undefined)

  const {data,loading,error,reFetch} = useFetch(`hotels?city=${destination}&min=${min||100}&max=${max||5000}`)

  const handleClick=()=>{
   
    reFetch()
  }
  // useEffect(()=>{
  //   localStorage.setItem("info",location.state)
  // },[location.state])
  console.log(destination)
  let isDes;
  if(destination===" "){
    isDes=false
  }else{
    isDes=true
  }
  console.log("The ",isDes)
  return (
    
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} ${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} `}</span>
              {openDate && <DateRange
              onChange={(item) => setDates([item.selection])}
              minDate={new Date()}
              ranges={dates}
              />}
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOption">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <smal>per night</smal></span>
                  <input type="number" className="lsOptionInput" onChange={(e)=>setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <smal>per night</smal></span>
                  <input type="number" className="lsOptionInput" onChange={(e)=>setMax(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input min={1} placeholder={options.adult} type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input min={0} placeholder={options.children} type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input min={1} placeholder={options.room} type="number" className="lsOptionInput" />
                </div>
              </div>
            </div>

            <button onClick={handleClick}>Search</button>

          </div>
          {isDes ? <><div className="listResult">
            {loading ? "loading" : <>
            {data.map(item=>(

            <SearchItem item={item} key={item._id}/>
            ))}
            </>}
           
          </div></>:(<div className="listResult">Please Select Your Destiny</div>)}
        </div>
      </div>
    </div>
    
    
  )
}

export default List
