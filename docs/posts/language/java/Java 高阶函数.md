---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java-functional-programming/higher-order-functions.html

高阶函数是一个函数，它要么将另一个函数（方法）作为参数，要么在执行完毕后返回一个函数。

# 排序集合

高阶函数的第一个例子是`Collections.sort()`方法，它接受一个`Comparator`作为参数。以下是一个例子：

```java
List<String> list = new ArrayList<>();
list.add("One");
list.add("Abc");
list.add("BCD");

Collections.sort(list, (String a, String b) -> {
    return a.compareTo(b);
});

System.out.println(list);    
```

`Collection.sort()`方法接受两个参数。第一个参数是一个 List，第二个参数是一个 lambda 表达式（函数）。这个 lambda 参数使得`Collections.sort()`成为了一个高阶函数。

# 倒序排序

以下是另一个高阶函数的例子。

```java
Comparator<String> comparator = (String a, String b) -> {
    return a.compareTo(b);
};

Comparator<String> comparatorReversed = comparator.reversed();

Collections.sort(list, comparatorReversed);

System.out.println(list);
```

这个示例首先创建了一个实现`Comparator`接口的 Java lambda表达式。

然后，在`Comparator` lambda 上调用了`reversed()`方法。`reversed()`方法返回一个新的`Comparator` lambda，该 lambda 会反转第一个`Comparator`实现返回的结果。这里的“反转”是指它简单地返回`-1 * comparator.compare(a,b)`。

由于`reversed()`方法返回了一个lambda（函数），因此`reversed()`方法被视为高阶函数。

最后，示例使用`Collections.sort()`方法对字符串列表进行排序。
