import { createContext, useState, useContext, useEffect } from "react";

//context shuu gej uusgej baina
export const UserContext = createContext({});

//custom hook buyu gar hiitsiin hook (like useState)
export function useUser() {
  return useContext(UserContext);
}

//contextiin provider aa export hiij baina Index.js d ashigalna
export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);
  return (
    //value dotor yamar medeelel busadttai share hiimeer baigaagaa oruulj ogno
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
