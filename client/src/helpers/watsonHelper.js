import axios from 'axios'; 

export function requestInsight(userGoalsArray) {

return Promise.resolve(
  axios
    .post("/api/userInsight", {
      body: userGoalsArray
    })
    .then(response => {
    return response
    })
    .catch(err => console.log(err))
  )
}

