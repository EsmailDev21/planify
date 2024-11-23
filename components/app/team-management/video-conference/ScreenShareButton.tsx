"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScreenShare, ScreenShareOff } from "lucide-react";

const ScreenShareButton = ({
  toggleScreenShare,
  isSharing,
}: {
  toggleScreenShare: () => void;
  isSharing: boolean;
}) => {
  return (
    <Button variant="outline" size="icon" onClick={toggleScreenShare}>
      {isSharing ? <ScreenShare size={20} /> : <ScreenShareOff size={20} />}
    </Button>
  );
};

export default ScreenShareButton;
