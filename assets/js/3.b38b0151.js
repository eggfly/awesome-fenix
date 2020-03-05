(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{205:function(e,t,r){e.exports=r.p+"assets/img/rancher-add-cluster.12ba3552.png"},206:function(e,t,r){e.exports=r.p+"assets/img/rancher-import-cluster.1610ea8c.png"},207:function(e,t,r){e.exports=r.p+"assets/img/rancher-import-command.b72215c1.png"},208:function(e,t,r){e.exports=r.p+"assets/img/rancher-import-pendding.b1e63bb5.png"},233:function(e,t,r){"use strict";r.r(t);var n=r(28),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"使用rancher部署"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用rancher部署"}},[e._v("#")]),e._v(" ✅使用Rancher部署")]),e._v(" "),n("p",[e._v("Rancher是在Kubernetes更上层的管理框架，Rancher是图形化的，有着比较傻瓜式的操作，只有少量一两处地方（如导入集群）需要用到Kubernetes命令行。也由于它提供了一系列容器模版、应用商店等的高层功能，使得要在Kubernetes上部署一个新应用，简化到甚至只需要点几下鼠标即可，因此用户们都爱使用它。")]),e._v(" "),n("p",[e._v("Rancher还推出了RancherOS（极致精简专为容器定制的Linux，尤其适合边缘计算环境）、K3S（Kubernetes as a Service，5 Less Than K8S，一个大约只有40MB，可以运行在x86和ARM架构上的极小型Kubernetes发行版）这样的定制产品，用以在用户心中暗示、强化比K8S更小、更简单、更易用的主观印象。")]),e._v(" "),n("p",[e._v("不过也由于Rancher入门容易，基础性的应用需求解决起来很方便，也导致了不少人一开始使用它之后，就陷入了先入为主的印象，后期再接触Kubernetes时，便觉得学习曲线特别陡峭，反而限制了某些用户对底层问题的进一步深入。")]),e._v(" "),n("p",[e._v("在本文中，笔者以截图为主，展示如何使用Rancher来导入或者创建Kubernetes集群的过程。")]),e._v(" "),n("h2",{attrs:{id:"安装rancher"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装rancher"}},[e._v("#")]),e._v(" 安装Rancher")]),e._v(" "),n("p",[e._v("前置条件：已经"),n("RouterLink",{attrs:{to:"/deployment/deployment-env-setup/setup-docker.html"}},[e._v("安装好Docker")]),e._v("。")],1),e._v(" "),n("p",[e._v("使用Docker执行Rancher镜像，执行以下命令即可：")]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[e._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" docker run -d --restart"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("unless-stopped -p "),n("span",{pre:!0,attrs:{class:"token number"}},[e._v("8080")]),e._v(":80 -p "),n("span",{pre:!0,attrs:{class:"token number"}},[e._v("8443")]),e._v(":443 rancher/rancher\n")])])]),n("h2",{attrs:{id:"使用rancher管理现有kubernetes集群"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用rancher管理现有kubernetes集群"}},[e._v("#")]),e._v(" 使用Rancher管理现有Kubernetes集群")]),e._v(" "),n("p",[e._v("前置条件：已经"),n("RouterLink",{attrs:{to:"/deployment/deployment-env-setup/setup-kubernetes/setup-kubeadm.html"}},[e._v("安装好了Kubernetes集群")]),e._v("。")],1),e._v(" "),n("p",[e._v("使用Rancher的导入功能将已部署的Kubernetes集群纳入其管理。登陆Rancher主界面（首次登陆会要求设置admin密码和Rancher在集群中可访问的路径，后者尤其不能乱设，否则Kubernetes无法访问到Rancher会一直处于Pending等待状态）之后，点击右上角的Add Cluster，然后有下面几个添加集群的选择：")]),e._v(" "),n("p",[n("img",{attrs:{src:r(205),alt:""}})]),e._v(" "),n("ul",[n("li",[e._v("要从某台机器中新安装Kubernetes集群选择“From existing nodes (Custom)”")]),e._v(" "),n("li",[e._v("要导入某个已经安装好的Kubernetes集群选择“Import an existing cluster”")]),e._v(" "),n("li",[e._v("要从各种云服务商的RKE（Rancher Kubernetes Engine）环境中创建，就选择下面那排厂商的按钮，没有的话（譬如国内的阿里云之类的），请先到Tools->Driver中安装对应云服务厂商的驱动。")])]),e._v(" "),n("p",[e._v("这里选择“Import an existing cluster”，然后给集群起个名字以便区分（由于Rancher支持多集群管理，所以集群得有个名字以示区别），之后就看见这个界面：")]),e._v(" "),n("p",[n("img",{attrs:{src:r(206),alt:""}})]),e._v(" "),n("p",[e._v("Rancher自动生成了加入集群的命令，这行命令其实就是部署一个运行在Kubernetes中的代理（Agent），在Kubernetes的命令行中执行以上自动生成的命令。")]),e._v(" "),n("p",[e._v("最后那条命令意思是怕由于部署的Rancher服务没有申请SSL证书，导致HTTPS域名验证过不去，kubectl下载不下来yaml。如果你的Rancher部署在已经申请了证书的HTTPS地址上那可以用前面的，否则还是直接用curl --insecure命令来绕过HTTPS证书查验吧，譬如以下命令所示：")]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[e._v("$ "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" --insecure -sfL https://localhost:8443/v3/import/vgkj5tzphj9vzg6l57krdc9gfc4b4zsfp4l9prrf6sb7z9d2wvbhb5.yaml "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" kubectl apply -f -\n")])])]),n("p",[e._v("多说一句，用哪条命令安装的Agent只决定了yaml文件是如何下载获得的，对后续其他事情是毫无影响的，所以怎么简单怎么来，别折腾。")]),e._v(" "),n("p",[e._v("执行结果类似如下所示，一堆secret、deployment、daementset创建成功，就代表顺利完成了：")]),e._v(" "),n("p",[n("img",{attrs:{src:r(207),alt:""}})]),e._v(" "),n("p",[e._v("然后回到Rancher网页，点击界面上的“Done”按钮。可以看到集群正处于Pending状态：")]),e._v(" "),n("p",[n("img",{attrs:{src:r(208),alt:""}})]),e._v(" "),n("p",[e._v("如果Agent成功到达Running状态的话，这里也会很快就变成Waiting状态，然后再变为Active状态，导入工作即宣告胜利结束。")]),e._v(" "),n("p",[e._v('而如果一直持续Pending状态，说明安装的Agent运行失败。典型的原因是无法访问到Rancher的服务器，这时可以通过kubectl logs命令查看一下cattle-cluster-agent-xxx的日志，通常会看见"XXX is not accessible"，其中的XXX是Rancher第一次进入时跟你确认过的访问地址，假如你乱填了，或者该地址被防火墙挡掉，又或者因为证书限制等其他原因导致Agent无法访问，Rancher就会一直Pending。')]),e._v(" "),n("p",[e._v("最后再提一句，Rancher与Kubernetes集群之间是被动链接的，即由Kubernetes去主动找Rancher，这意味着部署在外网的Rancher，可以无障碍地管理处于内网（譬如NAT后）的Kubernetes集群，这对于大量没有公网IP的集群来说是很方便的事情。")]),e._v(" "),n("h2",{attrs:{id:"使用rancher创建kubernetes集群"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用rancher创建kubernetes集群"}},[e._v("#")]),e._v(" 使用Rancher创建Kubernetes集群")])])}),[],!1,null,null,null);t.default=s.exports}}]);