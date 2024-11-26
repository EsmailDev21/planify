"use client";
import React, { useState } from "react";
import ChatPanel from "./ChatPanel";
import Controls from "./Controls";
import ScreenShareButton from "./ScreenShareButton";
import VideoGrid from "./VideoGrid";
import { UserModel, UserRole } from "@/lib/types/models";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomAvatar } from "@/lib/utils";

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
    {
      email: "carla@example.com",
      fullName: "Carla Davis",
      id: "6",
      phoneNumber: "+543 210 9876",
      role: UserRole.CUSTOMER,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
    {
      email: "carla@example.com",
      fullName: "Carla Davis",
      id: "5",
      phoneNumber: "+543 210 9876",
      role: UserRole.CUSTOMER,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
    {
      email: "carla@example.com",
      fullName: "Carla Davis",
      id: "7",
      phoneNumber: "+543 210 9876",
      role: UserRole.CUSTOMER,
      profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
    },
  ]);

  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const endCall = () => alert("Call ended!");
  const toggleScreenShare = () => {
    setIsSharing(!isSharing);
    isSharing == true
      ? toast({
          title: "Sharing Started",
          description: "Screen sharing has started successfully!",
          variant: "default",
        })
      : toast({
          title: "Sharing Ended",
          description: "Screen sharing has ended!",
          variant: "default",
        });
  };

  return (
    <div className="flex items-stretch w-full ">
      <div className="flex-1 min-h-[90vh] bg-background flex flex-col justify-between">
        <VideoGrid participants={participants} />
        <Controls
          isSharing={isSharing}
          toggleScreenShare={toggleScreenShare}
          isMuted={isMuted}
          isVideoOn={isVideoOn}
          toggleMute={toggleMute}
          toggleVideo={toggleVideo}
          endCall={endCall}
        />
      </div>
      <ChatPanel />
    </div>
  );
};

export default ConferenceRoom;
