---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java-functional-programming/streams.html

Java Stream API 是在 Java 8 中添加的，提供了一系列处理对象集合的方法，同时还增加了其他一些函数式编程特性。

Java Stream API 与 Java IO 中的 Java InputStream 和 Java OutputStream 无关。InputStream 和 OutputStream 是与字节流相关的。而 Java Stream API 是用于处理对象流的——而不是字节。

# Java Stream 定义

Java Stream 是一个能够对其元素进行内部迭代的组件，这意味着它可以自己迭代其元素。相反，当你使用Java集合的迭代功能（例如Java迭代器或用于Java Iterable的Java for-each循环）时，你需要自己实现元素的迭代。
