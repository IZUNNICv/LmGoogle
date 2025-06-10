import React, { useState } from "react";
import { useSelector } from "react-redux";

import BodyMenuDashboard from "../../components/Dashboard/BodyMenuDash";
import PdfEditorIDE from "../../components/GeneraPdf/editorPdf";
import Layout from "../../layout/Layout";
const Dashboard = () => {
  const item = useSelector((state) => state.auth.value.Itemset);

  // Estado levantado aquí:
  const [tab, setTab] = useState(0);
  const [orientation, setOrientation] = useState("portrait");
  const [zoom, setZoom] = useState(1);
  const [pageCount, setPageCount] = useState(1); // Estado para la cantidad de páginas

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));

  // Función para agregar páginas
  const handleAddPage = () => setPageCount((prev) => prev + 1);

  return (
    <Layout
      footerProps={{
        tab,
        setTab,
        orientation,
        setOrientation,
        handleZoomIn,
        handleZoomOut,
        pageCount, // <-- pasa el estado
        onAddPage: handleAddPage, // <-- pasa la función
      }}
    >
      <PdfEditorIDE
        tab={tab}
        orientation={orientation}
        zoom={zoom}
        setZoom={setZoom}
      />
      <BodyMenuDashboard />
    </Layout>
  );
};
export default Dashboard;
