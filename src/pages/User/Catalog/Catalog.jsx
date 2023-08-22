import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Products from "./Products/Products";
import TitleHeader from "../../../layouts/layoutsUser/Heading/Title";
function Catalog() {
  const params = useParams();
  document.title = "Catalog";
  useEffect(() => {
    window.scrollTo({ top: 400, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <TitleHeader title="Catalog"></TitleHeader>
      <Products></Products>
    </div>
  );
}

export default Catalog;
