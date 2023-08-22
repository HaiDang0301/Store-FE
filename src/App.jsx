import { Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes } from "./routes";
import DefaultLayout from "./layouts/layoutsUser/index";
import LayoutAdmin from "./layouts/layoutsAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { Fragment } from "react";
function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          const Page = route.component;
          if (route.layout) {
            Layout = DefaultLayout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            ></Route>
          );
        })}
        {adminRoutes.map((route, index) => {
          let Layout = LayoutAdmin;
          const Page = route.component;
          if (route.layout) {
            Layout = LayoutAdmin;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <ProtectedRoute>
                    <Page />
                  </ProtectedRoute>
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
