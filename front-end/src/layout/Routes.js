import React, { useState, useEffect } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation";
import EditReservation from "../reservations/EditReservation";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  const query = useQuery();
  const date = query.get("date");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  useEffect(loadDashboard, [date]);

  function loadReservations() {
    setReservationsError(null);
    return listReservations({ date })
      .then(setReservations)
      .catch(setReservationsError);
  }

  
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation loadReservations={loadReservations} />
      </Route>
      <Route path = "/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          date={date ? date : today()}
          reservations={reservations}
          reservationsError={reservationsError}
          loadReservations={loadReservations} 
        />
      </Route>


      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
