"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScreenShare } from "lucide-react";

const ScreenShareButton = ({
  startScreenShare,
}: {
  startScreenShare: () => void;
}) => {
  return (
    <Button
      variant="default"
      size="sm"
      onClick={startScreenShare}
      className="mt-4"
    >
      <ScreenShare size={20} className="mr-2" />
      Share Screen
    </Button>
  );
};

export default ScreenShareButton;
