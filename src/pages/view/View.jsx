import React from 'react';
import { ArrowBackOutlined } from "@material-ui/icons";
import Trailers from '../../video/trailers.mp4';
import './view.scss';

export default function View() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className="video"
        autoPlay
        progress='true'
        controls
        src={Trailers}
      />
    </div>
  )
}
