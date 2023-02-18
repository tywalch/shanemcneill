import Vimeo from '@u-wave/react-vimeo';
import YouTube from 'react-youtube';
import { useMobileOptions } from '../hooks/useViewport';
import { useState } from 'react';

const VIDEO_STYLES = {
  isPlaying: {
    boxShadow: "0px 0px 20px 0px #159688a8",
    transitionDuration: ".5s",
    height: 'fit-content',
  },
  isNotPlaying: {
    boxShadow: "0px 0px 20px 0px black",
    transitionDuration: "1s",
    height: 'fit-content',
  }
};

const VimeoVideo = ({video, vertical}) => {
  const [isPlaying, setIsPlaying]  = useState(false);
  const [isLoaded, setIsLoaded]  = useState(false);
  let style = undefined;
  if (isLoaded) {
    style = isPlaying ? VIDEO_STYLES.isPlaying : VIDEO_STYLES.isNotPlaying;
  }
  return (
    <div style={ style }>
      <Vimeo
        video={video}
        showTitle={false}
        showPortrait={false}
        showByline={false}
        controls={true}
        height={vertical ? 550 : undefined}
        responsive={!vertical}
        onPlaying={() => {
          setIsPlaying(true);
        }}
        onLoaded={() => {
          setIsLoaded(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
      />
    </div>
  );
}

const YoutubeVideo = ({video}) => {
  const [isPlaying, setIsPlaying]  = useState(false);
  const style = isPlaying ? VIDEO_STYLES.isPlaying : VIDEO_STYLES.isNotPlaying;
  return <div style={{ ...style, height: "auto" }}>
    <YouTube
      onPause={() => {
        setIsPlaying(false);
      }}
      onPlay={() => {
        setIsPlaying(true);
      }}
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

export function Video({type, video, vertical}) {
  if (type === "vimeo") {
    return <VimeoVideo video={video} vertical={vertical} />
  } else {
    return <YoutubeVideo video={video} vertical={vertical} />
  }
}

const videoRowStyleDesktop = {
  display: "grid",
  gridTemplateColumns: "1fr 60%",
  gridTemplateRows: "max-content",
  gap: "0px 1em",
  marginBottom: "3em"
};

const videoRowStyleMobile = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "3em"
};

export default function VideoCard({title, description, video, type}) {
  const isMobile = useMobileOptions();
  const videoRowStyle = isMobile
    ? videoRowStyleMobile
    : videoRowStyleDesktop;
  
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

const verticalVideoRowStyleDesktop = {
  display: "grid",
  gridTemplateColumns: "1fr 60%",
  gridTemplateRows: "max-content",
  gap: "0px 1em",
  marginBottom: "3em"
};

export function VerticalVideoCard({title, description, video, type}) {
  const isMobile = useMobileOptions();
  const videoRowStyle = isMobile
    ? videoRowStyleMobile
    : verticalVideoRowStyleDesktop;
  
  return (
    <div style={videoRowStyle}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Video type={type} video={video} vertical={true}/>
      </div>
      <div>
        <h2 style={isMobile ? {marginBottom: 0} : {marginTop: 0}}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}