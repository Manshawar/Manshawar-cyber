import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Link, useLocation } from '@umijs/max';
const { useToken, getDesignToken } = theme;
import { ConfigProvider, theme } from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';
import TauriTop from './tauriTop';
import style from './baseLayout.module.scss';
export default (props: any) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  });

  const config = {
    token: {
      colorPrimary: '#ccc',
    },
  };

  const [pathname, setPathname] = useState(useLocation().pathname);

  const [num, setNum] = useState(40);
  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          backgroundImage: "url('/bg/LonelyCAT.png')",
          backgroundSize: 'cover',
        }}
        className={style['video-background']}
      >
        {/* <video autoPlay loop muted playsInline>
          <source
            src="/bg/4kpro_1e9da.mp4"
            type="video/mp4"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          />
          您的浏览器不支持视频标签。
        </video> */}
      </div>

      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
          theme={config}
        >
          <ProLayout
            prefixCls="my-prefix"
            bgLayoutImgList={[
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                left: 85,
                bottom: 100,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                bottom: -68,
                right: -45,
                height: '303px',
              },
              {
                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                bottom: 0,
                left: 0,
                width: '331px',
              },
            ]}
            {...defaultProps}
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
              colorPrimary: 'rgba(255,255,255.3)',
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            headerRender={(props, defaultDom) => {
              return (
                <div style={{ paddingTop: '30px' }}>
                  <TauriTop>{defaultDom}</TauriTop>
                </div>
              );
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {/* {logo}
                    {title} */}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  {/* <MenuCard /> */}
                </>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuRender={(props, defaultDom) => {
              return <div className={style.sidebar}>{defaultDom}</div>;
            }}
            menuItemRender={(item, dom) => {
              return (
                <div
                  style={{ color: '#d8dfe8', fontSize: '1.2rem' }}
                  onClick={() => {
                    setPathname(item.path || '/welcome');
                  }}
                >
                  {item.path ? <Link to={item.path}>{dom}</Link> : dom}
                </div>
              );
            }}
            {...settings}
          >
            <PageContainer
              token={{
                paddingInlinePageContainerContent: num,
              }}
              header={{ breadcrumb: {}, title: '' }}
            >
              <ProCard
                bodyStyle={{
                  minHeight: '70vh',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 0 }}>
                  {props.children}
                </div>
              </ProCard>
            </PageContainer>
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
