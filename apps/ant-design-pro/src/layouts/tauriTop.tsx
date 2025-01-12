import style from './taruiTop.module.scss';
import { useEffect, useState } from 'react';
import {
  MinusOutlined,
  CloseOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useNavigate } from '@umijs/max';
export default function ({ children }: any) {
  const appWindow = getCurrentWindow();
  const [max, setMax] = useState(false);
  useEffect(() => {
    localStorage.setItem('pathname', location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    let router = localStorage.getItem('pathname');
    if (router && router !== location.pathname) {
      let navigate = useNavigate();
      navigate(router, { replace: true });
    }
  }, []);
  return (
    // <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div className={style.topMenu}>
      <div data-tauri-drag-region className={style.titlebar}>
        <div
          className={style['titlebar-button']}
          id="titlebar-minimize"
          onClick={() => appWindow.minimize()}
        >
          <MinusOutlined />
        </div>
        <div
          className={style['titlebar-button']}
          id="titlebar-maximize"
          onClick={() => {
            setMax(() => !max);
            console.log(max);
            appWindow.toggleMaximize();
          }}
        >
          {max ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </div>
        <div
          className={style['titlebar-button']}
          id="titlebar-close"
          onClick={() => appWindow.close()}
        >
          <CloseOutlined />
        </div>
      </div>
      <div>{children}</div>
    </div>
    // </div>
  );
}
