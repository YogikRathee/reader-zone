import { useContext } from "react";
import FileContext from "../controller/FileContext";

const useFile = () => {
    const file = useContext(FileContext);
    return file;
};

export default useFile;
