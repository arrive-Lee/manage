// 用于组测Ui组件库，按需映入
import {
  Button,
  Header,
  Main,
  Aside,
  Container,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  TimePicker,
  Input,
  Tag,
  Message,
  Pagination,
  Dialog,
} from "element-ui";

export default {
  install(Vue) {
    Vue.use(Button);
    Vue.use(Header);
    Vue.use(Main);
    Vue.use(Container);
    Vue.use(Aside);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Card);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Breadcrumb);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Select);
    Vue.use(TimePicker);
    Vue.use(Input);
    Vue.use(Tag);
    Vue.use(Message);
    Vue.use(Pagination);
    Vue.use(Dialog);
  },
};
