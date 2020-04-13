/*js.js*/
/*选择图片
(function(){
	$('#upload').click(function(){
		$("#_f").click(); 
	});
})();*/
var f = null;	//文件信息
var src = null;	//src地址
var aTitle = []; //文件名数组
var aSize = []; //文件大小数组
var AllSize = 0;//总文件大小

var oLi = null; //
var oDrag = document.getElementById('drag');
var oUpload = document.getElementById('upload');
var oBtn = document.getElementById('btn');
var aInput = document.getElementsByTagName('input');
var oList = document.getElementsByClassName('list')[0];
var oUl = oList.getElementsByTagName('ul')[0];

var arr = [];
	// 1、选择文件
	for( var i=0;i<aInput.length;i++ ){
		aInput[i].onchange = function (e) {
			if(this.value){
                //console.log(this.value);

                var files = this.files[0];  // 单文件上传
                //console.log(files);

				arr.push( files );  // 放在数组里头，点击按钮 ajax上传
				// 获取 文件名称
				var oName = files.name;
				// 获取 文件大小
				var oSize = files.size;

                aTitle.push(oName);
                aSize.push(oSize);

                var obj = new FileReader();  // 创建读取文件对象
                obj.readAsDataURL(files);  // 分析文件

                obj.onload = function () {
                    //console.log( this.result );
                    oLi = document.createElement('li');
                    oLi.innerHTML = '<img src="'+this.result+'" width="100%" height="100%"/><p></p>';
                    oUl.appendChild(oLi);

                    //  显示图片大小 图片名称
                    conut();

                    slide();
                };
                this.value = '';
			}
        };
	}

	// 2、拖拽文件
	(function () {
        oDrag.ondragenter = function (e) {
            this.innerHTML = '请释放鼠标';
        };
        oDrag.ondragover = function (e) {
			e.preventDefault();
        };
        oDrag.ondragleave = function (e) {
            this.innerHTML = '请将图片拖到此区域';
        };
        oDrag.ondrop = function (e) {
            e.preventDefault();
            var files = e.dataTransfer.files;
            //console.log( files.length );
			for( var i=0;i<files.length;i++ ){
                arr.push( files[i] );  // 放在数组里头，点击按钮 ajax上传

                var obj = new FileReader();
                obj.readAsDataURL(files[i]);

                // 获取 文件名称
                var oName = files[i].name;
                // 获取 文件大小
                var oSize = files[i].size;

                console.log('大小'+oSize);
                aTitle.push(oName);
                aSize.push(oSize);

                //console.log( files[i].name );
                obj.onload = function () {
                    //console.log( this.result );
                    oLi = document.createElement('li');
                    oLi.innerHTML = '<img src="'+this.result+'" width="100%" height="100%"/><p></p>';
                    oUl.appendChild(oLi);
                    conut();
                    slide();
                };
			}
        };
    })();

	// 3、 统计 图片大小 图片名称 图片的个数
	function conut(){
		var oPicLen = document.getElementById('picLen');
		var oPicSize = document.getElementById('picSize');

		var aP = oUl.getElementsByTagName('p');

		console.log( aTitle,aSize );

        //console.log( Number(a)+Number(b) );
        console.log( eval( aSize.join('+') ) );
		if( !aTitle[0] ){
            oPicSize.innerText = 0;
		}else{
            AllSize = eval( aSize.join('+') );
            oPicSize.innerHTML = (AllSize/1024/1024).toFixed(2);
		}

        oPicLen.innerText = aTitle.length;

        for( var i=0;i<aTitle.length;i++ ){
            aP[i].innerHTML = aTitle[i]+'<i></i>';
		}
        slide();
	}


	// 4、 下拉效果

	function slide() {
		var n = 0;
		var aLi = oUl.getElementsByTagName('li');
		for( var i=0;i<aLi.length;i++ ){
            aLi[i].index = i;
            aLi[i].onmouseenter = function () {
            	//console.log(1);
				this.children[1].style.height = '35px';
            };
            aLi[i].onmouseleave = function () {
                this.children[1].style.height = '0';
            };
            aLi[i].children[1].children[0].onclick = function () {
				//console.log(this.parentNode.parentNode.index);
				n = this.parentNode.parentNode.index;
				oUl.removeChild(aLi[n]);

                aTitle.splice(n,1);
                aSize.splice(n,1);
                //console.log( aTitle,aSize );
                conut();
            }
		}
    }


	ck();
    function ck() {
        oBtn.onclick = function () {
			console.log( arr );  //[File, File, File]
			for( var i=0;i<arr.length;i++ ){
				(function (i) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('post','upload.php',true);
                    xhr.setRequestHeader('X-Request-width','XMLHttpRequest');

                    var oFormData = new FormData();
                    oFormData.append('file',arr[i]);
                    xhr.send(oFormData);
                })(i);
			}
        };
    }
























