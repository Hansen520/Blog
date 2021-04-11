"use strict";
var Components;
(function (Components) {
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement('div');
            elem.innerText = 'This is Header';
            document.body.appendChild(elem);
        }
        return Header;
    }());
    Components.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var elem = document.createElement('div');
            elem.innerText = 'This is Content';
            document.body.appendChild(elem);
        }
        return Content;
    }());
    Components.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement('div');
            elem.innerText = 'This is Footer';
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
// 这句话是对命名空间的注解，并不是引用
///<reference path="components.ts" />
var Home;
(function (Home) {
    // 内部也可以导出命名空间
    var Han;
    (function (Han) {
        Han.teacher = {
            name: 'han'
        };
    })(Han = Home.Han || (Home.Han = {}));
    // 命名空间中还可以再写一个子的命名空间，子命名空间里也可以写入其它内容, 通过export 暴露出去。
    var Page = /** @class */ (function () {
        function Page() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
