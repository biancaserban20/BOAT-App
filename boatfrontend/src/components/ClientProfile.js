import React from "react";

export default function ClientProfile() {
  return <h1>Hello client {localStorage.getItem("user-name")} </h1>;
}