import CarouselItem from './components/carousel-item'
import Carousel from './components/carousel'
import CoverBanner from './components/cover-banner'
import CoverLink from './components/cover-link'
import CoverOverlay from './components/cover-overlay'
import Cover from './components/cover'
import DropdownArea from './components/dropdown-area'
import DropdownMenu from './components/dropdown-menu'
import Dropdown from './components/dropdown'
import DropzoneControlProgress from './components/dropzone-control-progress'
import DropzoneControl from './components/dropzone-control'
import Dropzone from './components/dropzone'
import ExpandablePanel from './components/expandable-panel'
import Expandable from './components/expandable'
import Isotope from './components/isotope'
import IsotopeItem from './components/isotope-item'
import LayoutTransition from './components/layout-transition'
import Layout from './components/layout'
import Modal from './components/modal'
import Navbar from './components/navbar'
import Mprogress from './components/mprogress'
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
	CarouselItem,
	Carousel,
	CoverBanner,
	CoverLink,
	CoverOverlay,
	Cover,
	DropdownArea,
	DropdownMenu,
	Dropdown,
	DropzoneControlProgress,
	DropzoneControl,
	Dropzone,
	ExpandablePanel,
	Expandable,
	Isotope,
	IsotopeItem,
	LayoutTransition,
	Layout,
	Modal,
	Navbar,
	Mprogress,
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
import Datepicker from './directives/datepicker'
import Highlight from './directives/highlight'

// Setup
ThemeKit.install = function (Vue) {
	Vue.directive('scrollable', Scrollable)
	Vue.directive('datepicker', Datepicker)
	Vue.directive('highlight', Highlight)
}

import Attach from './mixins/attach'

ThemeKit.mixins = {
	Attach
}

// auto install in browser
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(ThemeKit)
}

// ES6
export default ThemeKit

// CommonJS
module.exports = exports.default