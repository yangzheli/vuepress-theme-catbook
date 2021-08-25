---
title: 介绍
permalink: /pages/介绍
date: 2021-1-3
categories:
    - frontend
---

# 介绍

## JavaScript 解析器是什么

广义上讲，解析器 (parser) 是把特定格式的文本转换成某种数据结构的程序。常见地，解析器将输入的字符序列转换成自定义结构的抽象语法树 (Abstract Syntax Tree，AST)。对于不同的输入格式，可以编写不同的解析器，如：

但是对于相同的输入格式，如果每个解析器都用自定义的数据结构，显然会造成很大的麻烦，不同的工具库调用将变得复杂 —— 需要统一的 AST 规范。对于 JavaScript 而言，[Estree](https://github.com/estree/estree) 规定了统一的 AST 语法结构，如 `if` 语句的 AST 节点类型定义如下：

```javascript
interface IfStatement <: Statement {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
}
```

因此，如果你想实现一个 JavaScript 解析器，可以先阅读一下 [Estree](https://github.com/estree/estree) 的文档。

那么，解析器在 JavaScript 中有哪些应用？ 实际上，很多常用的工具库 —— `Babel`、`Webpack`、`Eslint` 等都用到了 JavaScript 解析器。 

目前比较知名的 JavaScript 解析器有 [Esprima](https://github.com/jquery/esprima)、[Acorn](https://github.com/acornjs/acorn)、[Babylon](https://github.com/babel/babylon) 等。本文实现的 [a simplified parser](https://github.com/yangzheli/a-simplified-parser) 也主要参考 `Esprima` 和 `Acorn`，感兴趣的推荐阅读相关源码。

了解了这些，再来聊一聊什么是抽象语法树。

## 什么是抽象语法树

在 《编译原理》 中，编译器为了将高级语言转译为二进制代码，需要以下几步。

AST 就是词法分析和语法分析后得到的树形结构的数据。词法分析扫描输入的字符序列，忽略其中的注释、空格、换行符等，将输入识别为一个个的单词 (token)，这些单词可能是字符串、标识符、关键字等；语法分析根据识别出的单词解析其中的语句或表达式，一个个节点就组成了一棵语法树。

下图就是词法分析、语法分析的一个简单例子：

## 工具

下面推荐两个常用的 AST 解析网站：

* [Esprima Online Parsing](https://esprima.org/demo/parse.html)

* [AST Explorer](https://astexplorer.net/)