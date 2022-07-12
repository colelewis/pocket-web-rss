import { Menu, MenuItem, MenuButton, SubMenu} from '@szhsin/react-menu';
import MenuIcon from '@mui/icons-material/Menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function FeedMenu(props) {
  return (
    <>
    <h5>pocket-web-rss</h5>
    <Menu menuButton={<MenuButton style={{border: 'none', width: '75%', backgroundColor: '#e6e6e6', borderRadius: '10px'}}><MenuIcon /></MenuButton>} transition direction='bottom'>
      <MenuItem>Add URL...</MenuItem>
      <MenuItem>Sources</MenuItem>
      <MenuItem>Clear Data</MenuItem>
      <MenuItem>Export packages...</MenuItem>
      <SubMenu label="Theme">
            <MenuItem>Light</MenuItem>
            <MenuItem>Dark</MenuItem>
          </SubMenu>
      <MenuItem>Saved Items</MenuItem>
      <MenuItem>About</MenuItem>
    </Menu>
    </>
  );
}