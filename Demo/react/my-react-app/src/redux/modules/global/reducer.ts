import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const globalState: GlobalState = {
    token: "",
    userInfo: "",
    assemlySize: "default",
    language: "",
	themeConfig: {
		// 默认 primary 主题颜色
		primary: "#1890ff",
		// 是否开启深色模式
		isDark: false
	}
};

// global reducer
const global = (state: GlobalState = globalState, action: AnyAction) => produce(state, draftState => {
    switch (action.type) {
        case types.SET_TOKEN:
            draftState.token = action.token;
            break;
        default:
            return draftState;
    }
});

export default global;
