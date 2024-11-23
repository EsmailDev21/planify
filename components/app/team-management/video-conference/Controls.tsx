"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import ScreenShareButton from "./ScreenShareButton";

const Controls = ({
  isMuted,
  isVideoOn,
  isSharing,
  toggleMute,
  toggleVideo,
  toggleScreenShare,
  endCall,
}: {
  isMuted: boolean;
  isVideoOn: boolean;
  isSharing: boolean;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
  endCall: () => void;
}) => {
  return (
    <div className="flex justify-center gap-4 p-4">
      <ScreenShareButton
        isSharing={isSharing}
        toggleScreenShare={toggleScreenShare}
      />
      <Button variant="outline" size="icon" onClick={toggleMute}>
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </Button>
      <Button variant="outline" size="icon" onClick={toggleVideo}>
        {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={endCall}
        className="text-white"
      >
        <PhoneOff size={20} />
      </Button>
    </div>
  );
};

export default Controls;
