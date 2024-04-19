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

首先，创建一个 StateOwner 实例。然后，将 StateChangeListener 接口的一个匿名实现作为监听器添加到 StateOwner 实例上。

在 Java 8 中，我们可以使用 Java lambda 表达式来添加事件监听器，如下所示：

```java
StateOwner stateOwner = new StateOwner();

stateOwner.addStateListener(
    (oldState, newState) -> System.out.println("State changed")
);
```

lambda 表达式会与 addStateListener() 方法的参数类型进行匹配。如果 lambda 表达式与参数类型匹配（在本例中为 StateChangeListener 接口），那么 lambda 表达式会被转换为一个实现与该参数相同接口的函数。

Java lambda 表达式只能使用在单一方法接口中。在上面的例子中，lambda 表达式用作参数，其参数类型是 StateChangeListener 接口。这个接口只有一个方法。因此，lambda 表达式成功匹配了该接口。

## Lambda 与接口的匹配

单方法接口有时也被称为函数式接口。将 Java lambda 表达式与函数式接口进行匹配分为以下步骤：

* 接口是否只有一个抽象（未实现）方法？

* lambda 表达式的参数是否与单一方法的参数匹配？

* lambda 表达式的返回类型是否与单一方法的返回类型匹配？

如果这三个条件都符合，那么给定的 lambda 表达式就成功地与接口匹配了。

## 有默认方法和静态方法的接口

从 Java 8 开始，Java 接口可以包含默认方法和静态方法。默认方法和静态方法都在接口声明中直接定义了实现。这意味着，只要接口中只有一个未实现（也称为抽象）的方法，Java lambda 表达式就可以实现包含多个方法的接口。

换句话说，只要接口只包含一个未实现（抽象）的方法，即使它包含默认方法和静态方法，该接口仍然是一个函数式接口。

下面的接口可以通过一个 lambda 表达式来实现：

```java
import java.io.IOException;
import java.io.OutputStream;

public interface MyInterface {

    void printIt(String text);

    default public void printUtf8To(String text, OutputStream outputStream){
        try {
            outputStream.write(text.getBytes("UTF-8"));
        } catch (IOException e) {
            throw new RuntimeException("Error writing String as UTF-8 to OutputStream", e);
        }
    }

    static void printItToSystemOut(String text){
        System.out.println(text);
    }
}
```

尽管这个接口包含了 3 个方法，但它仍然可以用 lambda 表达式来实现，因为只有一个方法未实现。下面是实现方式：

```java
MyInterface myInterface = (String text) -> {
    System.out.print(text);
};
```

# Lambda 表达式 VS 匿名接口

尽管 lambda 表达式与匿名接口很接近，但还是有几个值得注意的差异。

主要区别在于，匿名接口实现可以有状态（成员变量），而 lambda 表达式则不可以。来看这个接口：

```java
public interface MyEventConsumer {
    public void consume(Object event);
}
```

这个接口可以使用匿名接口来实现，如下所示：

```java
MyEventConsumer consumer = new MyEventConsumer() {
    public void consume(Object event){
        System.out.println(event.toString() + " consumed");
    }
};
```

这个匿名的 MyEventConsumer 可以有自己的内部状态。请看下面的示例：

```java
MyEventConsumer myEventConsumer = new MyEventConsumer() {
    private int eventCount = 0;
    public void consume(Object event) {
        System.out.println(event.toString() + " consumed " + this.eventCount++ + " times.");
    }
};
```

注意匿名 MyEventConsumer 实现现在有一个名为 eventCount 的字段。lambda 表达式不能拥有这样的字段。因此，我们说 lambda 表达式是无状态的。



# Lambda 类型推断

在 Java 8 之前，当你创建匿名接口实现时，你需要指定要实现哪个接口。这是本文开头给出的匿名接口实现示例：

```java
stateOwner.addStateListener(new StateChangeListener() {

    public void onStateChange(State oldState, State newState) {
        // do something with the old and new state.
    }
});
```

使用 lambda 表达式时，类型通常可以从周围的代码推断出来。例如，参数的接口类型可以从 addStateListener() 方法的方法声明中推断出来，这被称为类型推断。编译器通过在其他地方查找类型来推断参数的类型——在本例中，是方法定义。以下是本文开头的一个示例，可以看到在 lambda 表达式中没有提及 StateChangeListener 接口：

