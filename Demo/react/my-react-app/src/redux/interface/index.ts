export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

// setBreadcrumbList
export interface BreadcrumbState {
	breadcrumbList: {
		[key: string]: any;
	};
}