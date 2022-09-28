import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
import { RouterGuard } from "@/routers/routerGuard";
import rootRouter from "@/routers/index";
const App = () => {
  return (
    <HashRouter>
      {/* <Router /> */}
      <RouterGuard routes={rootRouter} />
    </HashRouter>
  );
};

export default App;