```java
stateOwner.addStateListener(
    (oldState, newState) -> System.out.println("State changed")
);
```

在 lambda 表达式中，参数类型通常也可以被推断出来。在上面的示例中，编译器可以从 onStateChange() 方法声明中推断出它们的类型。因此，参数 oldState 和 newState 的类型是从 onStateChange() 方法声明中推断出来的。

# Lambda 参数

由于 Java lambda 表达式实际上只是方法，因此 lambda 表达式可以像方法一样接受参数。前面显示的 lambda 表达式中的 (oldState, newState) 部分指定了 lambda 表达式接受的参数。这些参数必须与单方法接口上的方法参数匹配。在本例中，这些参数必须与 StateChangeListener 接口的 onStateChange() 方法的参数匹配：

```java
public void onStateChange(State oldState, State newState);
```

首先，lambda 表达式中的参数数量必须与方法中的参数数量匹配。其次，如果你在 lambda 表达式中指定了任何参数类型，这些类型也必须匹配。我还没有向你展示如何在 lambda 表达式参数上指定类型（这在本文后面会展示），但在许多情况下你不需要它们。

## 无参数

如果你要将 lambda 表达式与不带参数的方法匹配，那么你可以像这样编写 lambda 表达式：

```java
() -> System.out.println("Zero parameter lambda");
```

括号之间没有任何内容，这是为了表示该 lambda 表达式不接受任何参数。

## 一个参数

如果你要将 Java lambda 表达式与接受一个参数的方法匹配，你可以像这样编写 lambda 表达式：

```java
(param) -> System.out.println("One parameter: " + param);
```

请注意，参数是列在括号内的。

当 lambda 表达式接受一个参数时，你也可以省略括号，像这样：

```java
 param -> System.out.println("One parameter: " + param);
```

## 多个参数

如果你要将一个 Java lambda 表达式与接受多个参数的方法匹配，那么这些参数需要列在括号内。示例：

```java
(p1, p2) -> System.out.println("Multiple parameters: " + p1 + ", " + p2);
```

只有当方法只接受一个参数时，才可以省略括号。

## 参数类型

如果编译器无法从 lambda 表达式所匹配的功能接口方法中推断出参数类型，那么有时可能需要为 lambda 表达式指定参数类型。不用担心，当出现这种情况时，编译器会告诉你。以下是一个 Java lambda 参数类型的示例：

```java
(Car car) -> System.out.println("The car is: " + car.getName());
```

正如你所看到的，参数 car 的类型（Car）写在参数名本身的前面，就像你在其他地方声明方法参数或创建接口的匿名实现时所做的那样。

## Java 11 中的 var 参数类型

从 Java 11 开始，你可以使用 var 关键字作为参数类型。var 关键字在 Java 10 中被引入作为局部变量类型推断。从 Java 11 开始，var 也可以用于 lambda 参数类型。以下是在 lambda 表达式中使用 Java var 关键字作为参数类型的示例：

```java
Function<String, String> toLowerCase = (var input) -> input.toLowerCase();
```

上面使用 var 关键字声明的参数类型将被推断为 String 类型，因为该变量的类型声明将其泛型类型设置为 Function<String, String>，这意味着 Function 的参数类型和返回类型都是 String。

# Lambda 函数体

lambda 表达式的主体，也就是它所代表的函数/方法的主体，是在 lambda 声明中的 -> 符号的右侧指定的。以下是一个示例：

```java
 (oldState, newState) -> System.out.println("State changed")
```

如果你的 lambda 表达式需要包含多行，你可以将 lambda 函数体放在 { } 括号内，这在 Java 中声明其他方法时也是必需的。以下是一个示例：

注意：在 Java 中，当 lambda 表达式的函数体只有一条语句时，可以省略大括号，但如果有多条语句，则必须使用大括号包围起来。

```java
(oldState, newState) -> {
   System.out.println("Old state: " + oldState);
   System.out.println("New state: " + newState);
}
```

# 从 lambda 表达式中返回值

