import { useState, useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Manager from "./Components/Manager";
import { getStaff } from "./utils.js";
import { StaffContext } from "./contexts/StaffContext.jsx";

function App() {
  const {isStaff, setIsStaff} = useContext(StaffContext)
  const [staffList, setStaffList] = useState([]);

  // const getStaffDetails = async () => {
  //   const data = await getStaff()
  //   const { staff } = data;
  //       const staffDetails = staff.map((element) => {
  //         return element.staff_email
  //       })
  //       setStaffList((staffList) => staffList = staffDetails)
  // }

  // useEffect(() => {
  //   getStaffDetails()
  //     .then(() => {
  //       if (staffList.includes()) {
  //         setIsStaff(true);
  //       }
  //     })
  // }, [, isStaff])

  return (
    <>
      <Header />
      <Manager />
    </>
  );
}

export default App;
