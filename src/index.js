import CarouselItem from './vue/components/carousel/carousel-item'
import Carousel from './vue/components/carousel/carousel'
import CoverBanner from './vue/components/cover/cover-banner'
import CoverLink from './vue/components/cover/cover-link'
import CoverOverlay from './vue/components/cover/cover-overlay'
import Cover from './vue/components/cover/cover'
import DropdownArea from './vue/components/dropdown/dropdown-area'
import DropdownMenu from './vue/components/dropdown/dropdown-menu'
import Dropdown from './vue/components/dropdown/dropdown'
import DropzoneControlProgress from './vue/components/dropzone/dropzone-control-progress'
import DropzoneControl from './vue/components/dropzone/dropzone-control'
import Dropzone from './vue/components/dropzone/dropzone'
import ExpandablePanel from './vue/components/expandable/expandable-panel'
import Expandable from './vue/components/expandable/expandable'
import Isotope from './vue/components/grid/isotope'
import LayoutTransition from './vue/components/layout/layout-transition'
import Layout from './vue/components/layout/layout'
import Modal from './vue/components/modal/modal'
import Navbar from './vue/components/navbar/navbar'
import Mprogress from './vue/components/progress/mprogress'
import SidebarToggleButton from './vue/components/sidebar/sidebar-toggle-button'
import SidebarTransition from './vue/components/sidebar/sidebar-transition'
import Sidebar from './vue/components/sidebar/sidebar'
import SidebarBlock from './vue/components/sidebar-block/sidebar-block'
import SidebarCollapseItem from './vue/components/sidebar-collapse-menu/sidebar-collapse-item'
import SidebarDropdownController from './vue/components/sidebar-dropdown-menu/sidebar-dropdown-controller'
import SidebarDropdownItem from './vue/components/sidebar-dropdown-menu/sidebar-dropdown-item'
import SidebarFeedItem from './vue/components/sidebar-feed/sidebar-feed-item'
import SidebarFeed from './vue/components/sidebar-feed/sidebar-feed'
import SidebarMenuItem from './vue/components/sidebar-menu/sidebar-menu-item'
import SidebarMenu from './vue/components/sidebar-menu/sidebar-menu'
import SidebarTabPane from './vue/components/sidebar-tabs/sidebar-tab-pane'
import SidebarTabs from './vue/components/sidebar-tabs/sidebar-tabs'
import TabPane from './vue/components/tabs/tab-pane'
import TabsNav from './vue/components/tabs/tabs-nav'
import Tabs from './vue/components/tabs/tabs'

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
	LayoutTransition,
	Layout,
	Modal,
	Navbar,
	Mprogress,
	SidebarToggleButton,
	SidebarTransition,
	Sidebar,
	SidebarBlock,
	SidebarCollapseItem,
	SidebarDropdownController,
	SidebarDropdownItem,
	SidebarFeedItem,
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
import Scrollable from './vue/directives/scrollable'
import Datepicker from './vue/directives/datepicker'
import Highlight from './vue/directives/highlight'

// Setup
ThemeKit.install = function (Vue) {
	Vue.directive('scrollable', Scrollable)
	Vue.directive('datepicker', Datepicker)
	Vue.directive('highlight', Highlight)
}

// auto install in browser
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(ThemeKit)
}

// ES6
export default ThemeKit

// CommonJS
module.exports = exports.default