你可以从 Java lambda 表达式中返回值，就像从方法中返回值一样。你只需在 lambda 函数体中添加一个 return 语句，如下所示：

```java
(param) -> {
   System.out.println("param: " + param);
   return "return value";
}
```

如果你的 lambda 表达式只是用于计算一个返回值并返回它，那么你可以用一种更简洁的方式来指定返回值。而不是这样：

```java
 (a1, a2) -> { return a1 > a2; }
```

你可以写成：

```java
 (a1, a2) -> a1 > a2;
```

然后编译器会推断出表达式 a1 > a2 是 lambda 表达式的返回值（因此得名 lambda 表达式——因为表达式返回某种类型的值）。

# Lambda 作为对象

Java lambda 表达式本质上是一个对象。你可以将 lambda 表达式赋值给一个变量，并像处理其他对象一样传递它。以下是一个示例：

```java
public interface MyComparator {
    public boolean compare(int a1, int a2);
}
```

```java
MyComparator myComparator = (a1, a2) -> a1 > a2;

boolean result = myComparator.compare(2, 5);
```

第一段代码块展示了 lambda 表达式所实现的接口。第二段代码块展示了 lambda 表达式的定义，如何将 lambda 表达式赋值给变量，以及最后如何通过调用它所实现的接口方法来调用 lambda 表达式。

# 变量捕获

在特定情况下，Java lambda 表达式能够访问在 lambda 函数体外部声明的变量

Java lambda 可以捕获以下类型的变量：

* 局部变量
* 实例变量
* 静态变量

下面各节将描述每种变量的捕获。

## 局部变量捕获

Java lambda 可以捕获在 lambda 函数体外部声明的局部变量的值。为了说明这一点，首先看一下这个单方法接口：

```java
public interface MyFactory {
    public String create(char[] chars);
}
```

现在，看一下这个实现 MyFactory 接口的 lambda 表达式：

```java
MyFactory myFactory = (chars) -> {
    return new String(chars);
};
```

目前这个 lambda 表达式只引用了传递给它的参数值（chars），我们也可以引用在 lambda 函数体外部声明的 变量：

```java
String myString = "Test";

MyFactory myFactory = (chars) -> {
    return myString + ":" + new String(chars);
};
```

如你所见，上面的 lambda 函数体引用了外部声明的局部变量 myString。这只有在被引用的变量是“effectively final”时被允许，也就是说，在被赋值后，它的值不会改变。如果 myString 变量的值在之后被改变了，编译器会抱怨在 lambda 函数体内部对它的引用。

> 问：编译器为何会抱怨？

## 实例变量捕获

lambda 表达式还可以捕获创建 lambda 的对象中的实例变量。示例：

```java
public class EventConsumerImpl {

    private String name = "MyConsumer";

    public void attach(MyEventProducer eventProducer){
        eventProducer.listen(e -> {
            System.out.println(this.name);
        });
    }
}
```

注意 lambda 函数体内部的 this.name 引用。这个 lambda 表达式捕获了封闭对象 EventConsumerImpl 的 name 实例变量。甚至在捕获之后，仍然可以更改实例变量的值——这个值会在 lambda 内部得到反映。

关于这方面的语义，实际上是 Java lambda 与接口匿名实现之间的不同之处之一。接口匿名实现可以有自己的实例变量，这些变量通过 this 引用进行引用。然而，**lambda 不能有自己的实例变量，因此 this 总是指向封闭对象**。

## 静态变量捕获

Java lambda 表达式也可以捕获静态变量。这并不奇怪，因为静态变量在 Java 应用程序的任何地方都是可访问的，前提是静态变量是可访问的（包作用域或公共的）。

以下是一个示例类，它创建了一个 lambda，该 lambda 在其函数体内部引用了静态变量：

```java
public class EventConsumerImpl {
    private static String someStaticVar = "Some text";

    public void attach(MyEventProducer eventProducer){
        eventProducer.listen(e -> {
            System.out.println(someStaticVar);
        });
    }
}
```

在 lambda 捕获静态变量之后，静态变量的值也是允许改变的。

# 方法引用作为 Lambda 表达式

