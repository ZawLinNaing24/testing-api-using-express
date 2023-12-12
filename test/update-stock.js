const axios = require("axios");

axios.put("http://localhost:3000/api/stocks/655fe153da97606bff38154b",
{
  code:"P00001",
  name:"Apple",
  price:600
}
).then((res)=>{
  console.log(res);
}).catch(console.log);
