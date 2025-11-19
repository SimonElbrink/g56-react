import React, {useState, useEffect} from 'react';

import {FaInfoCircle, FaPlaneDeparture} from "react-icons/fa";
import {searchFlights} from "./flightService.js";
import {fmtCurrency, fmtDate, fmtDur, fmtTime} from "./formatters.js";
import {useForm} from "react-hook-form";
import ThemeToggle from "./ThemeToggle.jsx";

const FlightBooking = () => {


    const {register, handleSubmit, formState: {errors}} = useForm({
            defaultValues:
                {
                    from: "",
                    to: "",
                    date: ""
                }
        }
    )

    const [results, setResults] = useState([]);

    const [reload, setReload] = useState(false);


    useEffect(() => {
        console.log("Calling for Flights");

        document.title = "Flight Search - Best Prices"

        const cheapestFlights = searchFlights().slice(0, 3);

        setResults(cheapestFlights);
    }, [reload]);

    const onSubmit = (data) => {
        const flights = {
            from: data.from,
            to: data.to,
            date: data.date
        }

        const searchResults = searchFlights(flights);
        setResults(searchResults);

        document.title = `Flight Search - ${searchResults.length} results found`;

    }


    return (
        <div className="container py-4">
            {/* Header */}
            <section
                className="p-4 p-md-5 rounded-2 mb-4 shadow-sm position-relative"
                style={{
                    background: "linear-gradient(135deg, #0d6efd 0%, #31c2ff 100%)",
                }}
            >
                <div className="position-absolute top-0 end-0 p-3">

                    <ThemeToggle />

                </div>
                <h1 className="text-white fw-bold mb-1">Find your next flight</h1>
                <p className="text-white-50 mb-0">Fast. Simple. Beautiful.</p>
            </section>

            {/* Search bar */}
            <form className="card shadow-sm border-0 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                    <div className="row g-2 g-md-3 align-items-end">
                        <div className="col-12 col-md-3">
                            <small className="text-danger">{errors.from && errors.from.message}</small>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text">From</span>
                                <input className="form-control"
                                       placeholder="e.g., ARN"
                                       {...register("from", {required: "From is required"})}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <small className="text-danger">{errors.to && errors.to.message}</small>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text">To</span>
                                <input className="form-control"
                                       placeholder="e.g., LHR"
                                       {...register("to", {required: "To is required"})}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <small className="text-danger"></small>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text">📅</span>
                                <input type="date"
                                       className="form-control"
                                       {...register("date")}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-3 d-grid">
                            <button className="btn btn-primary btn-lg" type="submit">
                                Search flights
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Toolbar: count + "Sort by" */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <span className="badge rounded-pill text-bg-primary">results {results.length}</span>

                    <button className="btn btn-outline-primary btn-sm" onClick={() => setReload(!reload)}>
                        Show Best Deals
                    </button>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <label className="form-label m-0 small text-muted">Sort by</label>
                    <select
                        className="form-select form-select-sm"
                        style={{width: 220}}
                        value="price-asc"
                        disabled
                        onChange={() => {
                        }}
                        title="Disabled in this demo"
                    >
                        <option value="price-asc">Price (low → high)</option>
                        <option value="price-desc">Price (high → low)</option>
                        <option value="depart-asc">Departure (earliest)</option>
                        <option value="depart-desc">Departure (latest)</option>
                        <option value="duration-asc">Duration (shortest)</option>
                        <option value="duration-desc">Duration (longest)</option>
                    </select>
                </div>
            </div>

            {/* Results */}

            {
                results.length === 0 ? (
                    <div className="card card-body text-muted">No flights found. Try adjusting your filters.</div>
                ) : (
                    <div className="row g-3">

                        {
                            results.map(f => (
                                <div className="col-12">
                                    <div className="card shadow-sm border-0">
                                        <div
                                            className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                                                    style={{width: 56, height: 56, fontWeight: 700}}
                                                >
                                                    {f.code.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="fw-semibold">
                                                        Lufthansa <span className="text-muted">• {f.code}</span>
                                                    </div>
                                                    <div className="small text-muted">{f.from} → {f.to}</div>
                                                    <div
                                                        className="small">{fmtDate(f.departAt)} • {fmtTime(f.departAt)} • {fmtDur(f.duration)}</div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge text-bg-light border">Economy</span>
                                                <span
                                                    className={`badge ${f.duration <= 90 ? "text-bg-success" : f.duration <= 180 ? "text-bg-warning" : "text-bg-danger"}`}>
                                            {f.duration <= 90 ? "Short" : f.duration <= 180 ? "Medium" : "Long"} flight
                                        </span>
                                                <span className="badge text-bg-secondary">Baggage: 1× cabin</span>
                                            </div>
                                            <div className="text-md-end ms-md-auto" style={{minWidth: 220}}>
                                                <div className="fs-4 fw-bold">{fmtCurrency(f.price)}</div>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        disabled
                                                        title="Disabled in this demo"
                                                    >
                                                        <FaInfoCircle className="me-1"/> Details
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        disabled
                                                        title="Disabled in this demo"
                                                    >
                                                        <FaPlaneDeparture className="me-1"/> Book now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                )


            }


        </div>
    );
};


export default FlightBooking;