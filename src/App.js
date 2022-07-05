import './App.css';
import React, {useState} from 'react';
import CaroGame from './components/caroGame';
import SignUp from './components/signUp';

function App() {
  const [users,setUsers] = useState({playeronename: '', playertwoname: ''});
  const [play,setPlay] = useState(false);

  return (
    <div>
      {((users.playeronename === '' || users.playertwoname === '') || play === false) ? 
      <SignUp users={users} setUsers={setUsers} play={play} setPlay={setPlay}></SignUp>:<CaroGame></CaroGame>
      }
      
    </div>
  );
}

export default App;
