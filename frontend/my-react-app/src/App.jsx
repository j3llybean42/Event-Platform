import { useState, useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Manager from "./Components/Manager";
import { getStaff } from "./utils.js";
import { StaffContext } from "./contexts/StaffContext.jsx";
import { UserContext } from "./contexts/UserContext.jsx";

function App() {
  const {googleUser, setGoogleUser} = useContext(UserContext)
  const {isStaff, setIsStaff} = useContext(StaffContext)
  const [staffList, setStaffList] = useState([]);
  const [userDetails, setUserDetails] = useState({})

  const getStaffDetails = async () => {
    const data = await getStaff()
    const { staff } = data;
        const staffDetails = staff.map((element) => {
          return element.staff_email
        })
        setStaffList((staffList) => staffList = staffDetails)
  }

  useEffect(() => {
    const isStaffInfo = window.localStorage.getItem('bookstore_isStaff')

    if(isStaffInfo !== null){
      setIsStaff(JSON.parse(isStaffInfo))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('bookstore_isStaff', JSON.stringify(isStaff))
  }, [isStaff]);


  useEffect(() => {
    setGoogleUser(userDetails.email)
    console.log(googleUser, "<- googleUser start useEffect")
    console.log(userDetails, "<- userDetails start useEffect")
    getStaffDetails()
      .then(() => {
        console.log(staffList, "<- staffList useEffect")
        if (staffList.includes(googleUser)) {
          setIsStaff((isStaff) => (isStaff = true));
        }
        console.log(isStaff, "<- isStaff useEffect")
      })
  }, [userDetails])

  return (
    <>
      <Header />
      <Manager userDetails={userDetails} setUserDetails={setUserDetails}/>
    </>
  );
}

export default App;
