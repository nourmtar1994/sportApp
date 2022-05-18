import React, { useEffect, useState } from "react";
//DESIGN COMPONENTS
import { BackTop, Layout } from "antd";
//APP COMPONENTS
//STYLE & ICONS
import "./App.less";
import { UpCircleOutlined } from "@ant-design/icons";
import ProtectedRoute from "./components/Services/ProtectedRoute";
import { Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import LoadingBar from "react-top-loading-bar";

import { useSelector } from "react-redux";

const Home = React.lazy(() => import("./components/Home/Home"));

const SportSession = React.lazy(() =>
  import("./components/SportSession/SportSession")
);

const Details = React.lazy(() =>
  import("./components/SportSession/Details/Details")
);

const Configuration = React.lazy(() =>
  import("./components/Configuration/Configuration")
);

const Personnel = React.lazy(() => import("./components/Personnel/Personnel"));

const App = () => {
  const mode = useSelector * ((state) => state.mode.value);
  const [progress, setProgress] = useState(80);
  useEffect(() => {
    setTimeout(() => {
      setProgress(20);
    }, 500);
    setTimeout(() => {
      setProgress(40);
    }, 800);
    setTimeout(() => {
      setProgress(60);
    }, 1000);
    setTimeout(() => {
      setProgress(85);
    }, 1300);

    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);
  return (
    <Layout style={{ height: "fit-content", background: "#fff" }}>
      {window.location.pathname === "/login" ? (
        <Login />
      ) : (
        <>
          <LoadingBar
            color={"#26c6da"}
            progress={progress}
            transitionTime={1000}
            onLoaderFinished={() => setProgress(0)}
          />
          <Switch>
            <ProtectedRoute path="/" exact component={Home} title="Home" />
            <ProtectedRoute
              path="/personnel"
              exact
              component={Personnel}
              title="Personnel"
            />
            <ProtectedRoute
              path="/Planification"
              exact
              component={SportSession}
              title="Planification"
            />
            <ProtectedRoute
              path="/Planification/:id"
              exact
              component={Details}
              title="Planification"
            />
            <ProtectedRoute
              path="/Configuration"
              exact
              component={Configuration}
              title="Configuration"
            />
          </Switch>

          <BackTop
            className={"backtop"}
            style={{ right: 20, bottom: 30 }}
            duration={1000}
          >
            <UpCircleOutlined style={{ fontSize: 40 }} />
          </BackTop>
        </>
      )}
    </Layout>
  );
};

export default App;
