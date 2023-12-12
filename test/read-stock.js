const axios = require('axios');

axios.get("http://localhost:3000/api/stocks/655fe153da97606bff38154b").then((res) => {
  console.log(res.data);
}).catch(console.log)
