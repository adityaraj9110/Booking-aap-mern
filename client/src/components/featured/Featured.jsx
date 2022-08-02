import useFetch from "../hookes/useFetch"
import "./featured.css"
const Featured = () => {
  const {data,loading,error} =useFetch("/hotels/countByCity/?cities=patna,Chandigarh,mohali,telangana")
  
  return (
    <div className="featured">
      {loading?("Loading Please Wait"):(<>
            <div className="featuredItem">
            <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/square250/684682.webp?k=30cf9de93f2a0f87eed7d2d0d9b3e6eccd5dcf3a4b68b4e0151c0800ddc84af7&o=" alt="" srcset="" />
            <div className="featuredTitles">
            <h1>Lonavla</h1>
            <h2>{data[0]} properties</h2>
            </div>
      </div>
      <div className="featuredItem">
            <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/region/square250/49646.webp?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=" alt="" srcset="" />
            <div className="featuredTitles">
            <h1>Goa</h1>
            <h2>{data[1]} properties</h2>
            </div>
      </div>
      <div className="featuredItem">
            <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" alt="" srcset="" />
            <div className="featuredTitles">
            <h1>New Delhi</h1>
            <h2>{data[2]} properties</h2>
            </div>
      </div>
      <div className="featuredItem">
            <img className="featuredImg" src="https://t-cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="" srcset="" />
            <div className="featuredTitles">
            <h1>Bangalore</h1>
            <h2>{data[3]} properties</h2>
            </div>
      </div></>)}
    </div>

    
  )
}

export default Featured
