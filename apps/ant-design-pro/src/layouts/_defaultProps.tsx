import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
import routes from '../../config/routes';
import * as iconAnt from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';

const loopMenuItem = (menus: any[]): any[] =>
  menus.map(({ icon: itemIcon, routes, ...item }) => {
    return {
      ...item,
      icon: itemIcon && (iconAnt as any)[itemIcon].render(),
      routes: routes && loopMenuItem(routes),
    };
  });

export default {
  route: {
    path: '/',
    routes: loopMenuItem(routes),
  },
  location: {
    pathname: '/',
  },
};
