# Git生成多个公钥

> 需求背景：我有一个 github 账户用来维护个人的博客，公司用的是 gitlab ，两个账号的邮箱不同，无法公用一个公钥文件。因此得创建多个公钥不会导致项目的 git 冲突。

### 创建文件

进入文件夹：`cd ~/.ssh`，生成 ssh key：`ssh-keygen -t rsa -C "your_email@example.com"`。

输入该命令后有连续的三个提示输入，第一个是你要创建的 ssh key 的文件名。我们就是通过第一个命令来创建不同的秘钥文件（如果不指定文件名会自动覆盖）。第二和第三次输入为秘钥口令，一般不填，直接回车。

这里我设置公司的公钥文件名为 id_rsa（默认文件名） ，自己的公钥文件名为 id_rsa_linhe_github 。这样就会根据公司邮箱和个人邮箱生成对应文件。

### 配置

找到 key 所在的地方（我习惯用 everything 直接搜本地磁盘），创建 config 文件（无后缀），添加以下内容：

```
Host github.com
IdentityFile ~/.ssh/id_rsa_linhe_github
User your_email@example.com

# 多个公钥可在后面继续添加其他配置
```

::: warning
注意默认的 id_rsa 不需要配置。
:::

| 字段 | 说明 |
| -- | -- |
| Host | 远程主机地址 |
| IdentityFile | 私钥的文件路径及文件名称 |
| User | 用户 |
| Port | 远程主机上连接的端口号 |
| HostName | 要登录的真实主机名。数字IP地址也是允许的 |


### 复制公钥到服务器

打开 github 或 gitlab 的设置，找到 SSH keys 配置项，然后将公钥文件中的内容复制到这里就 ok 了。

### 其他

一般来说，一台电脑要同时处理不用的 git 服务器，我们会使用不用的用户名。所以除了在初始化 git 时通过以下配置生成全局用户名和邮箱外，可能也需要在私有项目下配置项目下的用户名和邮箱，使用类似下面的命令，只是省略 `--global` 就可以了。

```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```




<Vssue :title="$title" />
