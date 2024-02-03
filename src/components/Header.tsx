import { Avatar, Button, Popover } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { UserOutlined } from "@ant-design/icons";
import "./Header.css";

export function Header() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  console.log("🚀 ~ Header ~ user:", user);

  if (!isAuthenticated) {
    return (
      <header>
        <span className="logo-title">Zelf.</span>

        <div className="auth-buttons">
          <Button type="text" size="large" onClick={() => loginWithRedirect()}>
            Sign In
          </Button>
          <Button size="large" type="primary">
            Join
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header>
      <img src="public/zelf-logo.png" alt="Zelf" />

      <div>
        <Popover content={user?.name}>
          <Avatar icon={<UserOutlined />} />
        </Popover>
      </div>
    </header>
  );
}
