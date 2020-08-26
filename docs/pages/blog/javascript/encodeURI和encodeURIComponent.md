# encodeURI和encodeURIComponent

> 首先说一下URI和URL的区别，其中的I指的是Indentifier，L指的是Locater。前者是统一资源标识符，后者则是统一资源定位符。解释得通俗一点URI相当于一个人的身份证号，我可以标识出一个唯一的人，而URL则相当于这个人的详细地址，同样可以标识出一个唯一的人，但是URL是URI的一种实现，它是URI的子集。**URL就是用定位的方式实现的URI**。

进入正题，首先来看一下encodeURI的定义：*encodeURI()  函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。*（MDN）

为什么要编码呢？这是因为url只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。而RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这就造成了各种浏览器的处理方式不大一样，如果开发者需要去兼容各种不同的浏览器的话，那太麻烦了。像IE8就算是特殊字符在网址路径（host）和在查询字符串中的处理方式也不一样（但大部分都根据utf-8或者GB2312编码）。因此我们必须使用JS先对URL编码，然后再向服务器提交，不让浏览器插手编码工作。这就促使了JS有encodeURI()和encodeURIComponent()函数及对应的解码函数。

但这两个函数还稍有不同。

### encodeURI

encodeURI()着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网站中有特殊含义的符号 ; / ? : @ & = + $ , # 等不进行编码。它输出符号的utf-8形式，并且在每个字节前加上%。它的对应解码函数是`decodeURI()`。

![](../images/30.png)

### encodeURIComponent

encodeURIComponent()用于对URL的组成部分进行个别编码，因此在上文中提到不被encodeURI()编码的特殊符号在encodeURIComponent()中通通会被编码。编码方式也是utf-8,并且在每个字节前加上%。它的对应解码函数是`decodeURIComponent()`。

![](../images/31.png)

由上面两张图可以看出对比，encodeURI不对@编码，而encodeURIComponet()则会编码。像中文之类的符号则都会编码，并且格式一样。






<Vssue :title="$title" />

