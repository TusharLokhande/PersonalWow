import jwt_decode from "jwt-decode";
import { createContext } from "react";

export function getContext() {
  var token = getCookie("ApplicationToken");

  var decoded;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
  }
  if (token != undefined) {
    decoded = jwt_decode(token);
  }
  return decoded;
}

// loader context
// @ts-ignore
export const LoaderContext = createContext<any>();
