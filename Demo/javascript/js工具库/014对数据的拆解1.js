// 柱状图基座
let originData = [
  {
    custNum: '100',
    upNum: '2',
    downNum: '13',
    aumLevel: '4',
    dataDate: null,
    managerOper: '001167',
    a30Num: 3303,
    a70Num: 1439,
    a100Num: 406,
    a101Num: 2,
    r30Num: 303,
    r70Num: 404,
    r100Num: 1202,
  },
  {
    custNum: '210',
    upNum: '20',
    downNum: '23',
    aumLevel: '5',
    dataDate: null,
    managerOper: '001167',
    a30Num: 544,
    a70Num: 873,
    a100Num: 232,
    a101Num: 783,
    r30Num: 234,
    r70Num: 890,
    r100Num: 234,
  },
  {
    custNum: '543',
    upNum: '87',
    downNum: '266',
    aumLevel: '1',
    dataDate: null,
    managerOper: '001167',
    a30Num: 994,
    a70Num: 93,
    a100Num: 232,
    a101Num: 345,
    r30Num: 984,
    r70Num: 345,
    r100Num: 875,
  },
  {
    custNum: '210',
    upNum: '20',
    downNum: '23',
    aumLevel: '2',
    dataDate: null,
    managerOper: '001167',
    a30Num: 645,
    a70Num: 743,
    a100Num: 983,
    a101Num: 838,
    r30Num: 231,
    r70Num: 555,
    r100Num: 422,
  },
  {
    custNum: '210',
    upNum: '20',
    downNum: '23',
    aumLevel: '3',
    dataDate: null,
    managerOper: '001167',
    a30Num: 543,
    a70Num: 53,
    a100Num: 690,
    a101Num: 233,
    r30Num: 356,
    r70Num: 124,
    r100Num: 346,
  },
];
// 对后台返回的数据进行封装(jinhansheng)
class HandleData {
  constructor(originData) {
    this.originData = originData;
    this.getAllKeys = Object.keys(originData[0]);
    // 存储最后返回的tableArrData
    this.tableArrData = [];
    // 返回最后需要的barArrData
    this.barArrData = [];
  }
  // 根据属性排序
  sortByProps(arr, prop) {
    return arr.sort((a, b) => {
      return a[prop] - b[prop];
    });
  }
  // 三角形视图处理数据
  handleTableData() {
    for (let i = 0; i < this.originData.length; i++) {
      // 收集table对象的数据
      const tableObj = {};
      const $this = this;
      const useKeySortObj = {
        useKeySort(keyName) {
          for (let j = 0; j < $this.getAllKeys.length; j++) {
            if ($this.getAllKeys[j] === keyName) {
              // 组合符合需求的数据格式(关键)
              tableObj[$this.getAllKeys[j]] =
                $this.originData[i][$this.getAllKeys[j]];
            }
          }
          return this;
        },
      };
      // 链式调用
      useKeySortObj
        .useKeySort('custNum')
        .useKeySort('upNum')
        .useKeySort('downNum')
        .useKeySort('aumLevel');
      this.tableArrData.push(tableObj);
    }
    // Array<Object> 对aumLevel属性进行升序排序
    return this.sortByProps(this.tableArrData, 'aumLevel');
  }
  // 柱状图数据处理
  handleBarData() {
    const $this = this;
    for (let i = 0; i < this.originData.length; i++) {
      // 闭包缓存
      const xAisxObj = {};
      const xAxisArr = [];
      const useKeySortObj = {
        useKeySort(keyName, xAisx) {
          for (let j = 0; j < $this.getAllKeys.length; j++) {
            if ($this.getAllKeys[j] === keyName) {
              // 组合符合需求的数据格式(关键)
              xAxisArr.push([xAisx, $this.originData[i][$this.getAllKeys[j]]]);
            }
          }
          return this;
        },
      };

      useKeySortObj
        .useKeySort('r100Num', -85)
        .useKeySort('r70Num', -50)
        .useKeySort('r30Num', -15)
        .useKeySort('a30Num', 15)
        .useKeySort('a70Num', 50)
        .useKeySort('a100Num', 85)
        .useKeySort('a101Num', 120);
      // 关键点，存储数据
      xAisxObj['barArr'] = xAxisArr;
      xAisxObj['aumLevel'] = $this.originData[i].aumLevel;
      this.barArrData.push(xAisxObj);
    }
    // Array<Object> 对aumLevel属性进行升序排序
    return this.sortByProps(this.barArrData, 'aumLevel');
  }

  // 重组需要的数据
  groupData() {
    return {
      tableData: this.handleTableData(),
      barData: this.handleBarData(),
    };
  }
}

// export default HandleData;
// 使用方法如下, originData为原数据
const getCustomData = new HandleData(originData).groupData();
console.log(getCustomData);
