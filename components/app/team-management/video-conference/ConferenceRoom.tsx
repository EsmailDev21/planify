"use client";
import React, { useState } from "react";
import ChatPanel from "./ChatPanel";
import Controls from "./Controls";
import ScreenShareButton from "./ScreenShareButton";
import VideoGrid from "./VideoGrid";
import { UserModel, UserRole } from "@/lib/types/models";
import { generateRandomAvatar } from "../../tasks/views/GanttTask.component";

const ConferenceRoom = () => {
  const [participants, setParticipants] = useState<UserModel[]>([
    {
      email: "esmailkhorchani.dev@gmail.com",
      fullName: "Esmail Khorchani",
      id: "1",
      phoneNumber: "+216 52 196 997",
      role: UserRole.BUSINESS_OWNER,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
    {
      email: "alice@example.com",
      fullName: "Alice Johnson",
      id: "2",
      phoneNumber: "+123 456 7890",
      role: UserRole.ADMIN,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
    {
      email: "bob@example.com",
      fullName: "Bob Smith",
      id: "3",
      phoneNumber: "+987 654 3210",
      role: UserRole.AUTO_ENTERPRENEUR,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
    {
      email: "carla@example.com",
      fullName: "Carla Davis",
      id: "4",
      phoneNumber: "+543 210 9876",
      role: UserRole.CUSTOMER,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
  ]);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const endCall = () => alert("Call ended!");
  const startScreenShare = () => alert("Screen sharing started!");

  return (
    <div className="flex items-center">
      <div className="flex-1 bg-background flex flex-col">
        <VideoGrid participants={participants} />
        <Controls
          isMuted={isMuted}
          isVideoOn={isVideoOn}
          toggleMute={toggleMute}
          toggleVideo={toggleVideo}
          endCall={endCall}
        />
        <ScreenShareButton startScreenShare={startScreenShare} />
      </div>
      <ChatPanel />
    </div>
  );
};

export default ConferenceRoom;