如果你的 lambda 表达式所做的全部工作就是使用传递给 lambda 的参数来调用另一个方法，那么 Java lambda提供了一种更简洁的方式来表示方法调用。首先，这里有一个单函数接口的例子：

```java
public interface MyPrinter{
    public void print(String s);
}
```

以下是一个创建实现 MyPrinter 接口的 Java lambda 示例：

```java
MyPrinter myPrinter = (s) -> { System.out.println(s); };
```

因为 lambda 函数体只包含一个单独的语句，所以我们可以省略包围它的 {} 大括号。此外，由于 lambda 方法只有一个参数，我们也可以省略参数周围的 () 大括号。以下是最终 lambda 声明的样子：

```java
MyPrinter myPrinter = s -> System.out.println(s); 
```

由于整个 lambda 函数体所做的只是将字符串参数传递给 System.out.println() 方法，因此我们可以使用方法引用来替换上述 lambda 声明。示例：

```java
MyPrinter myPrinter = System.out::println;
```

请注意双冒号 ::。它告诉 Java 编译器这是一个方法引用。引用的方法位于双冒号之后。拥有被引用方法的任何类或对象都位于双冒号之前。

你可以引用以下类型的方法：

* 静态方法

* 参数对象上的实例方法

* 实例方法

* 构造器

下面是这些类型的方法引用的介绍。

## 静态方法引用

最容易引用的方法是静态方法。以下是一个单函数接口的例子：

```java
public interface Finder {
    public int find(String s1, String s2);
}
```

以下是使用静态方法引用的 lambda 表达式的示例：

```java
public class MyClass{
    public static int doFind(String s1, String s2){
        return s1.lastIndexOf(s2);
    }
}
```

最后，以下是一个引用静态方法的 Java lambda 表达式：

```java
Finder finder = MyClass::doFind;
```

由于 `Finder.find()` 和 `MyClass.doFind()` 方法的参数匹配，因此可以创建一个实现 `Finder.find()` 并引用 `MyClass.doFind()` 方法的 lambda 表达式。

## 参数方法引用

你还可以引用 lambda 表达式其中一个参数的方法。假设有一个如下的单函数接口：

```java
public interface Finder {
    public int find(String s1, String s2);
}
```

这个接口旨在表示一个能够搜索 s1 中 s2 出现的组件。以下是一个 Java lambda 表达式示例，它调用 String.indexOf() 方法来进行搜索：

```java
Finder finder = String::indexOf;
```

这相当于以下的 lambda 定义：

```java
Finder finder = (s1, s2) -> s1.indexOf(s2);
```

请注意，简写版本是如何引用单个方法的。Java 编译器会尝试将引用的方法与第一个参数类型进行匹配，并使用第二个参数类型作为引用方法的参数。

## 实例方法引用

第三，还可以从 lambda 定义中引用实例方法。首先，让我们看一下单方法接口的定义：

```java
public interface Deserializer {
    public int deserialize(String v1);
}
```

这个接口代表一个能够将 String “反序列化”为 int 的组件。

现在看看这个 StringConverter 类：

```java
public class StringConverter {
    public int convertToInt(String v1){
        return Integer.valueOf(v1);
    }
}
```

convertToInt() 方法与 Deserializer 接口的 deserialize() 方法具有相同的签名。因此，我们可以创建 StringConverter 的一个实例，并从 Java lambda 表达式中引用其 convertToInt() 方法，如下所示：

```java
StringConverter stringConverter = new StringConverter();

Deserializer des = stringConverter::convertToInt;
```

两行代码中的第二行创建的 lambda 表达式引用了第一行创建的 StringConverter 实例的 convertToInt 方法。

## 构造引用

最后，可以引用一个类的构造器。这可以通过在类名后面加上 ::new 来实现，如下所示：

```java
MyClass::new
```

要了解如何使用构造器作为 lambda 表达式，先来看下面的接口定义：

```java
public interface Factory {
    public String create(char[] val);
}
```

这个接口的 create() 方法与 String 类中的一个构造器的签名相匹配。因此，这个构造器可以用作 lambda 表达式。以下是一个示例：

```java
Factory factory = String::new;
```

这相当于以下的 Java lambda 表达式：

```java
Factory factory = chars -> new String(chars);
```

