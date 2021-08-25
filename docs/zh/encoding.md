---
title: JavaScript 字符编码
permalink: /pages/encoding
date: 2021-1-3
categories:
    - frontend
---

# JavaScript 字符编码

在进行词法分析时，字符编码问题是不可避免的。比如对于字符 `'😀'` 或者类似 `'\x68'` 的转义字符，如何正确处理它们是必须要考虑的。因此在词法分析之前，先来讨论一下 JavaScript 的字符编码规则。

## Unicode 字符集

> A conforming implementation of ECMAScript must interpret source text input in conformance with the latest version of the Unicode Standard and ISO/IEC 10646.

根据 [ECMA262](https://262.ecma-international.org/12.0/)，ECMAScript 采用的是 [Unicode](https://unicode.org/versions/latest) 字符集。

为涵盖世界上所有的字符，Unicode 字符共分为 17 个平面，每个平面包含 2^16 (65,536) 个码位 (code point)。其中 0 号平面称为基本平面 (BMP)，包含的码位从 `U+0000` 到 `U+FFFF`；剩余的 16 个平面称为辅助平面 (SMP)，包含的码位从 `U+010000` 到 `U+10FFFF`。

:::tip
目前 Unicode 13.0.0 包含 143,859 个字符。
:::

其中每个 Unicode 字符都有对应的码位，比如 `😀` 的码位为 `U+1F600`，可以在 [Unicode 13.0 Character Code Charts](https://www.unicode.org/charts/) 中找到每个码位对应的 Unicode 字符。

:::tip
[Emoji List](https://www.unicode.org/emoji/charts-13.0/emoji-list.html) 包含了所有的 Unicode 表情 &#x1F632;
:::

## 转义字符

除了直接使用 Unicode 字符外，还可以使用转义字符来表示它们。比如：

```javascript
>> '\x68\x65\x6c\x6c\x6f'
'hello'

>> '\u0068\u0065\u006c\u006c\u006f'
'hello'
```

以 `\x` 开头，后接两位 16 进制数来表示码位从 `U+0000` 到 `U+00FF` 的 Unicode 字符；以 `\u` 开头，后接四位 16 进制数来表示码位从 `U+0000` 到 `U+FFFF` 的 Unicode 字符。转义字符表示的 Unicode 字符就是码位所对应的字符，如 `\x68` 和 `\u0068` 都表示字符 `h`。

但是对于辅助平面的字符也能用上述方法表示吗？

```javascript
>> '\u1F600'
'ὠ0'
```

`U+1F600` 是 `😀` 的码位，但输出却不是预期的结果。这是因为 JavaScript 采用的是 **`UCS-2`** 编码，而非 **`UTF-16`**。

## UCS-2 与 UTF-16 编码

**`UCS-2`** 是一种固定长度的编码格式，用来表示 2 个字节的字符，如果是 4 个字节的字符，会被当成两个 2 字节字符处理。因此 `\u1F600` 被当成两个单独的字符 `\u1F60` 和 `0`。

**`UTF-16`** 在 **`UCS-2`** 之后公布，它是 **`UCS-2`** 的超集，是一种可变长度的编码格式。**`UTF-16`** 既可以表示 2 个字节的字符 `U+0000` 到 `U+FFFF`，也可以表示 4 个字节的字符 `U+010000` 到 `U+10FFFF`。

对于 2 个字节的字符，**`UTF-16`** 编码结果和 **`UCS-2`** 一致；而对于 4 个字节的字符， **`UTF-16`** 采用 **代理对** 来表示。

在基本平面中 `U+D800` 到 `U+DFFF` 没有表示任何字符，它们用于映射辅助平面中的字符。代理对的前 2 个字节的字符总在 `U+D800`到 `U+DBFF` 之间，为高位代理 (H)；后 2 个字节的字符总在 `U+DC00`到 `U+DFFF` 之间，为低位代理 (L)。

可以通过 [The Unicode Standard 3.0](http://unicode.org/versions/Unicode3.0.0/ch03.pdf) 中的转换公式来将辅助平面的码位 `C` 使用代理对 `<H, L>` 表示：

```javascript
H = Math.floor((C - 0x10000) / 0x400) + 0xd800;
L = ((C - 0x10000) % 0x400) + 0xdc00;
```

也可以用另一公式将代理对 `<H, L>` 转换回码位 `C`：

```javascript
C = (H - 0xd800) * 0x400 + L - 0xdc00 + 0x10000;
```

因此，上述示例中 `\u1F600` 使用代理对表示就是 `\ud83d \ude00`：

```javascript
>> '\ud83d\ude00'
'😀'
```

当然，对于 **`UCS-2`** 编码，除了使用代理对，**`ES2015`** 中还引入了一种新的 Unicode 字符表示法，只要将码位放入 `{}` 内，无论是基本平面还是辅助平面，都是正确识别。

```javascript
>> '\u{0068}\u{0065}\u{006c}\u{006c}\u{006f}'
'hello'

>> '\u{1F600}'
'😀'
```

同时，**`ES2015`** 还增加了一些处理 Unicode 字符的方法：

- **`String.fromCodePoint()`**：返回 Unicode 码位对应的字符；

```javascript
>> String.fromCodePoint(0x0068, 0x0065, 0x006c, 0x006c, 0x006f);
'hello'

>> String.fromCodePoint(0x1F600);
'😀'

>> String.fromCodePoint(0xd83d, 0xde00);
'😀'
```

- **`String.prototype.codePointAt()`**：返回给定索引字符对应的 Unicode 码位，它完整地处理整个字符而不是代理对的一部分；

```javascript
>>'😀'.codePointAt(0);
128512 // 0x1F600
```

- **`String.prototype.charAt()`**：返回字符串给定索引的字符，它获取的一个代理项而不是整个字符。

```javascript
>> '😀'.charAt(0);
'\ud83d'

>> '😀'.charAt(1);
'\ude00'
```

对于正则表达式，**`ES2015`** 增加了修饰符 `u`，来正确处理辅助平面的 Unicode 字符。

```javascript
>> /^.$/.test('😀');
false

>> /^.$/u.test('😀');
true

>> /[😀-😙]/.test('😘');
'Uncaught SyntaxError: Invalid regular expression: /[😀-😙]/: Range out of order in character class'

>> /[😀-😙]/u.test('😘');
true
```

## 参考

[Mathias - JavaScript has a Unicode problem](https://mathiasbynens.be/notes/javascript-unicode)

[Mathias - JavaScript’s internal character encoding: UCS-2 or UTF-16?](https://mathiasbynens.be/notes/javascript-encoding)

[阮一峰 - Unicode 与 JavaScript 详解](http://www.ruanyifeng.com/blog/2014/12/unicode.html)