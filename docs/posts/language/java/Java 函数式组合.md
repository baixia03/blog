---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java-functional-programming/functional-composition.html

函数组合是一种技术，它将多个函数组合成一个单一函数，该单一函数内部使用这些组合的函数。你可以自己将单个函数（通常是一个或多个Java Lambda表达式）组合成一个函数，但 Java 也提供了对函数组合的内置支持，以简化你的工作。

# Java 函数式组合示例

下面是一个由两个函数组成的单一函数示例：

```java
Predicate<String> startsWithA = (text) -> text.startsWith("A");
Predicate<String> endsWithX   = (text) -> text.endsWith("x");

Predicate<String> startsWithAAndEndsWithX =
        (text) -> startsWithA.test(text) && endsWithX.test(text);

String  input  = "A hardworking person must relax";
boolean result = startsWithAAndEndsWithX.test(input);
System.out.println(result);
```

这个函数式组合的例子首先创建了两个以 lambda 表达式形式存在的 Predicate 实现。第一个 Predicate 在传入的字符串参数以大写字母 a（A）开头时返回 true。第二个 Predicate 在传入的字符串以小写字母 x 结尾时返回 true。注意，Predicate 接口包含一个名为 test() 的未实现方法，该方法返回一个布尔值，正是这个方法被 lambda 表达式实现。

在创建了两个基本函数之后，组合了一个第三个 Predicate，它会调用前两个函数的 test() 方法。这个第三个函数在前两个基本函数都返回 true 时返回 true，否则返回 false。

最后，这个例子调用了组合函数并打印出结果。由于文本既以大写字母 a（A）开头又以小写字母 x 结尾，因此当传入字符串 "A hardworking person must relax" 时，组合函数将返回 true。

# Java 函数式组合支持

上一节的例子展示了如何将两个其他函数组合成一个新函数，其实 Java 中的一些函数式接口已经内置了对函数式组合的支持。这种函数式组合的支持以函数式接口中的默认方法和静态方法的形式存在。

## Predicate 组合

### and()

Predicate 的 and() 方法是一个默认方法。使用 and() 方法组合的示例如下：

```java
Predicate<String> startsWithA = (text) -> text.startsWith("A");
Predicate<String> endsWithX   = (text) -> text.endsWith("x");

Predicate<String> composed = startsWithA.and(endsWithX);

String input = "A hardworking person must relax";
boolean result = composed.test(input);
System.out.println(result);
```

### or()

or() 方法用于将一个 Predicate 实例与另一个结合，从而组成第三个 Predicate 实例。当调用组合后的 Predicate 的 test() 方法时，如果组成它的任何一个 Predicate 实例返回 true，则组合后的 Predicate 将返回 true。示例如下：

```java
Predicate<String> startsWithA = (text) -> text.startsWith("A");
Predicate<String> endsWithX   = (text) -> text.endsWith("x");

Predicate<String> composed = startsWithA.or(endsWithX);

String input = "A hardworking person must relax sometimes";
boolean result = composed.test(input);
System.out.println(result);
```

首先创建了两个基本的 Predicate 实例，通过调用第一个 Predicate 的 or() 方法，将第二个 Predicate 作为参数传递给它，从而创建了由前两个 Predicate 组成的第三个 Predicate。

运行上述示例的输出是 true。

## Function 组合

### compose()

```java
Function<Integer, Integer> multiply = (value) -> value * 2;
Function<Integer, Integer> add      = (value) -> value + 3;

Function<Integer, Integer> addThenMultiply = multiply.compose(add);

Integer result1 = addThenMultiply.apply(3);
System.out.println(result1);
```

当传入值 3 时，组合后的 `Function` 将首先调用 `add` 函数，然后调用 `multiply` 函数。最终的计算结果为 (3 + 3) * 2，结果是 12。

### andThen()

Function 的 andThen() 方法与 compose() 方法的工作方式相反。使用 andThen() 组合的 Function 将首先调用调用 andThen() 的那个 Function，然后调用作为参数传递给 andThen() 方法的 Function。下面是一个 Java Function 的 andThen() 示例：

```java
Function<Integer, Integer> multiply = (value) -> value * 2;
Function<Integer, Integer> add      = (value) -> value + 3;

Function<Integer, Integer> multiplyThenAdd = multiply.andThen(add);

Integer result2 = multiplyThenAdd.apply(3);
System.out.println(result2);
```

这个示例首先创建了一个 multiply 函数和一个 add 函数。然后，在 multiply 函数上调用 andThen() 方法来组合一个新函数，将 add 函数作为参数传递给 andThen()。

将 3 作为参数调用组合后的 Function 的 andThen() 方法会产生以下计算：

3 * 2 + 3，结果是 9。

**注意**：andThen() 的工作方式与 compose() 相反。因此，**调用 a.andThen(b) 实际上与调用 b.compose(a) 是相同的**。
