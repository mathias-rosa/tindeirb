import React from 'react';
import Avatar from './Avatar';

interface RightBubbleProps {
  sender: string;
  message: string;
  senderId: string;
}

const RightBubble: React.FC<RightBubbleProps> = ({ sender, message, senderId }) => {
  return (
    <div className='chat chat-end'>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <Avatar seed={senderId} />
        </div>
      </div>
      <div className='chat-header py-1 px-3'>
        {sender}
      </div>
      <div className='chat-bubble shadow-sm text-md bg-white/80 backdrop-blur-sm text-gray-800 font-medium'>
        <p className='white-space: pre-wrap'>
          {message}
        </p>
      </div>
    </div>
  );
};

export default RightBubble;

