import React, {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
  } from "react";
  
  interface LoginStatus {
    isLoggedin: boolean;
    isTeacher: boolean;
    setLoginStatus: Dispatch<
      SetStateAction<{ isLoggedin: boolean; isTeacher: boolean }>
    >;
  }
  
  export const LoginContext = createContext<LoginStatus>({isLoggedin:false,isTeacher:false,setLoginStatus:()=>({})});
  
  export const LoginStatusProvider: React.FC = ({ children }) => {
    const [LoggedStatus, setLoginStatus] = useState({
      isLoggedin: false,
      isTeacher: false,
    });
    useEffect(() => {
      setLoginStatus({
        isLoggedin: localStorage.getItem("isLoggedin") === "true",
        isTeacher: localStorage.getItem("isTeacher") === "true",
      });
    }, []);
    useEffect(() => {
      localStorage.setItem("isLoggedin", LoggedStatus.isLoggedin.toString());
      localStorage.setItem("isTeacher", LoggedStatus.isTeacher.toString());
    });
  
    return (
      <LoginContext.Provider
        value={{
          isLoggedin: LoggedStatus.isLoggedin,
          isTeacher: LoggedStatus.isTeacher,
          setLoginStatus,
        }}
      >
        {children}
      </LoginContext.Provider>
    );
  };
  