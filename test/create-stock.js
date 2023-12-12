const axios = require('axios');

axios.post("http://localhost:3000/api/stocks/",
{
  code:"P00002",
  name:"Banana",
  price:300
}
).then((res)=>{
  console.log(res);
}).catch(console.log);
