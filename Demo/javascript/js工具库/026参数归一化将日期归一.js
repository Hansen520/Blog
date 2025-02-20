/*
 * @Date: 2025-02-20 09:44:07
 * @Description: 这里说的是一种归一化的思想，其实这个函数还有很多优化的地方，咱暂时不做考虑
 */

// 定义一个格式化函数，接收一个格式化器和一个是否为OAD的布尔值作为参数
function _formatNormalize(formatter) {
  // 如果格式化器是一个函数，则直接返回该函数
  if (typeof formatter === "function") {
    return formatter;
  }
  // 如果格式化器不是一个字符串，则抛出错误
  if (typeof formatter !== "string") {
    throw new Error("formatter must be a string");
  }
  // 如果格式化器是"date"，则将其替换为"yyyy-MM-dd"
  if (formatter === "date") {
    formatter = "yyyy-MM-dd";
  // 如果格式化器是"datetime"，则将其替换为"yyyy-MM-dd hh:mm:ss"
  } else if (formatter === "datetime") {
    formatter = "yyyy-MM-dd hh:mm:ss";
  }

  // 定义一个格式化函数，接收一个日期信息对象作为参数
    // 从日期信息对象中解构出年、月、日、小时、分钟、秒、毫秒
  const formatterFunc = (dateInfo) => {
    // 使用replaceAll方法将格式化字符串中的占位符替换为对应的日期信息
    const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo;
    return formatter
      .replaceAll("yyyy", yyyy)
      .replaceAll("MM", MM)
      .replaceAll("dd", dd)
      .replaceAll("HH", HH)
      .replaceAll("mm", mm)
      .replaceAll("ss", ss)
      .replaceAll("ms", ms);
  };

  return formatterFunc;
}
// 定义一个格式化日期的函数，参数为日期对象、格式化字符串和是否补零的布尔值
function formatDate(date, formatter, isPad = false) {
    // 将格式化字符串标准化
    formatter = _formatNormalize(formatter);
    // 获取日期对象的年、月、日、时、分、秒、毫秒信息
    const dateInfo = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds(),
    }
    // 将年、月、日、时、分、秒、毫秒信息转换为字符串
    dateInfo.yyyy = dateInfo.year.toString();
    dateInfo.MM = dateInfo.month.toString();
    dateInfo.dd = dateInfo.date.toString();
    dateInfo.HH = dateInfo.hour.toString();
    dateInfo.mm = dateInfo.minute.toString();
    dateInfo.ss = dateInfo.second.toString();
    dateInfo.ms = dateInfo.millisecond.toString();
    console.log(dateInfo);
    // 定义一个补零的函数，参数为属性名和长度
    function _pad(prop, len) {
        // 将属性名对应的值转换为字符串，并在前面补零，直到长度为len
        dateInfo[prop] = dateInfo[prop].padStart(len, "0");
    }
    // 如果isPad为true，则调用_pad函数，将年、月、日、时、分、秒、毫秒信息转换为字符串，并在前面补零
    if (isPad) {
        _pad('yyyy', 4);
        _pad('MM', 2);
        _pad('dd', 2);
        _pad('HH', 2);
        _pad('mm', 2);
        _pad('ss', 2);
        _pad('ms', 3);
    }
    // 将格式化字符串和日期信息传入，返回格式化后的日期字符串
    const result = formatter(dateInfo);
    console.log(result);
    return result;

}

// 2025-2-8
formatDate(new Date(), "yyyy-MM-dd");

// 2025-2-8 9:2:12
formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");

// 2025-02-08
formatDate(new Date(), "yyyy-MM-dd", true);

// 2025-02-08 09:02:12
formatDate(new Date(), "yyyy-MM-dd HH:mm:ss", true);

// 2025年2月8日 9:2:12.456
formatDate(new Date(), "yyyy年MM月dd日 HH:mm:ss.ms");

// 2025年2月8日 9:2:12.456
formatDate(new Date(), (dataInfo) => {
  const { year } = dataInfo;
  const thisYear = new Date().getFullYear();
  if (year < thisYear) {
    return `${thisYear - year}年前`;
  } else if (yarn > thisYear) {
    return `${year - thisYear}年后`;
  } else {
    return "今年";
  }
});
