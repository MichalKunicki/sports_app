import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

type Props = {
  children?: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
