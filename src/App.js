import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <div>Hello</div>
      </Route>
    </Switch>
  );
}

export default App;
