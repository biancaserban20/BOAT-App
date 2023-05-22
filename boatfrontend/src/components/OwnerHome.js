import React from "react";

export default function OwnerHome() {
  return <h1>Hello owner {localStorage.getItem("user-name")}</h1>;
}