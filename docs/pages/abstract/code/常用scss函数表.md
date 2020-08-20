# 常用scss函数表
<br/>

新开一个项目就要去找mixin.scss实在麻烦, 主要根据bailicangdu的开源项目vue-elm中的mixin.scss改编而来, 添加了几个自己在项目中用得比较多的变量, 潦作记录

```scss
$primaryColor: #2c3e50;

@mixin borderRadius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  -o-border-radius: $radius;
  border-radius: $radius;
}

//定位全屏
@mixin allCover {
  position: absolute;
  top: 0;
  right: 0;
}

//定位上下左右居中
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

//定位上下居中
@mixin ct {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

//定位左右居中
@mixin cl {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

//宽高
@mixin wh($width, $height) {
  width: $width;
  height: $height;
}

@mixin lineHeight($height, $line-height) {
  height: $height;
  line-height: $line-height;
}

//字体大小，颜色
@mixin sc($size, $color) {
  font-size: $size;
  color: $color;
}

//flex 布局和 子元素 对其方式
@mixin fj($type: space-between) {
  display: flex;
  justify-content: $type;
}

// 强制一行显示
@mixin ellipse {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

// 强制多行显示
@mixin mlpellipse($num) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $num;
  -webkit-box-orient: vertical;
}

// 清除浮动(变量设置到伪元素上)
@mixin clear {
  content: '';
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
```





<Vssue :title="$title" />
