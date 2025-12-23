import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import type { RootState } from "../../store/store";

 const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.token;
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
  credentials: "include",
});

export default baseQuery;