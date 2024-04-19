---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java/lambda-expressions.html

Java lambda 表达式是 Java 8 中的新特性，它是 Java 向函数式编程迈出的第一步。Java
lambda 表达式是一个无需属于任何类的函数，它可以像对象一样传递并在需要时执行。

Java lambda 表达式通常用于实现简单的事件监听器/回调函数，或者在使用 Java Streams API进行函数式编程时被使用。Java
Lambda 表达式也经常在 Java 的函数式编程中被使用。



# Java Lambda 表达式与单方法接口

函数式编程经常被用于实现事件监听器。在 Java 中，事件监听器通常被定义为只有一个方法的 Java 接口。以下是一个单方法接口示例：

```java
public interface StateChangeListener {
    public void onStateChange(State oldState, State newState);
}
```

这个 Java 接口只定义了一个方法，该方法会在状态发生变化时被调用（无论被观察的对象是什么）。

在 Java 7 中，你需要实现这个接口才能监听状态变化。假设你有一个名为 StateOwner 的类，它可以注册状态事件监听器。以下是一个示例：

```java
public class StateOwner {
    public void addStateListener(StateChangeListener listener) { ... }
}
```

在 Java 7 中，你可以使用匿名接口实现来添加一个事件监听器，像这样：

```java
StateOwner stateOwner = new StateOwner();
stateOwner.addStateListener(new StateChangeListener() {
    public void onStateChange(State oldState, State newState) {
        // do something with the old and new state.
    }
});
```





