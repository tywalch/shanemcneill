import Vimeo from '@u-wave/react-vimeo';
import YouTube from 'react-youtube';

const videoRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 60%",
  gridTemplateRows: "max-content",
  gap: "0px 1em",
  marginBottom: "3em"
}

const VimeoVideo = ({video}) => {
  return <div>
    <Vimeo
      video={video}
      showTitle={false}
      showPortrait={false}
      showByline={false}
      controls={false}
      responsive
    />
  </div>
}

const YoutubeVideo = ({video}) => {
  return <div style={{height: "auto"}}>
    <YouTube
      videoId={video}
      showTitle={false}
      showPortrait={false}
      showByline={false}
      opts={{
        width: "100%",
        playerVars: {
          color: "white",
          modestbranding: 1,
        },
      }}
      
    />
  </div>
}

function Video({type, video}) {
  let component;
  if (type === "vimeo") {
    return <VimeoVideo video={video}/>
  } else {
    return <YoutubeVideo video={video}/>
  }
}

export default function VideoCard({title, description, video, type}) {
  return (
    <div style={videoRowStyle}>
      <div>
        <h2 style={{marginTop: 0}}>{title}</h2>
        <p>{description}</p>
      </div>
      <Video type={type} video={video}/>
    </div>
  )
}