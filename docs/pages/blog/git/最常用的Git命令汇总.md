# 最常用的Git命令汇总

![](../images/5.png)

名词解释: 
- **Workspace(工作区)**
- **Index/Stage(暂存区)**
- **Repository(仓库区)**
- **Remote(远程仓库)**

### 1. 增加/删除文件

``` shell {7,8,10,11,12}
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 修改文件名
# 此命令可用于需要修改文件大小写时有效，git默认忽略识别大小写，通过执行以下命令可使文件变为 renamed 状态，此时提交可修改文件名
$ git mv [oldfilename] [newfilename]

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
```

### 2. 代码提交

``` shell {1,2,10,11,12}
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

### 3. 列出分支、新建分支、删除分支

``` shell {7,8,13,14,15,20,21,22,30,31,33,34,36,37}
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
# git2.23 以后也可以使用`git switch -c [branch]`
$ git checkout -b [branch] [origin/branch]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
# git2.23以后也可以使用`git switch [branch-name]`
$ git checkout [branch-name]

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 删除分支，使用 -D 强制删除
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]

# 修改本地分支名称
$ git branch -m [old-branch-name] [new-branch-name]

# 查看当前分支的合并情况
$ git log --graph --pretty=oneline --abbrev-commit
```

### 4. 撤销

**前置知识：**

*HEAD 表示当前活跃分支的游标。你当前在哪儿，HEAD就指向哪儿。HEAD^的意思是上一个版本，也可以写成HEAD~1，如果要指向前两个版本就是HEAD~2。*

`git reset` 和 `git revert` 的区别：首先它们都能使工作区回到上一次提交之前的某种状态，但 `git reset` 是直接在历史记录中删除上一次的 commitID，而`git revert` 则是在历史记录中追加一个新的 commitID 来回到过去的状态。

reset 的 3 个参数：

**1. --mixed**

不删除工作空间改动代码，撤销commit，并且撤销`git add .` 操作。这个为默认参数,`git reset --mixed HEAD^` 和 `git reset HEAD^` 效果是一样的。

**2. --soft**

不删除工作空间改动代码，撤销commit，不撤销`git add .` 操作

**3. --hard**

删除工作空间改动代码，撤销commit，撤销`git add .`操作。注意完成这个操作后，就恢复到了上一次的commit状态。

``` shell {1,2,4,5,7,8,10,11}
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与指定commit保持一致
$ git reset --hard [commitID]

# 撤销上一次commit到暂存区，工作区保持不变
$ git reset --soft HEAD^

# 查看最近的提交记录（可查看commitId）
$ git reflog

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop

# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .
```

### 5. 远程同步

``` shell {1,2,4,5,10,11,13,14,16,17}
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库和仓库地址
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 推送所有分支到远程仓库
$ git push [remote] --all
```

### 6. 查看信息

``` shell {1,2,26,27}
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示某次提交的元数据和内容变化
$ git show [commit]
```

### 7. 标签

``` git
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```




<Vssue :title="$title" />
