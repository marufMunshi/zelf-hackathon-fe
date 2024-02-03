import { Button } from "antd";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

export function Login() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  console.log("🚀 ~ Login ~ isAuthenticated:", isAuthenticated);
  console.log("🚀 ~ Login ~ user:", user);
  return (
    <div>
      <Header />
      <Container>
        <div className="login-card-wrapper">
          <div className="login-card">
            <div className="login-card--left">
              <div className="login-card--left-content">
                <h2 className="content-heading-1">all your content</h2>

                <h2 className="content-heading-2">one</h2>
                <h2 className="content-heading-2">Zelf.</h2>
              </div>

              <div className="login-card--left-image">
                <div className="image-wrapper">
                  <img src="public/app-image.png" alt="" />
                </div>
              </div>
            </div>

            <div className="login-card--right">
              <div className="login-card--right-header">
                <h3>Register Your Account</h3>
              </div>

              <div className="login-card--right-buttons">
                <Button className="login-card--right-buttons-brand-btn">
                  I Represent a Brand
                </Button>

                <Button
                  onClick={() => loginWithRedirect()}
                  type="primary"
                  className="login-card--right-buttons-continue-btn"
                >
                  Continue
                </Button>
              </div>

              <div className="login-card--right-footer">
                <span className="login-card--right-footer--member-text">
                  Already a member?
                </span>
                <Button type="link">Sign In</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
