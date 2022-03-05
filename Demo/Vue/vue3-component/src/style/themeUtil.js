import cssVars from 'css-vars-ponyfill';

const darkTheme = 'rgb(52, 50, 50)';
const lightTheme = '#fff';
const lightBorderTheme = '#d6d6d6';

// 获取相应的主题色
export const getThemeMap = (isLight) => {
  return {
    'theme-bg': isLight ? lightTheme : darkTheme,
    'theme-color': isLight ? darkTheme : lightTheme,
    'theme-boder-color': isLight ? lightBorderTheme : lightTheme,
  };
};

// 设置主题色值
export const setTheme = (isLight = true) => {
  const themeMap = getThemeMap(isLight);
  const body = document.body;
  Object.keys(themeMap).forEach((key) => {
    body.style.setProperty(`--${key}`, themeMap[key]);
  });
  // 兼容性
  cssVars({
    watch: true, // 添加、删除、修改<link> 或 <style> 元素的禁用或href属性时，ponyfill会自动调用
    variables: themeMap, // variables 自定义属性名/值对的集合
    onlyLegacy: false, // false默认将css变量编译为浏览器识别的css样式；true当浏览器不支持css变量的时候将css变量编译为识别的css
  });
};
