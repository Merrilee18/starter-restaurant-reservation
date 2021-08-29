import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardButtons from "./DashboardButtons";
import ListDailyReservations from "../reservations/ListDailyReservations"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ 
  date,
  reservations,
  reservationsError,
  loadReservations
}) {
  // const [reservations, setReservations] = useState([]);
  // const [reservationsError, setReservationsError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(date);

  return (
    <main>
      <h1 className="libreFont">Dashboard</h1>

      {/* buttons for navigating through the reservation dates */}
      <DashboardButtons
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        date={date}
      />

      <div className="d-md-flex m-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>


      {/* {JSON.stringify(reservations)} */}

      <div>
        {(reservations.length === 0) ? (
          <div className="d-md-flex m-3">
            <h4 className="mb-0">No reservations to show</h4>
          </div>
        ) :
        <ListDailyReservations reservations={reservations} /> }
      </div>
      <ErrorAlert error={reservationsError} />
      {/* This error is getting thrown when dashboard is initially loaded. Why? */}
    </main>
  );
}

export default Dashboard;
