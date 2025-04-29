import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";


function FrontApp() {
  const [selectedEvents, setEvents] = useState('Both');
  const [searchData, setData] = useState([]);
  const [searchIn, setIn] = useState('');
  const [showdisplay, setDisplay] = useState(true);
  const [showData, setShow] = useState(false);
  const { data, loading, error } = useFetch("https://meet-up-app-backend-two.vercel.app/Events");

  const DataOutput = data?.eventData
    ? (selectedEvents === 'Both' || selectedEvents === 'Select'
      ? data.eventData
      : data.eventData.filter(event => event.eventMode === selectedEvents))
    : [];

  const searchingEventsByName = (event) => {
    setIn(event.target.value);
    const searchFound = data?.eventData ? data.eventData.reduce((acc, curr) => {
      if (curr.titel === event.target.value) {
        acc.push(curr);
      }
      const tagsSearched = curr.eventTags.reduce((inital, tag) => {
        if (tag === event.target.value) {
          inital.push(curr);
        }
        return inital;
      }, []);
      if (tagsSearched.length > 0) {
        acc.push(...tagsSearched);
      }
      return acc;
    }, []) : [];

    if (searchFound.length > 0) {
      setData(searchFound);
      setDisplay(false);
      setShow(true);
    } else {
      setDisplay(true);
      setShow(false);
    }
  }

  return (
    <div className="container">
      <header>
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <h1 className="display-2 text-success">MeetUp</h1>
          </Link>
          <div className="d-flex justify-content-end">
            <input type="text" id="MeetupSearch" placeholder="Search" value={searchIn} onChange={searchingEventsByName} />
          </div>
        </nav>
      </header>
      <hr />
      <div className="position-relative mb-3">
        <select onChange={(event) => setEvents(event.target.value)} className="form-select position-absolute top-0 end-0" style={{ width: '200px' }}>
          <option value={'Select'}>Select</option>
          <option value={'Both'}>Both</option>
          <option value={'Offline'}>Offline</option>
          <option value={'Online'}>Online</option>
        </select>
      </div>
      <h1>Meeting Events</h1>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading....</span>
          </div>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      {showdisplay && (
        <>
          {DataOutput && DataOutput.length > 0 ? (
            <div className="row">
              {DataOutput.map((event) => (
                <div className="col-md-4 py-2" key={event._id}>
                  <div className="position-relative">
                    <Link to={`/events/${event._id}`}>
                      <img src={event.eventImgUrl} alt="Event List" width="320" height="270" className="img-fluid" />
                    </Link>
                    <span className="badge text-bg-light position-absolute top-0 start-0">{event.eventMode}</span>
                  </div>
                  <small>{event.date} &middot; {event.fromTime}</small><br />
                  <strong>{event.titel}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p>No events available.</p>
          )}
        </>
      )}

      {showData && (
        <div className="row mb-3">
          {searchData.map(event => (
            <div className="col-md-4 mb-4" key={event._id}>
              <div className="position-relative">
                <Link to={`/events/${event._id}`}>
                  <img src={event.eventImgUrl} alt="Event thumbnail" width="250" height="250" className="img-fluid" />
                </Link>
                <span className="badge text-bg-light position-absolute top-0 start-0 mt-2 ms-2">{event.eventMode}</span>
              </div>
              <small>{event.date} &middot; {event.fromTime}</small><br />
              <strong>{event.titel}</strong>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}


export default FrontApp;
