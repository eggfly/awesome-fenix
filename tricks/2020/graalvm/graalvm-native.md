# 没有虚拟机的Java

尽管Java已经看清楚了在微服务时代的前进目标，但是，Java语言和生态在微服务、微应用环境中的天生的劣势并不会一蹴而就地被解决，通往这个目标的道路注定会充满荆棘；尽管已经有了放弃“一次编写，到处运行”、放弃语言动态性的思想准备，但是，这些特性并不单纯是宣传口号，它们在Java语言诞生之初就被植入到基因之中，当Graal VM试图打破这些规则的同时，也受到了Java语言和在其之上的生态生态的强烈反噬，笔者选择其中最主要的一些困列举如下：

- 某些Java语言的特性，使得Graal VM编译本地镜像的过程变得极为艰难。譬如常见的反射，除非使用[安全管理器](/architect-perspective/general-architecture/system-security/authentication.html)去专门进行认证许可，否则反射机制具有在运行期动态调用几乎所有API接口的能力，且具体会调用哪些接口，在程序不会真正运行起来的编译期是无法获知的。反射显然是Java不能放弃不能妥协的重要特性，为此，只能由程序的开发者明确地告知Graal VM有哪些代码可能被反射调用（通过JSON配置文件的形式），Graal VM才能在编译本地程序时将它们囊括进来。

  ```json
  [
      {
          name: "com.github.fenixsoft.SomeClass",
          allDeclaredConstructors: true,
          allPublicMethods: true
      },
      {
          name: "com.github.fenixsoft.AnotherClass",
          fileds: [{name: "foo"}, {name: "bar"}],
          methods: [{
              name: "<init>",
              parameterTypes: ["char[]"]
          }]
      },
      // something else ……
  ]
  ```

  这是一种可操作性极其低下却又无可奈何的解决方案，即使开发者接受不厌其烦地列举出自己代码中所用到的反射API，但他们又如何能保证程序所引用的其他类库的反射行为都已全部被获知，其中没有任何遗漏？与此类似的还有另外一些语言特性，如动态代理等。另外，一切非代码性质的资源，如最典型的配置文件等，也都必须明确加入配置中才能被Graal VM编译打包。这导致了如果没有专门的工具去协助，使用Graal VM编译Java的遗留系统即使理论可行，实际操作也将是极度的繁琐。

- 大多数运行期对字节码的生成和修改操作，在Graal VM看来都是无法接受的，因为Substrate VM里面不再包含即时编译器和字节码执行引擎，所以一切可能被运行的字节码，都必须经过AOT编译成为原生代码。请不要觉得运行期直接生成字节码会很罕见，误以为导致的影响应该不算很大。事实上，多数实际用于生产的Java系统都或直接或间接、或多或少引用了ASM、CGLIB、Javassist这类字节码库。举个例子，CGLIB是通过运行时产生字节码（生成代理类的子类）来做动态代理的，长期以来这都是Java世界里进行类增强的主流形式，因为面向接口的增强可以使用JDK自带的动态代理，但对类的增强则并没有多少选择的余地。CGLIB也是Spring用来做类增强的选择，但Graal VM明确表示是不可能支持CGLIB的，因此，这点就必须由用户（面向接口编程）、框架（Spring这些DI框架放弃CGLIB增强）和Graal VM（起码得支持JDK的动态代理，留条活路可走）来共同解决。自Spring Framework 5.2起，@Configuration注解中加入了一个新的proxyBeanMethods参数，设置为false则可避免Spring对与非接口类型的Bean进行代理。同样地，对应在Spring Boot 2.2中，@SpringBootApplication注解也增加了proxyBeanMethods参数，通常采用Graal VM去构建的Spring Boot本地应用都需要设置该参数。

- 一切HotSpot虚拟机本身的内部接口，譬如JVMTI、JVMCI等，在都将不复存在了——在本地镜像中，连HotSpot本身都被消灭了，这些接口自然成了无根之木。这对使用者一侧的最大影响是再也无法进行Java语言层次的远程调试了，最多只能进行汇编层次的调试。在生产系统中一般也没有人这样做，开发环境就没必要采用Graal VM编译，这点的实际影响并不算大。

- Graal VM放弃了一部分可以妥协的语言和平台层面的特性，譬如Finalizer、安全管理器、InvokeDynamic指令和MethodHandles，等等，在Graal VM中都被声明为不支持的，这些妥协的内容大多倒并非全然无法解决，主要是基于工作量性价比的原因。能够被放弃的语言特性，说明确实是影响范围非常小的，所以这个对使用者来说一般是可以接受的。

- ……

以上，是Graal VM在Java语言中面临的部分困难，在整个Java的生态系统中，数量庞大的第三方库才是真正最棘手的难题。可以预料，这些第三方库一旦脱离了Java虚拟机，在原生环境中肯定会暴露出无数千奇百怪的异常行为。Graal VM团队对此的态度非常务实，并没有直接硬啃。要建设可持续、可维护的Graal VM，就不能为了兼容现有JVM生态，做出过多的会影响性能、优化空间和未来拓展的妥协牺牲，为此，应该也只能反过来由Java生态去适应Graal VM，这是Graal VM团队明确传递出对第三方库的态度：

:::quote 3rd party libraries

Graal VM native support needs to be sustainable and maintainable, that's why we do not want to maintain fragile pathches for the whole JVM ecosystem.

The ecosystem of libraries needs to support it natively.

::: right

—— Sébastien Deleuze，[DEVOXX 2019](https://www.youtube.com/watch?v=3eoAxphAUIg)

:::

为了推进Java生态向Graal VM兼容，Graal VM主动拉拢了Java生态中最庞大的一个派系：Spring。从2018年起，来自Oracle的Graal VM团队与来自Pivotal的Spring团队已经紧密合作了很长的一段时间，共同创建了[Spring Graal Native](https://github.com/spring-projects-experimental/spring-graal-native)项目来解决Spring全家桶在Graal VM上的运行适配问题，在不久的将来（预计应该是2020年10月左右），下一个大的Spring版本（Spring Framework 5.3、Spring Boot 2.3）的其中一项主要改进就是能够开箱即用地支持Graal VM，这样，用于微服务环境的Spring Cloud便会获得不受Java虚拟机束缚的更广阔舞台空间。