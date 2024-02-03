import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { MainPage } from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/data",
    element: <MainPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sszlun3kj4onl2ia.us.auth0.com" // can be passed from github secrets at build time
      clientId="B1ZUYIvoOqhkndRT2v8z75kTnMlrzS2Q" // can be passed from github secrets at build time
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
