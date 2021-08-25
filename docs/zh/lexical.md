---
title: 词法分析
permalink: /pages/词法分析
date: 2021-1-3
categories:
    - frontend
---

# 词法分析

## 单词类型

在识别单词时，会忽略字符序列中的 **空白符** (white space)、**行终止符** (line terminator) 和 **注释** (comment)。

::: tip
本文中涉及词法标准都来自 [ECMA262](https://262.ecma-international.org/12.0/)，强烈推荐阅读最新文档。
:::

[ECMA262](https://262.ecma-international.org/12.0/) 定义，单词类型可以大致分为：

![token type](@alias/lexical/token-type.png)

> The DivPunctuator, RegularExpressionLiteral, RightBracePunctuator, and TemplateSubstitutionTail productions derive additional tokens that are not included in the CommonToken production.

因此，可以将 ECMAScript 能够识别的单词类型归纳为：

* 数字 (number and bigint)；

* (广义上的) 标识符 (identifier and keyword)；

* 标点符号 (punctuator)；

* 字符串 (string)；

* 模板字符串 (template)；

* 正则表达式 (regexp)。


## 识别数字

> ECMAScript has two built-in numeric types: Number and BigInt.

**`ES2020`** 为支持更大范围的整数值，新增了 `bigint` 基本数据类型。

:::tip
包括 `bigint`，目前 `ES2021` 共有 8 中数据类型：`Undefined`，`Null`，`Boolean`，`String`，`Symbol`， `Number`， `BigInt` 和  `Object`。
:::

其中 `number` 和 `bigint` 又各自分为十进制 (Decimal)、二进制 (Binary)、八进制 (Octal)、十六进制 (Hex) 四类。

首先，来测试两个简单的例子 (示例为 Chrome 控制台输出):

* **非严格模式** 下 

```javascript
>> 012
10

>> 079
79
```

* **严格模式** 下

```javascript
>> "use strict"
>> 012
"Uncaught SyntaxError: Unexpected number" 

>> 079
"Uncaught SyntaxError: Unexpected number"
```

> When processing strict mode code, must not extend the syntax of NumericLiteral to include LegacyOctalIntegerLiteral, nor extend the syntax of DecimalIntegerLiteral to include NonOctalDecimalIntegerLiteral.

因此，对于严格模式和非严格模式需要区分考虑。

:::tip
严格模式是 **`ES2014`** 新增的一种运行模式，可以消除 JavaScript 一些不合理的语法，详细限制见 [ECMA262 附录 C](https://262.ecma-international.org/12.0/#sec-strict-mode-of-ecmascript)
:::

首先来分析严格模式下十进制数字 (DecimalLiteral) 的定义:

![decimal literal](@alias/lexical/decimal-literal.png)

可以看到，十进制数字由整数部分、小数部分 (不作为开头的整数部分) 和指数部分组成，这三部分又有各自的定义：

* 整数部分

![decimal integer literal](@alias/lexical/decimal-integer-literal.png)

整数部分定义为数字 `0`，或数字 `1-9` 开头，后跟上 `DecimalDigits`，数字之间可以插入单个分隔符 `_`。

:::tip
数字分隔符 `_` 是 `ES2021` 新增的语法，因此类似 `1_200e+1_0` 的数字也是合法的。

```javascript
>> 1_200e+1_0
12000000000000
```
:::

* 小数部分

![decimal digits](@alias/lexical/decimal-digits.png)

小数部分 (DecimalDigits) 定义为由数字 `0-9` 组成，数字之间可以插入单个分隔符 `_`。

* 指数部分

![exponent part](@alias/lexical/exponent-part.png)

指数部分定义为由字符 `e/E` 开头，可选的符号位 `+/-`，后跟上 `DecimalDigits`。

因此，十进制数字由字符 `0-9 _ e E + -` 组成。

:::tip
对于类似 `-12e+1` 中的 `-` 应该额外当作一元运算符，而不把它和数字 `12e+1` 放在一起解析为一个单词。 
:::

由于整数部分和指数部分都由 `DecimalDigits` 组成，因此可以先自定义方法 `readDecimalDigits` 识别不作为开头的整数。

```javascript
let pos = 0;

// 识别不作为开头的整数
function readDecimalDigits(input) {
  let total = 0, start = pos, lastCode = 0;
  for (let i = 0, len = input.length; pos < len; ++i, ++pos) {
    let code = input.charCodeAt(pos), val = 0;

    if (code === 95) {  // 分隔符_
      if (i === 0) throw new SyntaxError('Numeric separator is not allowed at the first of digits');
      if (lastCode === 95) throw new SyntaxError('Numeric separator must be exactly one underscore');
      lastCode = code;
      continue;
    }

    if (code >= 48 && code <= 57) val = code - 48;  // 0-9
    else break;
    lastCode = code;
    total = total * 10 + val;
  }
  if (lastCode === 95) throw new SyntaxError('Numeric separator is not allowed at the last of digits');

  return start !== pos ? total : null;
}
```

```javascript
// 识别严格模式下的十进制数字
function readDecimalLiteral(input) {
  input = String(input);
  let start = pos = 0;

  // 整数部分
  let code = input.charCodeAt(pos);
  if (code !== 46 && readDecimalDigits(input) === null) throw new SyntaxError('Invalid number');
  // 数字 0 开头且为非 0 数字
  if (pos - start >= 2 && input.charCodeAt(start) === 48) throw new SyntaxError('Invalid number');

  // 小数部分
  code = input.charCodeAt(pos);
  if (code === 46) {  // .
    ++pos;
    readDecimalDigits(input);
    code = input.charCodeAt(pos);
  }

  // 指数部分
  if (code === 69 || code === 101) {  // e/E
    code = input.charCodeAt(++pos);
    if (code === 43 || code === 45)++pos;  // +/-
    if (readDecimalDigits(input) === null) throw new SyntaxError('Invalid number');
  }

  input = input.slice(start, pos).replace(/_/g, "");
  let val = parseFloat(input);
  return val;
}
```

先来做一些简单的测试：

```javascript
>> readDecimalLiteral('0')
0

>> readDecimalLiteral('.14')
.14

>> readDecimalLiteral('09')
'SyntaxError: Invalid number'

>> readDecimalLiteral('2.e-2')
0.02

>> readDecimalLiteral('1_000.1e1_0')
10001000000000

>> readDecimalLiteral('1000_.1e1_0')
'SyntaxError: Numeric separator is not allowed at the last of digits'
```

至此，就能成功识别出严格模式下的十进制数字 &#x1F609;。

对于非严格模式，十进制数字定义的唯一区别就是能够额外识别 `NonOctalDecimalIntegerLiteral`

![decimal integer literal non](@alias/lexical/decimal-integer-literal-non.png)

`NonOctalDecimalIntegerLiteral` 定义如下：

![decimal integer literal non](@alias/lexical/non-octal-decimal-integer-literal.png)

可以看到，`NonOctalDecimalIntegerLiteral` 其实就是以 `0` 开头，后续数字包含非八进制数 `8-9` 的整数 (如果后续数字全为八进制数 `0-7` ，那它就是非严格模式下的八进制数)。这也对应了前面的示例 `012` 值为 `10`，`079` 值为 `79`。

因此，为了识别非严格模式下的十进制数，只需要加入一个 **上下文** 变量 `strict`，指示当前是否处于严格模式，这里因为没有上下文就直接通过设置 `strict` 值为 `false` 的方法表示非严格模式。修改后的 `readDecimalLiteral` 方法如下：

```javascript {7-8,10-14}
let strict = false;

// 识别非严格模式下的十进制数字
function readDecimalLiteral(input) {
  ... // 重复部分代码使用 ... 表示

  // -
  // if (pos - start >= 2 && input.charCodeAt(start) === 48) throw new SyntaxError('Invalid number');

  // +
  let octal = pos - start >= 2 && input.charCodeAt(start) === 48;
  if (octal && strict) throw new SyntaxError('Invalid number');
  if (octal && /[8-9]/.test(input.slice(start, pos))) octal = false;
  if (octal) throw new SyntaxError('Unexpected octal number');

  ...
}
```

:::tip
其实已经能识别类似 `012` 的非严格模式下的八进制数字，为简化这里直接抛出异常
:::

简单测试：

```javascript
>> readDecimalLiteral('09')
9

>> readDecimalLiteral('012')
'SyntaxError: Unexpected octal number'
```

至此，已经能识别全部的十进制数字 &#x1F609;。

![decimal big integer literal](@alias/lexical/decimal-big-integer-literal.png)

对于 `bigint` 类型的十进制数字，和十进制数字的整数部分 `DecimalIntegerLiteral` 基本一致，只不过在整数后添加后缀 `n`。因此，也只要对 `readDecimalLiteral` 方法略微修改：