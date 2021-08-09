import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import PDFRenderer from "./components/PDFRenderer";
import Sidebar from "./components/Sidebar";
import { FileContextController } from "./controller/FileContext";

const App = () => {
  const [mobileSidebar, showMobileSidebar] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 1120) showMobileSidebar(true);
    else if (mobileSidebar) showMobileSidebar(false);
  }, [mobileSidebar]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileSidebar, handleResize]);

  return (
    <FileContextController>
      <Sidebar isMobileSidebar={mobileSidebar} />
      <PDFRenderer isMobile={mobileSidebar} />
    </FileContextController>
  );
};

export default App;
