---
title: CSS 指南
categories: [frontend]
comments: true
---

## 简介

CSS (层叠样式表)

CSS 基本语法：

![css-rule](../assets/img/css-guide/rule.png)

## 选择器

### 通配选择器

### 元素、类、ID 选择器

元素选择器：选择器为某个 HTML 元素，如 div、h1、p 等

```
h1 {color: blue;}
```

类选择器：前面有一个 . 号，引用元素的 class 属性值

```
.menu {font-weight: bold;}
```

ID 选择器：前面有一个 # 号，引用元素的 id 属性值

```
#toc {color: red;}
```

### 属性选择器

简单属性选择器：选择有某个属性的 HTML 元素

```
h1[class] {background: yellow;}
```

根据具体属性值选择器：选择有特定属性值的 HTML 元素

```
a[href="http://www.baidu.com"] {font-weight: bold;}
```

根据部分属性值选择器：如果属性能接受多个词，可以根据其中的任意一个词进行选择

```
div[class~="warning"] {color: red;} /* 选择 class 属性值中包含 warning 的 div 元素 */
```

子串匹配属性选择器：使用规则对属性值进行匹配

```
div[class^="bar"] {background: gray;} /* 选择 class 属性值以 "bar" 开头的 div 元素 */

div[class$="bar"] {background: gray;} /* 选择 class 属性值以 "bar" 结尾的 div 元素 */

div[class*="bar"] {background: gray;} /* 选择 class 属性值包含 "bar" 的 div 元素 */
```

特定属性选择器：使用特定规则对属性值进行匹配

```
div[lang|="en"] {font-size: 2em;} /* 选择 lang 属性值等于 "en" 或以 "en-" 开头的 div 元素 */
```

### 后代、子代、相邻兄弟、通用兄弟选择器

后代选择器：使用 **空格** 组合两个选择器，如果第二个选择器匹配的元素有与第一个选择器匹配的祖先元素，则它们会被选择

```
div span {margin: 2em;}
```

子代选择器：使用 **>** 组合两个选择器，第二个元素为第一个元素的直接后代 (子元素)

```
div > span {line-height: 20px;}
```

相邻兄弟选择器：使用 **+** 组合两个选择器，第二个元素紧跟在第一个元素之后，且它们有相同的父元素

```
h1 + div {text-align: center;}
```

通用兄弟选择器：使用 **~** 组合两个选择器，第二个元素在第一个元素之后，但无须紧邻，且它们有相同的父元素

```
p ~ span {font-weight: normal;}
```

### 伪类、伪元素

伪类与伪元素是加在选择器后的关键字

常见静态伪类：`:link :visited :first-child :nth-child`

常见动态伪类：`:focus :hover :active`

| 常见伪类         | 作用                                                             |
| :--------------- | :--------------------------------------------------------------- |
| :link            | 选中尚未访问的超链接                                             |
| :visited         | 选中已访问过的超链接                                             |
| :first-child     | 选择元素父元素的第一个子元素 (兄弟元素中的第一个元素)            |
| :nth-child(an+b) | 选择元素兄弟元素中表达式 an+b 匹配到的所有元素 (n = 0, 1, 2 ...) |
| :focus           | 选中可以获得输入焦点的元素                                       |
| :hover           | 指示鼠标悬浮在哪个元素                                           |
| :active          | 指示被用户输入激活的元素                                         |

可以在同一选择器结合使用多个伪类，建议使用 **LVHA** 的先后顺序以正确渲染元素样式，即 `:link :visited :hover :active`，`:focus` 常在 `:hover` 左右

常见伪元素：`::after ::before ::first-letter ::first-line`，`::after ::before` 通常使用 content 属性为元素添加修饰内容

| 常见伪元素     | 作用                                         |
| :------------- | :------------------------------------------- |
| ::after        | 创建一个伪元素，作为选中元素的最后一个子元素 |
| ::before       | 创建一个伪元素，作为选中元素的第一个子元素   |
| ::first-letter | 选中块级元素的首字母                         |
| ::first-line   | 选中块级元素的第一个文本行                   |

```
a::after {content: "|";}

p::first-line {font-size: 150%;}
```

## 继承与层叠

当同一个元素有多个规则时，就需要考虑哪些声明会被应用到该元素，这就涉及到 CSS 的三种机制：特殊性/优先级、继承与层叠

### 特殊性

使用 **!important** 表示重要声明，当重要声明与非重要声明冲突，胜出的总是重要声明

非重要声明需要计算选择器的特殊性值，特殊性值可以表述为 4 个部分，即 x，x，x，x (值从左向右排序，前一个值更大则优先级更高)：

- 每个内联样式声明的特殊性是 1，0，0，0

- 每个 ID 属性选择器的特殊性是 0，1，0，0

- 每个类、属性选择器与伪类的特殊性是 0，0，1，0

