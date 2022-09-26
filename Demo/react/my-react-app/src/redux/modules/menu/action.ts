import * as types from "@/redux/mutation-types";
import { getMenuList } from "@/api/modules/login";
import { Dispatch } from "react";
import { Menu } from "antd";

interface MenuProps {
    type: string;
    menuList: Menu.MenuOptions[]
}

// updateCollapse
export const updateCollapse = (isCollapse: boolean) => 
    {
        return {
            type: types.UPDATE_COLLAPSE,
            isCollapse
        }
    }

// setMenuList
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
    type: types.SET_MENU_LIST,
    menuList
})

// redux-thunk
export const getMenuListActionThunk = () => {
    return async (dispatch: Dispatch<MenuProps>) => {
        const res = await getMenuList();
        dispatch({
            type: types.SET_MENU_LIST,
            menuList: (res.data as Menu.MenuOptions[]) ?? []
        });
    }
}

// redux-promise《async/await》
export const getMenuListAction = async (): Promise<MenuProps> => {
    const res = await getMenuList();
    return {
        type: types.SET_MENU_LIST,
        menuList: res.data ? res.data : []
    };
}

// redux-promise《.then/.catch》
export const getMenuListActionPromise = (): Promise<MenuProps> => {
    return getMenuList().then(res => {
        return {
            type: types.SET_MENU_LIST,
            menuList: res.data ? res.data : []
        }
    })

}