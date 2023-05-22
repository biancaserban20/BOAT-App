import React from "react";

export default function ClientBookings() {
  return <h1>Hello client {localStorage.getItem("user-name")}</h1>;
}