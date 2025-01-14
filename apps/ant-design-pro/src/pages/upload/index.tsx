import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, message, Upload, Image, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, TableColumnsType } from 'antd';
import { IKContext, IKUpload, IKImage } from 'imagekitio-react';
import { listen } from '@tauri-apps/api/event';
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

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [imageBase, setImageBase] = useState<Uint8Array<ArrayBuffer>>();
  const publicKey = 'public_f0lEErwJhjlt4SJMaHwZjt0aJ+U=';
  const urlEndpoint = 'https://ik.imagekit.io/Manshawar';
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
          setImageBase(uint8Array);
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
        setImageUrl('');
      });
    }
  };

  interface DataType {
    address: string;
    key: React.Key;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: '图片',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: (value, record, index) => {
        return (
          <div
            style={{ width: '100%' }}
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
          >
            <Image
              width={200}
              src={value}
              placeholder={<Image preview={false} src="/bg/LonelyCAT.png" width={200} />}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        flexDirection: 'column',
        display: 'flex',

        justifyContent: 'space-between',
      }}
    >
      <div tabIndex={0} onKeyDown={getPic} style={{ flex: 1 }}>
        <h2>剪切板中的图片：</h2>
        {imageUrl && (
          <img src={imageUrl} alt="剪切板图片" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
      </div>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 'max-content', y: '300px' }}
      ></Table>
    </div>
  );
};

export default Index;
