import './Content.css';
import Qs from './quick_questions/Qs'
import Ready from './ready_screen/Ready'
import { useState } from 'react';

function Content() {
  const [userData, setUserData] = useState("")
  const [userReady, setUserReady] = useState(false);
  const setReady = () => {
    setUserReady(!userReady)
  }
  return (
    <div className="Content">
      {userReady ? <Qs userData={userData}/> : <Ready handleUserData={setUserData} handleReady={setReady}/>}
    </div>
  );
}

export default Content;
