import { useDispatch } from "react-redux";
import { getUsers } from "./features/user/userSlice";
import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import Home from "./pages/Home";
import UserDetails, { UserDetailsLoader } from "./pages/UserDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<Home />}
        // loader={BlogsLoader}
        // errorElement={<BlogsError />}
      />
      <Route
        path="users/:id"
        element={<UserDetails />}
        // loader={UserDetailsLoader}
        // errorElement={<BlogsError />}
      />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
