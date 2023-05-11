import "./App.css"
import WallpaperLoader from "./components/WallpaperLoader/WallpaperLoader"
import Dashboard from "./components/Dashboard/Dashboard";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Content from "./components/Content/Content"
const App = () => {
  return (
    <div className="App">
      {/* <Loader /> */}
      <Content />
      <Dashboard />
      <NavigationBar />
      <WallpaperLoader />
    </div>
  );
}

export default App;
