import React from "react";

export default function OwnerProfile() {
  return <h1>Hello owner {localStorage.getItem("user-name")} </h1>;
}