import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import API from "../API";
import Loading from "./Loading";

export default function MainRouteController(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userData = await API.getUserData();
        setUser(userData);
      } catch (err) {
        props.history.push("/login");
      }
    })();
  }, [props.history]);

  return user ? (
    <Dashboard {...props} user={user} />
  ) : (
    <Loading text="Signing in" />
  );
}
