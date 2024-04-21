---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java-functional-programming/functional-interfaces.html

Java 函数式接口是在 Java 8 中引入的。函数式接口是一个只包含一个抽象（未实现）方法的接口。除了单个未实现的方法外，函数式接口还可以包含默认方法和静态方法，这些方法都有实现。

下面是一个 Java 函数式接口的示例：

```java
public interface MyFunctionalInterface {
    public void execute();
}
```

这就是一个函数式接口，它只包含一个方法，且该方法没有实现。通常，Java 接口不包含其声明的方法的实现，但它可以在默认方法或静态方法中进行实现。下面是另一个 Java 函数式接口的例子，其中一些方法包含了实现：

```java
public interface MyFunctionalInterface2{
    public void execute();

    public default void print(String text) {
        System.out.println(text);
    }

    public static void print(String text, PrintWriter writer) throws IOException {
        writer.write(text);
    }
}
```

