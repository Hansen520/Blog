/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemlySize: string;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}
/* TabsState */
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

// AuthState 
export interface AuthState {
	authButtons: {
		[propName: string]: any
	};
	authRouter: string[];
};