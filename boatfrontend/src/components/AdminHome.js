import React from "react";

export default function AdminHome() {
  return <h1>Hello admin {localStorage.getItem("user-name")} </h1>;
}