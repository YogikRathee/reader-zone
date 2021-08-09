import { useCallback, useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import useFile from "../../hooks/useFile";
import "./PDFRenderer.scss";

const PDFRenderer = ({ isMobile }) => {
  const { selectedFile } = useFile();
  const [pages, setPages] = useState(null);
  const [width, setWidth] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(numPages);
  };

  const resizeHandler = useCallback(() => {
    setWidth(window?.innerWidth - (isMobile ? 84 : 548));
  }, [isMobile]);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [isMobile, resizeHandler]);

  return (
    <div className="pdf">
      {selectedFile ? (
        <>
          <h2 className="pdf-heading">
            <img src="/images/file-image.png" alt="file" />
            {selectedFile?.name}
          </h2>
          <Document
            file={selectedFile}
            options={{
              cMapUrl: "cmaps/",
              cMapPacked: true,
            }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(pages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={width}
              />
            ))}
          </Document>
        </>
      ) : null}
    </div>
  );
};

export default PDFRenderer;
