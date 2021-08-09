import { useEffect, useRef, useState } from "react";
import useFile from "../../hooks/useFile";
import "./Sidebar.scss";

const Sidebar = ({ isMobileSidebar }) => {
  const { addFile, setSelectedFile, selectedFile, files } = useFile();
  const fileRef = useRef(null);
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  useEffect(() => {
    if (!isMobileSidebar) setShow(false);
  }, [isMobileSidebar]);

  const handleButtonClick = () => fileRef?.current?.click();

  const handleFileChange = (event) => addFile(event?.target?.files[0]);

  return (
    <>
      {isMobileSidebar && (
        <button
          className={`menu ${show ? "menu--open" : ""}`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
      <div
        className="sidebar"
        style={{ left: isMobileSidebar ? (show ? 0 : "-100%") : "auto" }}
      >
        <img
          src="/images/logo_sm_white.png"
          alt="logo"
          className="sidebar-logo"
        />
        <h6 className="sidebar-heading">files</h6>
        <div className="sidebar-files">
          {files?.map((file) => (
            <button
              key={file.name + file.lastModified}
              onClick={() => setSelectedFile(file)}
              className={`sidebar-fileButton ${
                selectedFile?.name === file.name
                  ? "sidebar-fileButton--selected"
                  : ""
              }`}
            >
              <div>
                <img src="/images/file-image.png" alt="file" />
              </div>
              <div>
                <p>{file?.name}</p>
                <p>{(file?.size / 1024).toFixed(2)} kB</p>
              </div>
            </button>
          ))}
        </div>
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={handleFileChange}
          accept="application/pdf"
        />
        <button className="sidebar-upload" onClick={handleButtonClick}>
          <img src="/images/upload-icon.png" alt="upload" />
          Upload Files
        </button>
      </div>
    </>
  );
};

export default Sidebar;
