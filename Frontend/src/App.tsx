import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Statefull/Header";
import Login from "./components/Login";
import Main from "./Stateless/AllCourses";
import Register from "./components/Register";
import AllCourses from "./Stateless/AllCourses";
import UserCourses from "./components/UserCourses";
import Search from "./components/Search";
import { LoginStatusProvider } from "./LoginContext";
import CoursePage from "./components/CoursePage";
import { useHistory } from "react-router";
import CreatedCourse from "./components/CreatedCourses";
import {Theme} from "./theme";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    history.push("/search");
  };
  return (
    <ThemeProvider theme={Theme}>
      <LoginStatusProvider>
        <div className="App">
          <Header searchHandler={searchHandler} />
          <Switch>
            <Route exact path="/" component={AllCourses} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user" component={UserCourses} />
            <Route
              exact
              path="/search"
              component={() => <Search s={searchValue} />}
            />
            <Route exact path="/course/:id" component={CoursePage} />
            <Route exact path="/user/created" component={CreatedCourse} />
          </Switch>
        </div>
      </LoginStatusProvider>
      </ThemeProvider>
  );
}

export default App;
