
import { useEffect } from 'react';
import './App.css';
import VideoList from './components/Video';
//import db from "./db"

function App() {
  //const [videos, setVideos] = useState([]);
/*
  const db = [
    {
      id: 1,
      avatar: 'https://i.pinimg.com/474x/72/47/bf/7247bf33d87c4a6e66762b23a19bf61c.jpg',
      idName: 'anhdangcode',
      nickName: 'kenh lap trinh',
      content: 'Nothing',
      music: 'bai nhac dang phat',
      video: 'video/download.mp4',
      cmt: 169,
      like: 1234,
      share: 79
    }
    
  ];
  */

  useEffect(() => {
    //setVideos(db);
    //console.log(db)
    document.getElementById("focus").focus()
  }, []);
  
  return (
    <div id="focus" className="flex flex-col items-center snap-y snap-mandatory overflow-scroll h-screen overflow-x-hidden">
      
      <VideoList />
      
    </div>
  );
}

export default App;
