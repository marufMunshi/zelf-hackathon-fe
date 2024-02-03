import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/data");
    }
  }, [isAuthenticated, navigate]);

  return <div>Redirecting...</div>;
}
