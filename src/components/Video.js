import React, { useRef, useState, useEffect } from 'react'
import { FaComment, FaHeart, FaShare, FaMusic } from 'react-icons/fa'


const VideoInfo = ({ avatar, idName, nickName, content, music }) => {
  return (
      <div className='flex flex-row'>
          <img className='w-[50px] h-[50px] rounded-full' src={avatar} alt='avt' />
          <div className='ml-3 min-w-[80%]'>
              <div>
                  <a href="#" className='text-xl font-bold hover:underline'>{idName}</a>
                  <a href="#" className='text-xl'>{nickName}</a>
              </div>
              <div>{content}</div>
              <div className='flex flex-row items-center'>
                  <FaMusic /> <span className='ml-3'>{music}</span>
              </div>
          </div>
          <div>
              
              <button className='p-1 pl-3 pr-3 border-2 border-red-400 text-red-400 rounded-md hover:bg-red-100'>Follow</button>
          </div>
      </div>
  );
}

const VideoContent = ({ videoSrc, likes, comments, shares }) => {
    const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleVideoPause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleVideoClick = () => {
    if (playing) {
      handleVideoPause();
    } else {
      handleVideoPlay();
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    if (userInteracted) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (videoRef.current) {
                videoRef.current.currentTime = 0; // Start from the beginning
                handleVideoPlay();
              }
            } else {
              handleVideoPause();
            }
          });
        },
        { threshold: 0.5 } // Adjust threshold as needed
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, [userInteracted]);

  //
  return (
  <div className='flex flex-row'>
      <video 
          ref={videoRef}
          onClick={handleVideoClick}
          className='w-[80%] max-h-[600px] ml-[50px] rounded-md mt-4' playsInline preload='auto' src={videoSrc}
          loop  
      />
      <div className='flex flex-col justify-end ml-7'>
          <div className='text-center mb-4'>
              <div className='w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center'>
                  <FaHeart className='text-xl text-red-500' />
              </div>
              <span>{likes}</span>
          </div>
          <div className='text-center mb-4'>
              <div className='w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center'>
                  <FaComment className='text-xl' />
              </div>
              <span>{comments}</span>
          </div>
          <div className='text-center'>
              <div className='w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center'>
                  <FaShare className='text-xl' />
              </div>
              <span>{shares}</span>
          </div>
      </div>
  </div>
  );
};

const Video = ({data}) => {
  return (
    <div className='snap-start max-w-[600px] border-b-2 border-gray-200 pb-10 pt-10'>
      <VideoInfo
        avatar={data.avatar}
        idName={data.idName}
        nickName={data.nickName}
        content={data.content}
        music={data.music}
      />
      <VideoContent
        videoSrc={data.video}
        likes={data.like}
        comments={data.cmt}
        shares={data.share}
      />
    </div>
  );
}

//export default Video

const VideoList = () => {
    const db = [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/72/47/bf/7247bf33d87c4a6e66762b23a19bf61c.jpg',
        idName: 'codeforfun',
        nickName: 'kenh lap trinh',
        content: 'ReactJS base',
        music: 'bai nhac dang phat - muoi ngan nam',
        video: 'video/video1.mp4',
        cmt: 169,
        like: 1234,
        share: 79,
      },
      // Add more data objects here if needed
      {
        id: 2,
        avatar: 'https://i.pinimg.com/236x/60/0f/8e/600f8edce7e9c1cd2e8137365c128513.jpg',
        idName: 'anhdangcode',
        nickName: 'code for fun',
        content: 'nhac nen',
        music: 'am nhac dang phat',
        video: 'video/video2.mp4',
        cmt: 1669,
        like: 12324,
        share: 179,
      },
      {
        id: 3,
        avatar: 'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175607/Originals/avt-cho-cute%20(39).jpg',
        idName: 'Lichu',
        nickName: '@mot_chut_edm',
        content: '#chill #music',
        music: 'Blackpack - Lichu',
        video: 'video/video3.mp4',
        cmt: 177,
        like: 4371,
        share: 89,
      },
      {
        id: 4,
        avatar: 'https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-dai-dien-avt-anime-nu-uong-cafe-600x600.jpg',
        idName: 'giaolang',
        nickName: 'doit - now',
        content: 'Dung luoi bieng nua',
        music: 'nhac nen - qua trinh phat trien ban than - khai sang',
        video: 'video/video4.mp4',
        cmt: 1779,
        like: 55678,
        share: 889,
      },

    ];
  
    return (
      <div>
        {db.map((item) => (
          <Video key={item.id} data={item} />
        ))}
      </div>
    );
  }
  
  export default VideoList;
