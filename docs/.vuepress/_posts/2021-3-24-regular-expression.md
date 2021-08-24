---
title: JavaScript 正则表达式及其优化
categories: [frontend]
comments: true
---

## 正则表达式声明

- RegExp 构造函数声明：第一个参数为正则内容，第二个参数为修饰符 (可选)

```javascript
var pattern = new RegExp("\\w", "gi");
```

- 字面量声明：斜杠 (/) 之间为正则内容，后面可以跟修饰符

```javascript
var pattern = /\w/gi;
```

## 正则表达式语法

正则表达式中，符号 `^ $ . * + ? = ! : | \ / ( ) [ ] { }` 具有特殊含义

### 字符类

一个字符类可以匹配它所包含的任意单个字符

| 字符   | 含义                                                  |
| :----- | :---------------------------------------------------- |
| [...]  | 匹配方括号内的单个字符                                |
| [^...] | 匹配不在方括号内的单个字符                            |
| .      | 匹配除换行符和其它 Unicode 行终止符之外的任意单个字符 |
| \w     | 匹配单个 ASCII 字符，等价于 [a-zA-Z0-9]               |
| \W     | 匹配单个非 ASCII 字符，等价于 [^a-za-z0-9]            |
| \s     | 匹配单个 Unicode 空白符 (`\n \f \r \t \v`)            |
| \S     | 匹配单个非 Unicode 空白符                             |
| \d     | 匹配单个 ASCII 数字，等价于 [0-9]                     |
| \D     | 匹配 ASCII 数字之外的字符，等价于 [^0-9]              |
| [\b]   | 匹配单个退格符                                        |
| \t     | 匹配单个水平制表符                                    |
| \r     | 匹配单个回车符                                        |
| \n     | 匹配单个换行符                                        |
| \v     | 匹配单个垂直制表符                                    |
| \f     | 匹配单个换页符                                        |
| \0     | 匹配单个空字符 (NUL)                                  |

### 量词

量词表示要匹配的字符或表达式的数量

| 字符   | 含义                                  |
| :----- | :------------------------------------ |
| {n, m} | 匹配前一项至少 n 次，但不超过 m 次    |
| {n, }  | 匹配前一项至少 n 次                   |
| {n}    | 匹配前一项 n 次                       |
| ？     | 匹配前一项 0 次或 1 次，等价于 {0, 1} |
| +      | 匹配前一项 1 次或多次，等价于 {1, }   |
| \*     | 匹配前一项 0 次或多次，等价于 {0, }   |

上述使用量词进行匹配都是 **贪婪匹配**，即匹配尽可能多的字符串。可以在量词后面加一个 **？** 进行 **非贪婪匹配**，即一旦找到匹配就会停止。例如：对于给定字符串 `aaa`，`/a+/` 将会匹配它的三个字符，而 `/a+?/` 只会匹配第一个字符 a

### 断言

断言表示匹配在某些条件下发生

| 字符   | 含义                                                             |
| :----- | :--------------------------------------------------------------- |
| ^      | 匹配输入的开头，在多行搜索时，匹配每一行的开头                   |
| \$     | 匹配输入的结尾，在多行搜索时，匹配每一行的结尾                   |
| \b     | 匹配一个单词的边界，单词是连续的数字、字母或下划线组成的字符串   |
| \B     | 匹配非单词边界                                                   |
| (?=p)  | 向前断言：接下来的字符都与 p 匹配，但结果不包含匹配 p 的那些字符 |
| (?!p)  | 向前否定断言：接下来的字符不与 p 匹配                            |
| (?<=p) | 向后断言：之前的字符都与 p 匹配，但结果不包含匹配 p 的那些字符   |
| (?<!p) | 向后否定断言：之前的字符不与 p 匹配                              |

### 分组

| 字符    | 含义                                                                                                                                                                          |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \|      | 选择，匹配该符号左边的子表示或右边的子表达式。匹配次序是从左到右，如果左边的选择项匹配，就忽略右边的选择项。例如：对于字符串 ab，正则表达式 `/a|ab/` 只能匹配它的第一个字符 a |
| (...)   | 捕获组，将多个项合为一组进行匹配，并记住这个匹配项供后面引用使用                                                                                                              |
| (?:...) | 非捕获组，将多个项合为一组进行匹配，但不记住这个匹配项                                                                                                                        |
| \n      | n 是一个正整数，对第 n 个分组的匹配结果进行引用，组索引是从左到右的左括号数                                                                                                   |

### 修饰符

可以通过修饰符进行高级搜索，共 6 个修饰符。修饰符既可以单独使用，也可以按任意顺序一起使用

| 修饰符 | 含义                                         |
| :----- | :------------------------------------------- |
| g      | 表示全局匹配，匹配到一个后继续匹配，直到结束 |
| i      | 表示不区分大小写匹配                         |
| m      | 表示多行匹配                                 |
| s      | 表示允许 . 匹配换行符                        |
| u      | 表示使用 Unicode 码的模式进行匹配            |
| y      | 表示粘性搜索，匹配从目标字符串的当前位置开始 |

## 正则表达式使用

执行正则表达式可以使用 RegExp 对象或 String 对象的方法

- String 对象：match、replace、search 和 split 方法

- RegExp 对象：exec 和 test 方法

| 方法    | 作用                                                                                                                                                                                                                               |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| match   | 返回一个由匹配结果组成的数组，未匹配时返回 null。全局匹配时返回数组包含所有匹配结果，非全局匹配时只检索第一个匹配结果，数组余下元素为与正则表达式圆括号内子表达式相匹配的子串                                                      |
| replace | 使用替换字符串替换掉匹配到的子字符串。全局匹配时会将源字符串中所有匹配到的子串都替换为第二个参数指定的字符串，非全局匹配只替换匹配到的第一个子串。同时如果替换字符串中出现 \$ 加数字，将用与指定子表达式相匹配的文本替换这两个字符 |
| search  | 返回第一个匹配子串的起始索引，未找到就返回 -1                                                                                                                                                                                      |
| split   | 使用正则表达式或字符串将源字符串拆分为子串组成的数组                                                                                                                                                                               |
| exec    | 与 match 方法在非全局匹配时返回结果一致                                                                                                                                                                                            |
| test    | 判断字符串是否匹配，返回 true 或 false                                                                                                                                                                                             |

示例：

```javascript
// match()

// replace()
var quote = /"([^"]*)"/g;
text.replace(quote, "“$1”");

// exec()
```

## 正则表达式优化

## 参考

- [正则表达式 - JavaScript \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

- David Flanagan. JavaScript 权威指南 (第 6 版)

- Nicholas C. Zakas. 高性能 JavaScript