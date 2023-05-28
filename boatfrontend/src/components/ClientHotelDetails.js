import React from "react";

export default function ClientHotelDetails() {
  return <h1>Hello client {localStorage.getItem("user-name")} from poperty {localStorage.getItem("property-name")} </h1>;
}