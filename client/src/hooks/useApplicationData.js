import axios from "axios";
import { useState, useEffect } from "react";
import { getCurrentUserGoals } from "../helpers/goalHelper";

export default function useApplicationData() {
  const [state, setState] = useState({
    userGoals: [],
    goals: [],
    biodatas: [],
    users: [],
    currentUserGoals: [],
    currentUser: null,
    answer: "",
    currentUserInsight: "",
    expanded: {},
  });

  useEffect(() => {
    axios
      .get("/api/login")
      .then((userId) => {
        setState((state) => ({
          ...state,
          currentUser: userId.data,
        }));
      })
      .catch((err) => "Failed in initial api fetch:" + err.message);

    Promise.all([
      axios.get("/api/userGoals"),
      axios.get("/api/goals"),
      axios.get("/api/biodatas"),
      axios.get("/api/users"),
    ])
      .then((all) => {
        setState((state) => ({
          ...state,
          userGoals: all[0].data,
          goals: all[1].data,
          biodatas: all[2].data,
          users: all[3].data,
        }));
      })
      .catch((err) => "Failed in initial api fetch:" + err.message);
  }, []);

  // Set current user goals
  useEffect(() => {
    if (state.currentUser != null && state.userGoals != null) {
      setState((state) => ({
        ...state,
        currentUserGoals: getCurrentUserGoals(
          state.userGoals,
          state.goals,
          state.currentUser
        ),
      }));
    }
  }, [state.currentUser, state.userGoals]);

  // set Answer
  const setAnswer = function (ans) {
    setState((state) => ({
      ...state,
      answer: ans,
    }));
  };

  // Set user points
  const setPoints = function (id, points) {
    let newPoints = state.users.filter((user) => user.id === id)[0].points;
    newPoints += points;

    axios
      .put(`/api/users`, { points: newPoints, id })
      .then((result) => {
        state.users.filter((user) => user.id === id)[0].points = newPoints;
      })
      .catch((err) => "Failed in setting user points:" + err.message);
  };

  // Adding new goal
  const addUserGoal = function (goal) {
    goal.user_id = state.currentUser;
    goal.answer = state.answer;

    axios
      .post(`/api/userGoals`, goal)
      .then((result) => {
        const newUserGoals = [...state.userGoals, result.data];

        setState((state) => ({
          ...state,
          userGoals: newUserGoals,
        }));

        setPoints(state.currentUser, result.data.answer.split(" ").length);
      })
      .catch((err) => "Failed in adding new goal:" + err.message);
  };

  //handleDelete
  const handleDelete = (id) => {
    let userGoal = {};
    userGoal.id = id;
    axios
      .delete(`/api/userGoals`, { data: userGoal })
      .then((result) => {
        const newUserGoals = state.userGoals.filter((goal) => goal.id !== id);

        setState((state) => ({
          ...state,
          userGoals: newUserGoals,
        }));

        const answer = state.currentUserGoals.filter(
          (goal) => goal.id === id
        )[0].answer;
        setPoints(state.currentUser, -1 * answer.split(" ").length);
      })
      .catch((err) => "Failed in delete" + err.message);
  };

  // Create new user
  const createUser = function (email, password, biodata) {
    
    const user = {};
    user.email = email;
    user.password = password;
    user.handle = "@" + user.email.substring(0, 3);
    user.points = 0;
    const biodataObj = {};
    biodataObj.name = biodata;
    biodataObj.text = biodata;
    biodataObj.user_id = null;

    return axios
      .post(`/api/users`, user)
      .then((result) => {
        const newUsers = [...state.users, result.data];

        biodataObj.user_id = result.data.id;
        setState((state) => ({
          ...state,
          users: newUsers,
          currentUser: result.data.id,
        }))
      }).then(() => {
        if (biodata != null) {
          axios
            .post(`/api/biodatas`, biodataObj)
            .then((result) => {
              const newBiodatas = [...state.biodatas, result.data];

              setState((state) => ({
                ...state,
                biodatas: newBiodatas,
              }));
            })
            .catch((err) => "Failed in adding biodata:" + err.message);
        }
        return true;
      })
      .catch((err) => "Failed in creating user:" + err.message);
  };

  // set expanded
  const setExpanded = function (i) {
    const newExpanded = { ...state.expanded };
    newExpanded["" + i] = newExpanded["" + i] === true ? false : true;

    setState((state) => ({
      ...state,
      expanded: newExpanded,
    }));
  };

  // set user state
  const logInUser = (email, password) => {
    const checkUser = {
      email,
      password,
    };

    return axios
      .post("/api/login", checkUser)
      .then((user) => {
        if (user.data && user.data.id && user.data.id > 0) {
          setState((state) => ({
            ...state,
            currentUser: user.data.id,
          }));
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => false);
  };

  // reset user state
  const logoutUser = () => {
    return axios
      .post("/api/logout")
      .then((data) => {
        setState((state) => ({
          ...state,
          currentUser: null,
        }));
        return true;
      })
      .catch((err) => "Failed in logout user:" + err.message);
  };

  //set insights
  const setInsight = (currentUserInsight) =>
    setState({ ...state, currentUserInsight });

  //Fetch insights
  const requestInsight = (currentUserGoals) => {
    return axios
      .post("/api/userInsight", {
        body: currentUserGoals,
      })
      .then((response) => {
        setInsight(response.data);
      })
      .catch((err) => "Failed in  fetching insights:" + err.message);
  };

  return {
    state,
    logInUser,
    logoutUser,
    setAnswer,
    addUserGoal,
    requestInsight,
    createUser,
    handleDelete,
    setExpanded,
    setPoints,
  };
}
