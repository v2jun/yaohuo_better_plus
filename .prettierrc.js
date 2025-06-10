module.exports = {
  printWidth: 180, // 单行最大长度 default:80
  semi: true, // 语句行末是否添加分号
  tabWidth: 2, // 指定每个缩进级别的空格数
  useTabs: false, // 使用制表符而不是空格缩进行
  quoteProps: "consistent", // 给对象属性名添加引号。consistent - 如果对象里有一个属性加了引号，那么所有属性都要加引号
  proseWrap: "never", // 禁用强制换行
  arrowParens: "always", // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  trailingComma: "none", // 在对象或数组最后一个元素后面不加逗号
  singleQuote: false, // 使用单引号而不是双引号
  bracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  endOfLine: "lf" // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
};
