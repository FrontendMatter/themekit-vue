import AlertNotification from './components/alert-notification'
import CarouselItem from './components/carousel-item'
import Carousel from './components/carousel'
import CoverBanner from './components/cover-banner'
import CoverLink from './components/cover-link'
import CoverOverlay from './components/cover-overlay'
import Cover from './components/cover'
import DropdownAreaList from './components/dropdown-area-list'
import DropdownArea from './components/dropdown-area'
import DropdownListItem from './components/dropdown-list-item'
import DropdownMenu from './components/dropdown-menu'
import DropdownSearch from './components/dropdown-search'
import Dropdown from './components/dropdown'
import ExpandablePanel from './components/expandable-panel'
import Expandable from './components/expandable'
import LayoutTransition from './components/layout-transition'
import Layout from './components/layout'
import Modal from './components/modal'
import Navbar from './components/navbar'
import SidebarToggleButton from './components/sidebar-toggle-button'
import SidebarTransition from './components/sidebar-transition'
import Sidebar from './components/sidebar'
import SidebarCollapseItem from './components/sidebar-collapse-item'
import SidebarDropdownController from './components/sidebar-dropdown-controller'
import SidebarDropdownItem from './components/sidebar-dropdown-item'
import SidebarFeed from './components/sidebar-feed'
import SidebarMenuItem from './components/sidebar-menu-item'
import SidebarMenu from './components/sidebar-menu'
import SidebarTabPane from './components/sidebar-tab-pane'
import SidebarTabs from './components/sidebar-tabs'
import TabPane from './components/tab-pane'
import TabsNav from './components/tabs-nav'
import Tabs from './components/tabs'

let ThemeKit = {
	AlertNotification,
	CarouselItem,
	Carousel,
	CoverBanner,
	CoverLink,
	CoverOverlay,
	Cover,
	DropdownAreaList,
	DropdownArea,
	DropdownListItem,
	DropdownMenu,
	DropdownSearch,
	Dropdown,
	ExpandablePanel,
	Expandable,
	LayoutTransition,
	Layout,
	Modal,
	Navbar,
	SidebarToggleButton,
	SidebarTransition,
	Sidebar,
	SidebarCollapseItem,
	SidebarDropdownController,
	SidebarDropdownItem,
	SidebarFeed,
	SidebarMenuItem,
	SidebarMenu,
	SidebarTabPane,
	SidebarTabs,
	TabPane,
	TabsNav,
	Tabs
}

// Load directives
import Scrollable from './directives/scrollable'
import Highlight from './directives/highlight'

// vue-transfer-dom
import VueTransferDom from 'vue-transfer-dom'

// Setup
ThemeKit.install = function (Vue) {
	Vue.directive('scrollable', Scrollable)
	Vue.directive('highlight', Highlight)

	// vue-transfer-dom
	Vue.use(VueTransferDom)
}

// auto install in browser
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(ThemeKit)
}

// ES6
export default ThemeKit

// CommonJS
module.exports = exports.default