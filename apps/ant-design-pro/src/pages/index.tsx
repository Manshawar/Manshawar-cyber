import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';



const Index: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const { defaultStyle } = useModel('theme');
  return (
    <PageContainer header={{ breadcrumb: {}, title: '' }}>
      <Card
        style={{
          borderRadius: 8,
        }}
      >

      </Card>
    </PageContainer>
  );
};

export default Index;
