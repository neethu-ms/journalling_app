import moment from 'moment';
// Finds current user Goals 
export function getCurrentUserGoals(userGoals, goals, userId) {
    return [...userGoals]
    .filter(userGoal => userGoal.user_id === userId)
    .sort((goal1, goal2) => moment(goal1.createdAt) < moment(goal2.createdAt) ? 1: -1)
    .map((userGoal) => {
      const question = goals.filter((goal) => userGoal.goal_id === goal.id)[0].question;
    return  {
        id: userGoal.id,
        question: question,
        answer: userGoal.answer,
        createdAt: moment(userGoal.createdAt).format('LLLL'),  // Formatted date 
      }
    });
};



export function getLevel(userObj){
console.log("userObj",userObj);
  let level;
  let extraPoints = 0;
  if (userObj) {
    if (userObj.points > 100) {
      extraPoints = userObj.points - 100;
    }
    //Initial level is 1 and will lead to level 2 once user earns 20 points.
    let computedLevel = Math.floor((userObj.points - extraPoints) / 10); // Till level 10, earning 10 points will lead to next level starting from level 2
    computedLevel = computedLevel + Math.floor(extraPoints / 100); // After level 10, earning 100 points will lead to next level
    level = (computedLevel >= 1 ? computedLevel : 1).toFixed(); // Level is computed from points.
  }

  return level;
} 

