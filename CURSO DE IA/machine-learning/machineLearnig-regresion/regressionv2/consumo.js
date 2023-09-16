const body = JSON.stringify({
    "Inputs": {
        "data": [
          {
            "day": 0,
            "mnth": 0,
            "year": 0,
            "season": 0,
            "holiday": 0,
            "weekday": 0,
            "workingday": 0,
            "weathersit": 0,
            "temp": 0.0,
            "atemp": 0.0,
            "hum": 0.0,
            "windspeed": 0.0
          }
        ]
      },
      "GlobalParameters": 0.0
});

let endpoint = 'http://3ed7d93f-06d2-40e7-899a-4c0ecc180c66.eastus.azurecontainer.io/score';
let key = 'VNqI0DrqkmH5LYkxiL4AUemL9CAqpTPa';
const headers = {
    "Content-Type":"application/json",
    "Authorization":(`Bearer${key}`)
};



fetch(endpoint,{
    method:'OPTIONS'
})
.then( response => response.json())
.then( result => {
    console.log(result);
})