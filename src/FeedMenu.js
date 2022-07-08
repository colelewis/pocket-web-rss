import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function FeedMenu() {
  return (
    <Menu menuButton={<MenuButton>Menu</MenuButton>} transition>
      <MenuItem>Add URL...</MenuItem>
      <MenuItem>Reset Data</MenuItem>
      <MenuItem>Export packages...</MenuItem>
      {/* <SubMenu label="Theme">
            <MenuItem>Light</MenuItem>
            <MenuItem>Dark</MenuItem>
          </SubMenu> */}
      <MenuItem>About</MenuItem>
    </Menu>
  );
}