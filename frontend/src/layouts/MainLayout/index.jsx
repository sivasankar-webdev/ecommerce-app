import Footer from "../../components/common/InnerFooter";
import Header from "../../components/common/InnerHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  console.log('main layout rendered')
  return (
    <>
      <Header />

      <main>
        <Outlet />   
      </main>

      <Footer />
    </>
  );
}