- 每个元素选择器与伪元素的特殊性是 0，0，0，1

- 结合符与通配选择器的特殊性是 0，0，0，0 (0 特殊性)

特殊性值计算示例：

```
html > #toc ul > li {color: green;} /* 0, 1, 0, 3 */

*[id="toc"] {color: red;}   /* 0, 0, 1, 0 */
```

### 继承

继承即样式不仅会应用到该元素，还会应用到它的后代元素 (声明会沿着文档树乡下传播给后代元素，但不会向上传播)

一般地，大多数盒模型属性 (内边距、边框、外边距、背景) 都不能继承

继承的值没有特殊性，甚至连 0 特殊性都没有，0 特殊性比无特殊性优先级要高

### 层叠

如果多个规则相冲突，就让样式层叠在一起，层叠规则如下：

- 首先按显示权重对声明排序，重要声明权重高于非重要声明

- 当权重相同，则按特殊性排序

- 当特殊性也相同，则按出现顺序排序，一个声明越后出现，它的优先级越高

## 单位、字体与文本属性

### 长度单位

长度单位可分为绝对长度单位与相对长度单位

- 绝对长度单位：通常被认为总是相同的大小，包括 `cm mm Q in pc pt px`。除了 px (像素)，其它绝对长度单位很少使用

- 相对长度单位：相对于其它一些元素的大小，如父元素的字体大小。相对长度单位有 `em rem ex ch lh vw vh vmin vmax`

> 《CSS 权威指南》 中认为 px 是相对长度单位，而 **MDN** 认为 px 是绝对长度单位，主要原因是在设备分辨率固定情况下，1 px 的大小是确定的

| 常见相对长度单位 | 含义                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------- |
| em               | 在 font-size 中是相对于父元素的字体大小，在其它属性如 width 中是相对于自身的字体大小 |
| rem              | 相对于根元素的字体大小，对于需要适配各种移动设备，rem 必不可少                       |
| ex               | 字符 x 的高度                                                                        |

### 字体

### 文本属性

| 常见文本属性    | 作用 (未特殊说明，则该属性能应用于所有元素) |
| :-------------- | :------------------------------------------ |
| text-indent     | 为块级元素的第一行缩进给定长度              |
| text-align      | 影响块级元素中文本的水平对齐方式            |
| line-height     | 设置文本行高                                |
| vertical-align  | 影响行内元素中内容的垂直对齐方式            |
| word-spacing    | 设置字之间的间隔                            |
| letter-spacing  | 设置字母之间的间隔                          |
| text-transform  | 处理文本的大小写                            |
| text-decoration | 设置/取消文本装饰，如取消链接上的默认下划线 |
| text-shadow     | 为文本增加阴影                              |
| white-space     | 设置如何处理元素内部的空白符和换行符        |
| direction       | 设置文本、表中列布局的方向                  |

## 盒模型

### 包含块

### 使用 auto

对于水平格式化的 7 个属性 `margin-left border-left padding-lefting width padding-right border-right margin-right`，只有 width 及左、右外边距可以设置为 auto，其余属性必须为特定的值。设置属性值为 auto 时可能出现以下几种情况：

- width、margin-left 或 margin-right 都设为非 auto 的特定值，则总会把 margin-right 强制设为 auto；

- 上述三个属性中某个值设为 auto，剩下两个属性为特定值，那么设为 auto 的属性为确定值 = 父元素的 width - 其余 6 个属性值之和；

- 上述三个属性中有两个值设为 auto，剩下一个为特定值。如果是两个外边距为 auto，那么它们会被设为相等的长度，因此可以通过这种方式将元素在父元素中居中；如果是 width 和某个外边距为 auto，那么设为 auto 的外边距会减为 0，width 为计算得到的确定值；

- 上述三个属性都设为 auto，那么外边距会被设为 0，width 为计算得到的确定值。

完整的示例请 <a href="https://codepen.io/yangzheli/pen/GRrYLKE" target="_blank">移步这里 &#x1F448;</a>

### 块级元素与行内元素

块级 (block-level) 元素：默认情况下，在元素框之前和之后生成了分隔符；块级元素能够包含行内元素和其它块级元素。常见块级元素有 `div h1-h6 p ul ol dl header footer form table canvas audio video`

行内/内联 (inline-level) 元素：默认情况下，不会在元素框之前和之后生成分隔符；行内元素只能包含数据和其它行内元素。常见行内元素有 `span a i img button input label select textarea br em strong`

(待更新：块级元素与行内元素的宽、高度设置)

根据 HTML 层次结构要求：行内元素可以继承块级元素，而反之不行。但 CSS 没有这种限制，可以通过修改元素 display 属性值将块级元素与行内元素相互转换。常见 display 属性值有：

