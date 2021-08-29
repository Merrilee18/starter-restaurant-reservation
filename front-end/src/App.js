import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./dashboard/Dashboard";
// import ReservationForm from "./reservations/NewReservation";
// import NewReservation from "./reservations/NewReservation";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      {/* <Route path="/reservations/new">
        <NewReservation />
      </Route> */}
    </Switch>
  );
}

export default App;
