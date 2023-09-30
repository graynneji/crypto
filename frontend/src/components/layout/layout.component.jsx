import Footer from "../footer/footer.component";
const Layout = ({ children }) => {
  return (
    <div className="container">
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
