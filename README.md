# COMP90024_assignment_2

## MRC+CouchDB集群使用指南

### 背景知识

目前，我们在MRC（Melbourne Research Cloud）上创建了四台虚拟机。其中，每台虚拟机有两个核以及125GB的磁盘容量。虚拟机的名称分别为node-1、node-2、node-3和node-4。node-1将用作应用服务器（application server），node-2、node-3和node-4将用作数据库服务器（database server）。

### 使用虚拟机

要想登录一台虚拟机，请遵勖以下步骤：

1. 下载包含密码的文件。
2. 切换到包含密码文件的目录下。
3. 输入命令 `chmod 600 <password_file_name>` 以更改该文件的访问权限。
4. 登录MRC->Compute->instances->复制想要访问的节点的IP地址。
5. 在你的命令行输入指令 `ssh -i <password_file_name> ubuntu@<node_ip_address>`

对于每台虚拟机/节点，磁盘被挂载在其 `/var/lib/docker/volumes`目录下。所以，要想保存文件数据，请将其放到该目录下。**请注意，不要随意删除该目录中的其他文件！！！**随意删除文件可能会导致Docker容器数据的丢失（你可以把Docker容器当成在你所在的虚拟机上运行的微型虚拟机）！！！

### 使用CouchDB集群

现在，node-2、node-3和node-4上分别部署了一个CouchDB实例。每个CouchDB实例运行在一个Docker容器中。要想访问CouchDB集群，登录MRC -> 点击Compute标签下的instances链接。在这里，随便从node-2/node-3/node-4中选一个，并复制其IP地址（例如 `172.26.135.121`）。请注意，在CouchDB集群中没有master node的概念。所有节点都是平级的。

在得到了一个节点的IP地址之后，你可以使用任何能够发出HTTP请求的东西访问CouchDB。例如，命令行应用 `curl`、你的浏览器、专门的HTTP客户端如postman、甚至是你程序中的HTTP包都可以向CouchDB发送请求。CouchDB使用HTTP协议通信。下面的代码展示了如何使用Python查看CouchDB中的数据库有哪些：

```python
import requests

r = requests.get('http://admin:password@172.26.135.121:5984/_all_dbs')
print(r.text)
# 得到 ["twitter"]
```

以上只是一个简单的示例。在开发时，请选择你喜欢的HTTP包。最好的方法是使用专门的CouchDB包进行开发。
