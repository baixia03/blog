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

这就是一个函数式接口，它只包含一个方法，且该方法没有实现。

通常，Java 接口不包含其声明的方法的实现，但是可以在默认方法或静态方法中进行实现。下面是另一个 Java 函数式接口的例子，但部分方法包含了实现：

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

# 使用 Lambda 表达式实现函数式接口

Java 函数式接口可以由 Java Lambda 表达式来实现。以下是一个例子：

```java
MyFunctionalInterface lambda = () -> {
    System.out.println("Executing...");
}
```

# Java 中的内置函数式接口

Java 包含了一系列为常见用例设计的函数式接口，使我们不必为每一个小用例创建自己的函数式接口。下面将介绍 Java 中的一些内置函数式接口。

## Function

Java 的 Function 接口（java.util.function.Function）是 Java 中最核心的函数式接口之一。Function 接口代表一个函数（方法），该函数接受一个参数并返回一个值。Function 接口的定义如下：

```java
public interface Function<T,R> {
    public <R> apply(T parameter);
}
```

Function 接口除了上面列出的方法外，实际上还包含一些额外的方法，但由于它们都有默认实现，因此我们不需要实现这些额外的方法。这些额外的方法将在后面的部分中解释。

要实现 Function 接口，我们只需要实现 apply() 方法。以下是一个实现 Function 接口的示例：

```java
public class AddThree implements Function<Long, Long> {

    @Override
    public Long apply(Long aLong) {
        return aLong + 3;
    }
}
```

AddThree 实现了 Function 接口的 apply() 方法，它接受一个 Long 作为参数，并返回一个 Long。下面是使用上述 AddThree 类的示例：

```java
Function<Long, Long> adder = new AddThree();
Long result = adder.apply((long) 4);
System.out.println("result = " + result);
```

该示例创建了一个新的 AddThree 实例并将其赋值给一个 Function 变量，然后 AddThree 实例调用了 apply() 方法，打印出结果（即7）。

也可以使用 Java Lambda 表达式来实现 Function 接口。如下所示：

```java
Function<Long, Long> adder = (value) -> value + 3;
Long resultLambda = adder.apply((long) 8);
System.out.println("resultLambda = " + resultLambda);
```

如您所见，Function 接口的实现现在内联在 adderLambda 变量的声明中，而不是在单独的类中，这更简洁一些，而且我们可以直接在上面的代码中看到它的作用。

## Predicate

Jav a的 Predicate 接口，即 java.util.function.Predicate，代表一个简单的函数，它接受一个值作为参数，并返回 true 或 false。Predicate 函数式接口的定义如下：

```java
public interface Predicate<T> {
    boolean test(T t);
}
```

Predicate 接口除了 test() 方法外还包含其他方法，但其余方法都是默认方法或静态方法，不需要实现它们。

可以使用类来实现 Predicate 接口，如下所示：

```java
public class CheckForNull implements Predicate {
    @Override
    public boolean test(Object o) {
        return o != null;
    }
}
```

我们也可以使用 Lambda 表达式来实现 Java 的 Predicate接口：

```java
Predicate predicate = (value) -> value != null;
```

这个使用 Lambda 表达式实现的 Predicate 接口，实际上与上面使用类实现的版本做了同样的事情。

## UnaryOperator

代表一个操作，该操作接受一个参数并返回相同类型的参数。示例：

```java
UnaryOperator<Person> unaryOperator = 
        (person) -> { person.name = "New Name"; return person; };
```

该操作可以接受一个特定的对象作为参数，然后修改该对象，并再次返回它——可能作为函数式流处理链的一部分。

## BinaryOperator

代表一个操作，该操作接受两个参数并返回一个值。这两个参数和返回类型必须是相同的类型。

当实现某些特定函数时，Java 的 BinaryOperator 接口非常有用，这些函数可以执行加法、减法、除法、乘法等操作，用于两个相同类型的元素，并返回第三个相同类型的元素。

以下是 BinaryOperator 接口的一个示例实现：

```java
BinaryOperator<MyValue> binaryOperator =
        (value1, value2) -> { value1.add(value2); return value1; };
```

## Supplier

代表一个提供某种类型值的函数。Supplier 接口也可以被视为一个工厂接口。以下是 Java Supplier 接口的一个示例实现：

```java
Supplier<Integer> supplier = () -> new Integer((int) (Math.random() * 1000D));
```

这个 Java Supplier 实现返回一个新的 Integer 实例，其值在 0 到 1000 之间随机。

## Consumer

代表一个函数，该函数消费一个值而不返回任何值。Java Consumer 的实现可能是打印一个值，或者将其写入文件，或者通过网络发送等。以下是 Java Consumer 接口的一个示例：

```java
Consumer<Integer> consumer = (value) -> System.out.println(value);
```

这个 Java Consumer 实现将作为参数传入的值打印到 System.out 上。



