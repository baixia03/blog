---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java-functional-programming/index.html

# 函数作为第一类对象

在函数式编程范式中，函数是语言中的第一类对象。这意味着你可以创建一个函数的“实例”，并有一个变量引用该函数实例，就像引用一个字符串、Map 或任何其他对象一样。函数也可以作为参数传递给其他函数。

在 Java 中，方法并不是第一类对象。我们最接近的是 Java 的 Lambda 表达式。

# 纯函数

纯函数的满足条件：

1. 函数的执行没有副作用。
2. 函数的返回值仅取决于传递给函数的输入参数。

下面是一个在 Java 中的纯函数（方法）示例：

```java
public class ObjectWithPureFunction{
    
    public int sum(int a, int b) {
        return a + b;
    }
}
```

`sum()` 函数的返回值只取决于输入参数，并且，`sum()` 函数没有副作用，这意味着它不会修改函数外部的任何状态（变量）。

相反，以下是一个非纯函数的示例：

```java
public class ObjectWithNonPureFunction{
    private int value = 0;

    public int add(int nextValue) {
        this.value += nextValue;
        return this.value;
    }
}
```

`add()` 方法使用成员变量来计算其返回值，并且它还修改了 `value` 成员变量的状态，因此它具有副作用。

# 高阶函数

如果一个函数满足以下至少一个条件，那么它就是一个高阶函数：

* 该函数接受一个或多个函数作为参数。

* 该函数返回另一个函数作为结果。

在 Java 中，我们最接近高阶函数的是接受一个或多个 Lambda 表达式作为参数，并返回另一个 Lambda 表达式的函数（方法）。以下是一个 Java 中的高阶函数示例：

```java
public class HigherOrderFunctionClass {

    public <T> IFactory<T> createFactory(IProducer<T> producer, IConfigurator<T> configurator) {
        return () -> {
           T instance = producer.produce();
           configurator.configure(instance);
           return instance;
        }
    }
}
```

注意，`createFactory()` 方法返回了一个 Lambda 表达式作为结果。这是高阶函数的第一个条件。

此外，`createFactory()` 方法接受两个实例作为参数，它们都是接口（`IProducer` 和 `IConfigurator`）的实现。还记得 Java 中的 Lambda 表达式必须实现一个函数式接口吗？

假设这些接口看起来像这样：

```java
public interface IFactory<T> {
   T create();
}
```

```java
public interface IProducer<T> {
   T produce();
}
```

```java
public interface IConfigurator<T> {
   void configure(T t);
}
```

所有这些接口都是函数式接口，它们可以由 Java 的 Lambda 表达式实现——因此`createFactory()` 方法是一个高阶函数。

# 无状态

函数式编程范式的一个规则是无状态。这里的“无状态”通常指的是没有函数外部的状态。函数内部可能包含临时状态的局部变量，但函数不能引用它所属类或对象的任何成员变量。

下面是一个不使用外部状态的函数的示例：

```java
public class Calculator {
    public int sum(int a, int b) {
       return a + b;
    }
}
```

相反，以下是一个使用外部状态的函数的示例：

```java
public class Calculator {
    private int initVal = 5;
    public int sum(int a) {
       return initVal + a;
    }
}
```

这个函数明显违反了无状态规则。

# 无副作用

函数式编程范式中的另一条规则是无副作用。这意味着函数不能改变函数外部的任何状态。改变函数外部的状态被称为副作用。

函数外部的状态既指函数所属类或对象的成员变量，也指函数参数中的成员变量，或者像文件系统或数据库这样的外部系统中的状态。

# 不可变变量

函数式编程范式中的第三条规则是不可变变量。不可变变量使得避免副作用更为容易。

# 偏好递归而非循环

函数式编程范式中的第四条规则是偏好递归而非循环。递归使用函数调用来实现循环，因此代码更具函数式特性。

除了循环之外，另一个替代方案是 Java 的 Streams API。这个API是受到函数式编程启发的。

# 函数式接口

在 Java 中，函数式接口是指只包含一个抽象方法的接口。这里的抽象方法指的是没有具体实现的方法。一个接口可以有多个方法，例如默认方法和静态方法，它们都有具体的实现，但只要接口只有一个没有实现的方法，这个接口就被认为是函数式接口。

下面是一个函数式接口的示例：

```java
public interface MyInterface {
    public void run();
}
```

这是一个带有默认方法和静态方法的函数式接口的另一示例：

```java
public interface MyInterface2 {
    public void run();

    public default void doIt() {
        System.out.println("doing it");
    }

    public static void doItStatically() {
        System.out.println("doing it statically");
    }
}
```

请注意，尽管存在两个已经实现了的方法，但这个接口仍然是一个函数式接口，因为只有`run()`方法是没有实现的（即抽象的）。然而，如果接口中有更多的方法没有实现，那么这个接口就不再是一个函数式接口，因此也就不能用 Java 的 Lambda 表达式来实现它。
