import { useModel } from '@umijs/max';
import { theme, Splitter, Image, Flex, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
type DownloadStarted = {
  url: string;
  downloadId: number;
  contentLength: number;
};

const Index: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const { defaultStyle } = useModel('theme');
  const [messageApi, contextHolder] = message.useMessage();
  interface DataType {
    address: string;
    key: string;
  }
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  async function getPic(event: any) {
    // console.log(event);
    if (event.ctrlKey && event.key === 'v') {
      console.log('Ctrl + V 被按下');
      const clipboardItems = await navigator.clipboard.read();
      console.log(clipboardItems);
      for (const item of clipboardItems) {
        // 检查是否有图片类型
        if (item.types.includes('image/png')) {
          const blob = await item.getType('image/png');
          const arrayBuffer = await blob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          console.log('剪切板中的图片已保存为 PNG 文件');
          to_upload(uint8Array);
        } else {
          console.log('剪切板中没有图片内容');
        }
      }
    }
  }

  const to_upload = async (uint8Array: any) => {
    if (uint8Array) {
      invoke('test', { msg: uint8Array }).then((res) => {
        setDataSource([...dataSource, { address: res as string, key: res as string }]);
        navigator.clipboard.writeText(res as string);
        setImageUrl('');
        messageApi.open({
          type: 'success',
          content: '上传成功',
        });
      });
    }
  };

  const rightClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, src: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(src as string);
    messageApi.open({
      type: 'success',
      content: '已复制',
    });
  };

  return (
    <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', flex: 1 }} layout="vertical">
      <Splitter.Panel collapsible min="20%">
        <div tabIndex={0} style={{ height: '100%' }} onKeyDown={getPic}>
          <h2 style={{ textAlign: 'center' }}>剪切板中的图片</h2>
          {imageUrl && (
            <img src={imageUrl} alt="剪切板图片" style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          {contextHolder}
        </div>
      </Splitter.Panel>
      <Splitter.Panel collapsible>
        <Flex wrap gap="small">
          {dataSource.map((item) => (
            <Image
              src={item.address}
              width={100}
              height={100}
              key={item.key}
              onContextMenu={(e) => rightClick(e, item.address)}
            />
          ))}
        </Flex>
      </Splitter.Panel>
    </Splitter>
  );
};

export default Index;
