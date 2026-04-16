import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showControls, setShowControls] = useState(true);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-black w-full h-screen relative overflow-hidden flex justify-center items-center">
      {/* Mocking the video player since we don't have actual HLS stream chunks */}
      <video 
        className="w-full h-full object-cover"
        autoPlay
        controls={showControls}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      />

      {/* Custom Header overlay to exit */}
      <div className={`absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={() => navigate(-1)} 
          className="text-white hover:text-[#E11D48] transition flex items-center gap-2 font-bold"
        >
          <ArrowLeft size={30} /> Back
        </button>
      </div>
    </div>
  );
}
