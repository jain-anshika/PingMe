import React, { useContext, useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const chatAreaRef = useRef();
  const scrollEnd = useRef();

  const [input, setInput] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Send text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input.trim() });
    setInput('');
  };

  // Send image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  // Fetch messages on selecting user
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Scroll to bottom only if user is at bottom
  useEffect(() => {
    if (shouldAutoScroll && scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, shouldAutoScroll]);

  // Handle manual scroll position
  const handleScroll = () => {
    const el = chatAreaRef.current;
    if (!el) return;

    const threshold = 150; // px from bottom
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setShouldAutoScroll(atBottom);
    setShowScrollButton(!atBottom);
  };

  const scrollToBottom = () => {
    scrollEnd.current?.scrollIntoView({ behavior: 'smooth' });
    setShouldAutoScroll(true);
  };

  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">
      {/* ----------Header---------- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
      </div>

      {/* ----------Chat Area---------- */}
      <div
        ref={chatAreaRef}
        onScroll={handleScroll}
        className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 scroll-smooth"
      >
        {messages
          ?.filter((msg) => msg && msg.senderId)
          .map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 justify-end ${
                msg.senderId !== authUser._id ? 'flex-row-reverse' : ''
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                    msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </p>
              )}
              <div className="text-center text-xs">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser?.profilePic || assets.avatar_icon
                      : selectedUser?.profilePic || assets.avatar_icon
                  }
                  alt=""
                  className="w-7 rounded-full"
                />
                <p className="text-white">{formatMessageTime(msg.createdAt)}</p>
              </div>
            </div>
          ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* ----------Scroll to Bottom Button---------- */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full shadow-md text-xs transition duration-300"
        >
          ↓
        </button>
      )}

      {/* ----------Bottom Area---------- */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input onChange={handleSendImage} type="file" id="image" accept="image/png,image/jpeg" hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
