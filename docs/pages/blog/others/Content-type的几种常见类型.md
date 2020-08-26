# Content-type的几种常见类型

> 转自：[Content-type的几种常见类型](https://www.jianshu.com/p/ba40da728806)

### 一、是什么？

是Http的实体首部字段，用于说明请求或返回的消息主体是用何种方式编码，在request header和response header里都存在。

### 二、几个常用类型：

#### 1、application/x-www-form-urlencoded

1）浏览器的原生form表单

2） 提交的数据按照 key1=val1&key2=val2 的方式进行编码，key和val都进行了URL转码

``` js
POST [http://www.example.com](http://www.example.com) HTTP/1.1 
Content-Type: application/x-[www-form-urlencoded](http://www-form-urlencoded);charset=utf-8 

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3 
```

#### 2、multipart/form-data

常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctype 等于这个值。

``` html
<form action="/" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="some text">
  <input type="file" name="myFile">
  <button type="submit">Submit</button>
</form>
```

请求头看起来像这样

``` js
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

---------------------------974767299852498929531610575
Content-Disposition: form-data; name="description"

some text
---------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

(content of the uploaded file foo.txt)
---------------------------974767299852498929531610575--
```

是不是不太容易看懂，我们来略微分析一下

首先生成了一个 boundary 用于分割不同的字段，为了避免与正文内容重复，boundary 很长很复杂。

然后 Content-Type 里指明了数据是以 multipart/form-data 来编码，本次请求的 boundary 是什么内容。

消息主体里按照字段个数又分为多个结构类似的部分，每部分都是以 --boundary 开始，紧接着是内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。

如果传输的是文件，还要包含文件名和文件类型信息。消息主体最后以 --boundary-- 标示结束。关于 multipart/form-data 的详细定义，请前往 [rfc1867](https://www.ietf.org/rfc/rfc1867.txt) 查看。

#### 3、application/json

消息主体是序列化后的 JSON 字符串,这个类型越来越多地被大家所使用

``` js
POST [http://www.example.com](http://www.example.com) HTTP/1.1 
Content-Type: application/json;charset=utf-8 

{"title":"test","sub":[1,2,3]}
```

这种方案，可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。

#### 4、text/xml

是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范

``` xml
POST [http://www.example.com](http://www.example.com) HTTP/1.1 
Content-Type: text/xml 
<!--?xml version="1.0"?--> 
<methodcall> 
    <methodname>examples.getStateName</methodname> 
    <params> 
        <param> 
            <value><i4>41</i4></value> 
    </params> 
</methodcall> 
```





<Vssue :title="$title" />
