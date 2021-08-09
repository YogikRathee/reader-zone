import { createContext, useCallback, useMemo, useState } from "react";

const FileContext = createContext({});

const FileContextController = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null)

    const addFile = useCallback((file) => {
        const existingFiles = files
        setFiles([...existingFiles, file])
        setSelectedFile(file)
    }, [files])

    const value = useMemo(
        () => ({
            files,
            selectedFile,
            setSelectedFile,
            addFile
        }),
        [files, selectedFile, addFile]
    );

    return (
        <FileContext.Provider value={value}>{children}</FileContext.Provider>
    );
};

export { FileContextController };
export default FileContext;
