import { useState, useEffect } from "react";

const Searchinfo = ({ data, pincode }) => {
  //console.log(data)
  const [filter, setFilter] = useState("");
  const [filterdata, setFilterdata] = useState([]);

  const postoffices = data?.[0]?.PostOffice || [];
  const message = data?.[0]?.Message;

  useEffect(() => {
    const result = postoffices.filter((item) =>
      item.Name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilterdata(result);
  }, [filter, postoffices]);

  if (postoffices.length === 0) {
    return <p>No Data found!</p>;
  }

  return (
    <div>
      <h3>Pincode:{pincode}</h3>
      <h3>
        Message:<span>{message}</span>
      </h3>

      <div>
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {filterdata.length === 0 && (
        <p>Couldn’t find the postal data you’re looking for…</p>
      )}

      {filterdata.map((item, index) => (
        <div key={index}>
          <p>Name: {item.Name}</p>
          <p>BrachType: {item.BranchType}</p>
          <p>DeliveryStatus: {item.DeliveryStatus}</p>
          <p>District: {item.District}</p>
          <p>Division: {item.Division}</p>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default Searchinfo;
