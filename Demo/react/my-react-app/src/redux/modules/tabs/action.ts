import * as types from "@/redux/mutation-types"

// addTabs
// export const addTabs = (tabItem: Menu.MenuOptions) => ({
//     type: types.ADD_TABS,
//     tabItem
// });

// setTabsList
export const setTabsList = (tabsList: Menu.MenuOptions) => ({
    type: types.SET_TABS_LIST,
    tabsList
});

// setTabsActive
export const setTabsActive = (tabsActive: string) => ({
    type: types.SET_TABS_ACTIVE,
    tabsActive
})
