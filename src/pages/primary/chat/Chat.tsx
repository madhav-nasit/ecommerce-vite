import { Button } from 'components';
import { useAuthContext } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Message } from 'types';

/**
 * Chat Component
 *
 * This component handles the chat interface, including message sending, receiving, and displaying.
 * It utilizes socket.io for real-time communication.
 */
export const Chat = () => {
  // Context and routing hooks
  const { user } = useAuthContext();
  const { chatId } = useParams();
  const { state } = useLocation();

  // constants
  const userId = user?._id;

  // Socket instance
  const socket = io('http://localhost:3000');

  // References and state variables
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // states
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [typingStatus, setTypingStatus] = useState('');
  const [senderOnline, setSenderOnline] = useState('');

  // Effect to handle socket events
  useEffect(() => {
    socket.emit('join', { userId, chatId });

    socket.on('chat history', (messages: Message[]) => {
      setMessages(messages);
    });

    socket.on('new message', (message: Message) => {
      if (message.sender._id !== userId) {
        socket.emit('message delivered', { chatId, messageId: message._id });
      }
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('typing', ({ userId: typingUserId, isTyping }) => {
      if (userId !== typingUserId) {
        setTypingStatus(isTyping ? 'typing...' : '');
      }
    });

    socket.on(
      'user online',
      ({ userId: senderId, online }: { userId: string; online: boolean }) => {
        if (state.user._id == senderId) {
          setSenderOnline(online ? 'online' : '');
        }
      },
    );

    // Cleanup on unmount
    return () => {
      socket.emit('user online', { userId, chatId, online: false });
      socket.disconnect();
      setMessages([]);
    };
  }, [chatId]);

  // Effect to scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Scrolls to the bottom of the chat messages.
   */
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  /**
   * Sends a message and updates the typing status.
   */
  const sendMessage = () => {
    socket.emit('send message', { chatId, senderId: userId, message });
    socket.emit('typing', { userId, chatId, isTyping: false });
    setMessage('');
  };

  /**
   * Renders the timestamp for a message.
   */
  const renderTimeStamp = (time: string) => {
    const date = new Date(time);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return <p className='text-10px'>{`${hours}:${minutes}`}</p>;
  };

  /**
   * Renders the profile icon for a user.
   */
  const renderProfile = (user: Message['sender']) => (
    <div
      className={`flex size-8 items-center justify-center rounded-full border border-border bg-secondary dark:border-border-dark dark:bg-secondary-dark`}
    >
      <p className='text-xs font-semibold'>
        {user.firstName && user.lastName
          ? `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
          : ''}
      </p>
    </div>
  );

  /**
   * Renders a sent message.
   */
  const sentMessage = (item: Message) => (
    <div key={item._id} className='flex w-full items-end justify-end space-x-2 px-2 md:px-4'>
      <div className='rounded-lg bg-primary bg-opacity-70 p-2 text-light-dark md:p-3'>
        <p className='text-sm text-color-dark'>{item.message}</p>
        {renderTimeStamp(item.timestamp)}
      </div>
      {renderProfile(item.sender)}
    </div>
  );

  /**
   * Renders a received message.
   */
  const receivedMessage = (item: Message) => (
    <div key={item._id} className='flex w-full items-start space-x-2 px-2 md:px-4'>
      {renderProfile(item.sender)}
      <div className='rounded-lg bg-secondary p-2 text-light-dark md:p-3 dark:bg-secondary-dark'>
        <p className='text-sm text-color dark:text-color-dark'>{item.message}</p>
        {renderTimeStamp(item.timestamp)}
      </div>
    </div>
  );

  /**
   * Renders all messages.
   */
  const renderMessage = () => {
    if (messages && messages.length > 0) {
      return messages.map((element) => {
        if (element.sender._id === userId) {
          return sentMessage(element);
        } else {
          return receivedMessage(element);
        }
      });
    }
  };

  return (
    <div className='flex h-full w-full justify-center overflow-y-scroll bg-background p-0 md:p-4 dark:bg-background-dark'>
      <div className='mx-auto w-full max-w-screen-xl rounded-lg border border-border bg-background shadow-none md:shadow-md dark:border-border-dark dark:bg-background-dark'>
        <div className='flex h-full flex-col overflow-y-scroll'>
          <div className='border-b border-border bg-secondary px-4 py-2 dark:border-border-dark dark:bg-secondary-dark'>
            <h2 className='text-base text-color dark:text-color-dark'>
              {state.user.firstName + ' ' + state.user.lastName}
            </h2>
            <div>
              <p className='text-xs'>
                {!!typingStatus ? typingStatus : !!senderOnline ? senderOnline : ' '}
              </p>
            </div>
          </div>
          <div className='flex h-full w-full flex-col justify-end overflow-y-scroll'>
            <div className='space-y-2 overflow-y-scroll py-4'>
              {renderMessage()}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className='flex items-center space-x-2 border-t border-border p-2 dark:border-border-dark'>
            <input
              type='text'
              className='flex-1 rounded border border-border bg-background p-2 text-sm dark:border-border-dark dark:bg-card-dark'
              placeholder='Type your message...'
              onChange={(e) => {
                setMessage(e.target.value);
                socket.emit('typing', { userId, chatId, isTyping: !!e.target.value });
              }}
              value={message}
            />
            <Button disabled={message.trim() === ''} title='Send' onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};
