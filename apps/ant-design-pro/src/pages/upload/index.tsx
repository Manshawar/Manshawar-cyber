import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
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
  useEffect(() => {
    listen('download-started', (event) => {
      console.log('download-started started:', event);
    });
    invoke('download')
      .then((res) => console.log('res', res))
      .catch((e) => console.error(e));
  }, []);
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
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          console.log('剪切板中的图片已保存为 PNG 文件');
        } else {
          console.log('剪切板中没有图片内容');
        }
      }
    }
  }
  return (
    <PageContainer header={{ breadcrumb: {}, title: '' }}>
      <Card
        style={{
          borderRadius: 8,
          minHeight: '70vh',
        }}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or
            other banned files.
          </p>
        </Dragger>
        <div tabIndex={0} onKeyDown={getPic} style={{ width: '100%', height: '500px' }}>
          <h2>剪切板中的图片：</h2>
          {imageUrl && (
            <img src={imageUrl} alt="剪切板图片" style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          {/* <IKContext
            publicKey="public_f0lEErwJhjlt4SJMaHwZjt0aJ+U="
            urlEndpoint="https://ik.imagekit.io/Manshawar"
            transformationPosition="path"
          >
            // Image component
            <IKImage
              path="/default-image.jpg"
              transformation={[
                {
                  height: '300',
                  width: '400',
                },
              ]}
            />
            // Image upload
            <IKUpload
              fileName="my-upload"
              onSuccess={(res) => {
                console.log(res);
              }}
            />
          </IKContext> */}
        </div>
      </Card>
    </PageContainer>
  );
};

export default Index;
