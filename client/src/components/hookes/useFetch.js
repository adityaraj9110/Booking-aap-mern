import axios from "axios";
import { useEffect, useState } from "react";



const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;


// import useFetch from "../../hooks/useFetch";
// import "./featuredProperties.css";

// const FeaturedProperties = () => {
//   const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

//   return (
//     <div className="fp">
//       {loading ? (
//         "Loading"
//       ) : (
//         <>
//           {data.map((item) => (
//             <div className="fpItem" key={item._id}>
//               <img
//                 src={item.photos[0]}
//                 alt=""
//                 className="fpImg"
//               />
//               <span className="fpName">{item.name}</span>
//               <span className="fpCity">{item.city}</span>
//               <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
//               {item.rating && <div className="fpRating">
//                 <button>{item.rating}</button>
//                 <span>Excellent</span>
//               </div>}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default FeaturedProperties;