import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'こんにちは！何かお手伝いできることはありますか？',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // チャットボットの応答を生成する関数
  const generateBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('こんにちは') || lowerCaseMessage.includes('hello')) {
      return 'こんにちは！どのようにお手伝いできますか？';
    } else if (lowerCaseMessage.includes('記事') || lowerCaseMessage.includes('投稿')) {
      return '最新の記事は「Reactの最新機能」についてです。記事一覧ページからご覧いただけます。';
    } else if (lowerCaseMessage.includes('カテゴリー') || lowerCaseMessage.includes('category')) {
      return '当サイトでは「プログラミング」「デザイン」「テクノロジー」のカテゴリーがあります。';
    } else if (lowerCaseMessage.includes('誰') || lowerCaseMessage.includes('著者') || lowerCaseMessage.includes('author')) {
      return '当サイトの著者はプログラミングとデザインを専門とするフリーランスエンジニアです。詳しくはホームページの著者紹介をご覧ください。';
    } else {
      return 'すみません、その質問にはお答えできません。他に何かお聞きになりたいことはありますか？';
    }
  };

  // メッセージを送信する関数
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // ユーザーメッセージを追加
    const userMessage = {
      text: message,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    // ボットの応答を生成して追加（少し遅延させる）
    setTimeout(() => {
      const botResponse = {
        text: generateBotResponse(userMessage.text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  // チャットボットを開いたらフォーカスを入力欄に移動
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 新しいメッセージが来たら自動的にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* チャットボットトグルボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-5 bottom-5 z-50 p-3 rounded-full shadow-lg transition-colors ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
        aria-label={isOpen ? 'チャットを閉じる' : 'チャットを開く'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* チャットウィンドウ */}
      {isOpen && (
        <div className="fixed right-5 bottom-20 z-50 w-80 h-96 sm:w-96 sm:h-[28rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-all">
          {/* ヘッダー */}
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">サポートチャット</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="チャットを閉じる"
            >
              <X size={18} />
            </button>
          </div>

          {/* メッセージエリア */}
          <div className="flex-grow p-3 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.isBot
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-grow py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 rounded-r-lg transition-colors"
                disabled={!message.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;