| 常见 display 属性值 | 作用                           |
| :------------------ | :----------------------------- |
| none                | 此元素不会被显示               |
| block               | 此元素将显示为块级元素         |
| inline              | 默认值。此元素将显示为行内元素 |
| inline-block        | 行内块元素                     |
| list-item           | 此元素将作为列表显示           |
| table               | 此元素将作为块级表格显示       |
| inline-table        | 此元素将作为行内表格显示       |
| table-cell          | 此元素将作为表格单元格显示     |
| inherit             | 从父元素继承 display 的属性值  |

## 浮动与定位

### 浮动

float 属性让元素可以浮动。浮动元素会脱离正常的文档布局流

| float 属性值 | 作用                                               |
| :----------- | :------------------------------------------------- |
| left         | 元素向左浮动                                       |
| right        | 元素向右浮动                                       |
| none         | 默认值，元素不浮动，元素将出现在文档流中的正常位置 |
| inherit      | 从父元素继承 float 属性的值                        |

### 定位

position 属性用于指定一个元素的定位方式

| position 属性值 | 作用                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------ |
| static          | 默认值，元素将出现在文档流中的正常位置                                                                  |
| relative        | 生成相对定位元素，相对于其正常位置进行定位。元素仍保持未定位前的形状，原本所占的空间仍然保留            |
| absolute        | 生成绝对定位元素，相对于[包含块](#包含块)进定位。元素原先在文档流所在的空间会关闭，定位后生成一个块级框 |
| fixed           | 生成绝对定位元素，相对于浏览器窗口进行定位                                                              |
| inherit         | 从父元素继承 position 属性的值                                                                          |

## 页面布局

## 媒体类型

**`@media`** 可以将样式表限制为仅用于某种特定媒体和规则，**`@media`** 的使用语法如下：

```css
@media media-type and (media-rule) {
  /* CSS rules */
}
```

| 常用媒体类型 | 作用                     |
| :----------- | :----------------------- |
| all          | 用于所有的媒体设备       |
| print        | 用于打印机               |
| screen       | 用于电脑显示器           |
| speech       | 用于屏幕阅读器等发声设备 |

常用媒体规则有宽、高、朝向、是否悬浮等，因此常常通过设置 `min-width max-width` 的值，使页面在 PC 端、移动端等多种设备上都能自适应显示。示例：

```css
/* 当屏幕宽度小于等于 900 像素时将背景颜色改变 */
@media screen and (max-width: 900px) {
  body {
    background: #000000;
  }
}
```

同时还可以使用逻辑与 (and)、逻辑或 (,)、逻辑非 (not) 将多种媒体规则混合使用，示例：

```css
/* 当屏幕宽度至少为 400 像素，且设备纵放时将背景颜色改变 */
@media screen and (min-width: 400px) and (orientation: portrait) {
  body {
    background: #000000;
  }
}
```

## CSS 过渡与动画

### CSS 过渡

**`transition`** 属性用于指定状态改变需要的时间，它实际上是一个简写属性，可以单独定义下列四个属性的值：

- `transition-property`：规定设置过渡属性的 CSS 属性名；

| transition-property 取值 | 作用                                              |
| :----------------------- | :------------------------------------------------ |
| none                     | 没有属性会获得过渡效果                            |
| all                      | 所有属性都会获得过渡效果                          |
| property                 | 指定应用过渡效果的 CSS 属性名列表，列表用逗号分隔 |

- `transition-duration`：完成过渡效果需要的时间 (默认值为 0)；

- `transition-timing-function`：规定过渡效果的速度曲线；

| transition-timing-function 取值 | 作用                                                                              |
| :------------------------------ | :-------------------------------------------------------------------------------- |
| linear                          | 以相同速度开始至结束的过渡效果，等价于 cubic-bezier(0, 0, 1, 1)                   |
| ease                            | 慢速开始，然后变快，慢速结束的过渡效果，等价于 cubic-bezier(0.25, 0.1, 0.25, 0.1) |
| ease-in                         | 慢速开始的过渡效果，等价于 cubic-bezier(0.42, 0, 1, 1)                            |
| ease-out                        | 慢速结束的过渡效果，等价于 cubic-bezier(0, 0, 0.58, 1)                            |
| ease-in-out                     | 慢速开始和结束的过渡效果，等价于 cubic-bezier(0.42, 0, 0.58, 1)                   |
| cubic-bezier(x1, y1, x2, y2)    | 自定义 cubic-bezier 函数取值                                                      |

更多关于贝塞尔曲线 (Bezier curve) 的内容，请前往文章 [《贝塞尔曲线介绍》](/2021-04/bezier-curve)。

- `transition-delay`：规定开始过渡效果前等待多久 (默认值为 0)。

### CSS 动画

## CSS 如何工作

## CSS 性能优化

## 参考

- CSS 权威指南 (第三版)

- [CSS (层叠样式表) \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

- [W3School CSS 教程](https://www.w3school.com.cn/css/index.asp)

- [CSS 动画简介 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
