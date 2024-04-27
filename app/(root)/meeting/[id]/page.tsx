'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import Whiteboard from '@/components/Whiteboard';

const MeetingPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const toggleWhiteboard = () => {
    setShowWhiteboard(prev => !prev);
    console.log('Whiteboard toggled. Current state:', !showWhiteboard);
};

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return <p className="text-center text-3xl font-bold text-white">Call Not Found</p>;

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));
  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;
  return (
    <main className="h-screen w-full">
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetupComplete ? (
                    <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                ) : (
                    <MeetingRoom />
                )}
                <button onClick={() => {
                    console.log('Whiteboard visibility toggled to:', !showWhiteboard);
                    setShowWhiteboard(!showWhiteboard);
                }} className="absolute top-10 right-10 z-50 p-2 text-white bg-blue-500 rounded">
                    {showWhiteboard ? 'Hide Whiteboard' : 'Show Whiteboard'}
                </button>
                {showWhiteboard && (
                    <>
                        <Whiteboard />
                        <button onClick={() => setShowWhiteboard(false)}>Hide Whiteboard</button>
                    </>
                )}
            </StreamTheme>
        </StreamCall>
    </main>
);
};

export default MeetingPage;
