import { Input, Button, List, Card, Typography } from 'antd';
import React,{ useState, useRef, useEffect } from 'react';

const { TextArea } = Input;

export default function Chat() {
  const [messages, setMessages] = useState<Array<{content: string, isUser: boolean}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    // 添加用户消息
    setMessages(prev => [...prev, { content: inputValue, isUser: true }]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('http://aiask.yanghaoran.online/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputValue })
      });

      if (!response.body) return;
      
      // 添加AI消息占位符
      setMessages(prev => [...prev, { content: '', isUser: false }]);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          newMessages[newMessages.length - 1] = {
            ...lastMessage,
            content: lastMessage.content + chunk
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('请求失败:', error);
      setMessages(prev => [...prev, { content: '请求失败，请稍后重试', isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      title="AI 问答助手" 
      style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}
      bodyStyle={{ height: 500, overflowY: 'auto' }}
    >
      <List
        dataSource={messages}
        renderItem={item => (
          <List.Item style={{ 
            justifyContent: item.isUser ? 'flex-end' : 'flex-start',
            padding: '8px 0'
          }}>
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '18px',
              background: item.isUser ? '#1890ff' : '#f5f5f5',
              color: item.isUser ? 'white' : 'rgba(0, 0, 0, 0.88)'
            }}>
              <Typography.Text>{item.content}</Typography.Text>
            </div>
          </List.Item>
        )}
      />
      <div ref={messagesEndRef} />
      
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入你的问题..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button 
          type="primary" 
          onClick={handleSend}
          loading={loading}
          disabled={loading}
          style={{ alignSelf: 'flex-end' }}
        >
          发送
        </Button>
      </div>
    </Card>
  );
}