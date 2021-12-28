import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Layout from "components/Layout";

const IndexPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.pathname === "/") {
      navigate("/tasks");
    }
  }, [location?.pathname, navigate]);

  return (
    <Layout>
      <Container sx={{ flex: 1, display: "flex" }}>
        <Outlet />
      </Container>
    </Layout>
  );
};

export default IndexPage;
