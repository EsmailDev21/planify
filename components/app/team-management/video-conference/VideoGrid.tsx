import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserModel } from "@/lib/types/models";
import Image from "next/image";

const VideoGrid = ({ participants }: { participants: UserModel[] }) => {
  return (
    <div
      className={
        "h-full grid gap-4 p-4" +
        (participants.length > 6 && participants.length <= 8
          ? " grid-cols-4"
          : participants.length > 8
          ? " grid-cols-5"
          : " grid-cols-3")
      }
    >
      {participants.map((participant) => (
        <Card key={participant.id} className="relative border-muted h-[90%]">
          <CardContent className="relative  h-full p-0">
            <video
              autoPlay
              muted={participant.id === "1"} // Mute the self-video
              className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
            ></video>
            <Image
              height={200}
              width={200}
              src={
                participant.profilePhoto || "/assets/images/avatars/avatar1.png"
              }
              alt={participant.fullName}
              className="absolute top-2 left-2 w-12 h-12 rounded-full border border-muted"
            />
          </CardContent>
          <CardFooter className="absolute bottom-0 left-0 w-full text-sm">
            {participant.fullName}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VideoGrid;
