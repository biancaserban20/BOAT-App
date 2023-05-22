import React from "react";

export default function AdminAcceptRequests() {
  return <h1>Hello admin {localStorage.getItem("user-name")}</h1>;
}