import HomeFooter from "../../components/common/Footer";
import HomeHeader from "../../components/common/Header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    console.log('home layout rendered')
  return (
    <>
      <HomeHeader />

      <main>
        <Outlet />
      </main>

      <HomeFooter />
    </>
  );
}