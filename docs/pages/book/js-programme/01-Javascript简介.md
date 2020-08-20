# JavaScript简介

> JavaScript 诞生于 1995 年。当时，它的主要目的是处理以前由服务器端语言（如 Perl）负责的一些输入验证操作。在 JavaScript 问世之前，必须把表单数据发送到服务器端才能确定用户是否没有填写某个必填域，是否输入了无效的值。今天 JavaScript 已经成为了一门功能全面的编程语言，能够处理复杂的计算和交互，拥有了闭包、匿名（lambda，拉姆达）函数，甚至元编程等特性。

## 1.2 JavaScript 实现

虽然 JavaScript 和 ECMAScript 通常都被人们用来表达相同的含义，但 JavaScript 的含义却比 ECMA-262 中规定的要多得多。没错，一个完整的 JavaScript 实现应该由下列三个不同的部分组成。

- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象模型（BOM）

### 1.2.1 ECMAScript

由 ECMA-262 定义的 ECMAScript 与 Web 浏览器没有依赖关系。ECMA-262 定义的知识这门语言的基础，而在此基础之上可以构建更完善的脚本语言。我们常见的 Web 浏览器只是 ECMAScript 实现可能的**宿主环境**之一。

既然 ECMA-262 标准没有参照 Web 浏览器。那它都规定了些什么内容呢？大致说来，它规定了这门语言的下列组成部分：

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 对象

ECMAScript 就是对实现该标准规定的各个放慢内容的语言的描述。

### 1.2.2 文档对象模型（DOM）

文档对象模型（DOM，Document Object Model）是针对 XML 但经过扩展用于 HTML 的应用程序编程接口（API，Application Programming Interface）。 DOM 把整个页面映射为一个多层节点结构。HTML 或 XML 页面中的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。借助 DOM 提供的 API，开发人员可以轻松自如的删除、添加、替换或者修改任何节点。

DOM1级由两个模块组成：DOM 核心（DOM Core）和 DOM HTML。DOM2级在原来 DOM 的基础上又扩充了（DHTML 一直都支持）鼠标和用户界面事件、范围、遍历（迭代 DOM 文档的方法）等细分模块，而且通过对象接口增加了对 CSS （Cascading Style Sheets，层叠样式表）的支持。DOM2级引入了下列新模块，也给出了众多新类型和新接口的定义。

- DOM 视图（DOM Views）：定义了跟踪不同文档（例如，应用 CSS 之前和之后的文档）视图的接口；
- DOM 事件（DOM Events）：定义了事件和事件处理的接口；
- DOM 样式（DOM Style）：定义了基于 CSS 为元素应用样式的接口；
- DOM 遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口。

> 所谓 DOM0 级只是 DOM 历史坐标中的一个参照点而已。具体说来，DOM0 级指的是Internet Explorer 4.0 和 Netscape Navigator 4.0 最初支持的 DHTML。

### 1.2.3 浏览器对象模型（BOM）

开发人员使用 BOM 可以控制浏览器显示的页面以外的部分。从根本上讲，BOM 只处理浏览器窗口和框架，但人们习惯上也把所有针对浏览器的 JavaScript 扩展算作 BOM 的一部分。下面就是一些这样的扩展：

- 弹出新浏览器窗口的功能；
- 移动、缩放和关闭浏览器窗口的功能；
- 提供浏览器详细信息的 navigator 对象；
- 提供浏览器所加载页面的详细信息的 location 对象；
- 提供用户显示器分辨率详细信息的 screen 对象；
- 对 cookies 的支持；
- 像 XMLHTtpRequest 这样的自定义对象。


<Vssue :title="$title" />
