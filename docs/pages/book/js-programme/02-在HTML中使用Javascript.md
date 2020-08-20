# 在HTML中使用Javascript

## 2.1 <script> 元素

向 HTML 页面中插入 JavaScript 的主要方法，就是使用 `<script>` 元素。HTML 4.01 为 `script` 定义了下面 6 个属性：

- async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。
- charset：可选。表示通过 src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
- language：已废弃。大多数浏览器会忽略它的值。
- src：可选。表示包含要执行代码的外部文件。
- type：可选。可以看成是 language 的替代属性。表示编写代码使用的脚本语言的内容类型（也成为 MIME 类型）。

使用 `<script>` 元素的方式有两种：直接在页面中嵌入 JavaScript 代码和包含外部 JavaScript 文件。

在使用 `<script>` 元素嵌入 JavaScript 代码时，只需为 `<script>` 指定 type 属性。

如果要通过 `<script>` 元素来包含外部 JavaScript 文件，那么 src 属性就是必须的。通过 `<script>` 元素的 src 属性还可以包含来自外部域的 JavaScript 文件。无论如何包含代码，只要不存在 defer 和 async 属性，浏览器都会按照 `<script>` 元素在页面中出现的先后顺序对它们依次进行解析。

## 2.2 




更新中。。。




<Vssue :title="$title" />
