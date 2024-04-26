---
outline: [ 1, 3 ]
---

https://jenkov.com/tutorials/java-functional-programming/streams.html

Java Stream API 是在 Java 8 中添加的，提供了一系列处理对象集合的方法，同时还增加了其他一些函数式编程特性。

Java Stream API 与 Java IO 中的 Java InputStream 和 Java OutputStream 无关。InputStream 和 OutputStream 是与字节流相关的。而 Java Stream API 是用于处理对象流的——而不是字节。

# Java Stream 定义

Java Stream 可以对其元素进行内部迭代，也就是说它可以自己迭代元素。相比之下，当你使用 Java 集合的迭代功能（例如 Java 迭代器或 Java 的 for-each 循环与 Java 可迭代对象一起使用）时，你必须自己实现元素的迭代。

# 流处理

您可以将监听器附加到流上。当流在内部迭代元素时，会调用这些监听器。对于流中的每个元素，监听器都会被调用一次。这样，每个监听器都可以处理流中的每个元素。这被称为流处理。

流的监听器形成了一个链。链中的第一个监听器可以处理流中的元素，然后返回一个新的元素供链中的下一个监听器处理。监听器可以根据监听器（处理器）的目的返回相同的元素或新的元素。

# 获取流

获取 Java 流的方式有很多。最常见的方式之一是从 Java 集合中获取流。示例：

```java
List<String> items = new ArrayList<String>();

items.add("one");
items.add("two");
items.add("three");

Stream<String> stream = items.stream();    
```

这个示例首先创建了一个 Java 列表，然后向其中添加了三个 Java 字符串。最后，示例调用 stream() 方法以获取一个流实例。

# 终端操作和非终端操作

流接口有一系列终端操作和非终端操作。非终端流操作是向流中添加监听器而不执行其他操作的操作。终端流操作是开始元素的内部迭代、调用所有监听器并返回结果的操作。

以下是一个包含非终端操作和终端操作的 Java 流示例：

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class StreamExamples {

    public static void main(String[] args) {
        List<String> stringList = new ArrayList<String>();

        stringList.add("ONE");
        stringList.add("TWO");
        stringList.add("THREE");

        Stream<String> stream = stringList.stream();

        long count = stream
            .map((value) -> { return value.toLowerCase(); })
            .count();

        System.out.println("count = " + count);

    }
}
```

对流接口的 map() 方法的调用是一个非终端操作，它只是在流上设置了一个 lambda 表达式，该表达式将每个元素转换为小写。map() 方法将在后面详细介绍。

对 count() 方法的调用是一个终端操作。这个调用将开始内部迭代，这将导致每个元素被转换为小写，然后进行计数。

将元素转换为小写实际上不会影响元素的数量。转换部分只是作为一个非终端操作的示例存在。

## 非终端操作

Java Stream API 的非终端流操作是转换或过滤流中元素的操作。当你向流中添加非终端操作时，你将获得一个新的流作为结果。以下是一个向流中添加非终端操作的示例，该操作会产生一个新的流：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("ONE");
stringList.add("TWO");
stringList.add("THREE");
    
Stream<String> stream = stringList.stream();
    
Stream<String> stringStream =
    stream.map((value) -> { return value.toLowerCase(); });

```

请注意对 stream 的 map() 的调用。这个调用实际上返回了一个新的 Stream 实例。

你只能向给定的 Stream 实例添加一个操作。如果您需要连续链式调用多个操作，则需要将第二个操作应用于第一个操作产生的 Stream 操作结果。示例：

```java
Stream<String> stream1 = stream
  .map((value) -> { return value.toLowerCase(); })
  .map((value) -> { return value.toUpperCase(); })
  .map((value) -> { return value.substring(0,3); });
```

许多非终端流操作可以接受 Java Lambda 表达式作为参数。这个 Lambda 表达式实现了与给定非终端操作相匹配的 Java 函数式接口。例如，Function 或 Predicate 接口。非终端操作方法的参数通常是一个函数式接口，这就是为什么它也可以由 Java Lambda 表达式实现的原因。

### filter()

Java Stream 的 filter() 方法可以用来从 Java Stream 中过滤掉元素。filter 方法接受一个 Predicate，该 Predicate 会对流中的每个元素进行调用。如果元素需要被包含在结果 Stream 中，则 Predicate 应返回 true；如果元素不应被包含，则 Predicate 应返回 false。示例：

```java
Stream<String> longStringsStream = stream.filter((value) -> {
    return value.length() >= 3;
});
```

### map()

Java Stream 的 map() 方法用于将流中的元素转换为另一种对象。例如，如果你有一个字符串列表，你可以使用 map() 方法将每个字符串转换为小写、大写、原始字符串的子字符串，或者其他任何形式的对象。示例：

```java
List<String> list = new ArrayList<String>();
Stream<String> stream = list.stream();

Stream<String> streamMapped = stream.map((value) -> value.toUpperCase());
```

### flatMap()

Java Stream 的 flatMap() 方法用于将一个元素映射成多个元素。它的想法是，将一个由多个内部元素组成的复杂结构中的每个元素“展平”成一个只包含这些内部元素的“扁平”流。

举个例子，假设你有一个包含嵌套对象（子对象）的对象。那么你可以将这个对象映射成一个扁平的流，这个流由它自身和它的嵌套对象组成——或者只包含嵌套对象。你还可以将一个元素列表的流映射成元素本身，或者将一个字符串流的每个字符串映射成单词流，或者映射成字符串中单独的字符实例。

下面是一个例子，它使用 flatMap() 将一个字符串列表映射成每个字符串中的单词。

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

stream.flatMap((value) -> {
    String[] split = value.split(" ");
    return (Stream<String>) Arrays.asList(split).stream();
})
.forEach((value) -> System.out.println(value));
```

这个 Java Stream 的 flatMap() 示例首先创建了一个包含 3 个字符串的列表，这些字符串是书籍的标题。然后，从这个列表中获取一个流，并调用 flatMap() 方法。

在流上调用的 flatMap() 操作需要返回另一个流，该流代表扁平映射的元素。在上面的示例中，每个原始字符串都被分割成单词，转换成列表，然后从这个列表中获取并返回流。

请注意，这个示例以调用 forEach() 结束，这是一个终止操作。这个调用仅用于触发内部迭代，从而进行扁平映射操作。如果在流链上没有调用任何终止操作，那么就不会发生任何事情。实际上，不会进行任何扁平映射（意思就是必须调用 forEach 操作 flatMap 操作才会生效）。

### distinct()

Java Stream 的 distinct() 方法是一个非终止操作，它返回一个新的 Stream，这个新的 Stream 只包含原始 Stream 中的唯一元素。任何重复的元素都会被消除。下面是Java Stream distinct()方法的一个示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

List<String> distinctStrings = stream
        .distinct()
        .collect(Collectors.toList());

System.out.println(distinctStrings);
```

在这个例子中，元素“one”在原始流中出现了 2 次。只有这个元素的第一次出现会被包含在由 distinct() 方法返回的流中。因此，最终通过调用 collect() 方法得到的列表将只包含 “one”、“two” 和 “three”。这个例子打印的输出将是：

```java
[one, two, three]
```

### limit()

Java Stream 的 limit() 方法可以将流中的元素数量限制为作为 limit() 方法参数给定的数量。limit() 方法返回一个新的 Stream，其中最多包含给定数量的元素。以下是一个 Java Stream limit() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();
stream
    .limit(2)
    .forEach( element -> { System.out.println(element); });    
```

这个示例首先创建了一个流，然后在其上调用 limit() 方法，接着使用打印流中元素的 lambda 表达式调用 forEach() 方法。由于调用了limit(2)，因此只会打印前两个元素。

### peek()

Java Stream 的 peek() 方法是一个非终端操作，它接受一个Consumer（java.util.function.Consumer）作为参数。该 Consumer 会对流中的每个元素进行调用。peek() 方法返回一个新的 Stream，其中包含原始 Stream 中的所有元素。

peek() 方法的目的，正如方法名所示，是查看流中的元素，而不是转换它们。请注意，peek() 方法不会开始流中元素的内部迭代。为此，您需要调用一个终止操作。下面是一个 Java Stream peek() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

Stream<String> streamPeeked = stream.peek((value) -> {
    System.out.println("value");
});
```

## 终端操作

Java Stream 接口的终端操作通常返回单个值。一旦在 Stream 上调用终端操作，就会开始对流和任何串联流的迭代。一旦迭代完成，就会返回终止操作的结果。

终端操作通常不会返回新的 Stream 实例。因此，一旦你在流上调用终端操作，非终端操作创建的 Stream 实例的串联就会结束。下面是Java Stream 上调用终端操作的示例：

```java
long count = stream
  .map((value) -> { return value.toLowerCase(); })
  .map((value) -> { return value.toUpperCase(); })
  .map((value) -> { return value.substring(0,3); })
  .count();
```

在这个示例的末尾调用了 count()，这是一个终端操作。由于 count() 返回一个 long 类型的值，因此非终端操作（map()调用）的 Stream 链就此结束。

### anyMatch()

Java Stream 的 anyMatch() 方法是一个终端操作，它接受一个 Predicate 作为参数，开始 Stream 的内部迭代，并将 Predicate 参数应用于每个元素。如果 Predicate 对所有的元素都返回 true，则 anyMatch() 方法返回 true。如果没有元素与 Predicate 匹配，anyMatch() 将返回 false。下面是一个 Java Stream anyMatch() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

boolean allMatch = stream.allMatch((value) -> { return value.startsWith("One"); });
System.out.println(allMatch);
```

在上面的示例中，allMatch() 方法将返回 false，因为 Stream 中只有一个字符串以“One”开头。

### noneMatch()

Java Stream 的 noneMatch() 方法是一个终端操作，它会遍历流中的元素，并根据流中是否有元素与传递给 noneMatch() 方法的 Predicate 匹配来返回 true 或 false。如果 Predicate 没有匹配到任何元素，noneMatch() 方法将返回 true；如果有一个或多个元素匹配，则返回 false。以下是一个 Java Stream noneMatch() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

boolean noneMatch = stream.noneMatch((element) -> {
    return "xyz".equals(element);
});

System.out.println("noneMatch = " + noneMatch);
```

答案是 true。

### collect()

Java Stream 的 collect() 方法是一个终端操作，它开始元素的内部迭代，并将流中的元素收集到某种类型的集合或对象中。下面是一个简单的 Java Stream collect() 方法示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

List<String> stringsAsUppercaseList = stream
.map(value -> value.toUpperCase())
.collect(Collectors.toList());

System.out.println(stringsAsUppercaseList);
```

collect() 方法接受一个 Collector（java.util.stream.Collector）作为参数。实现一个 Collector 需要对 Collector 接口进行一些研究。幸运的是，Java 类 java.util.stream.Collectors 包含了一组预先实现的 Collector实 现，你可以使用它们进行最常见的操作。在上面的示例中，使用的是 Collectors.toList() 返回的 Collector 实现。这个 Collector 简单地将流中的所有元素收集到一个标准的 Java List 中。

### count()

Java Stream 的 count() 方法是一个终端操作，它开始对流中元素进行内部迭代，并计算元素的数量。下面是一个 Java Stream count() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

long count = stream.flatMap((value) -> {
    String[] split = value.split(" ");
    return (Stream<String>) Arrays.asList(split).stream();
})
.count();

System.out.println("count = " + count);
```

这个例子首先创建了一个字符串列表，然后获取该列表的 Stream，对其添加了一个 flatMap() 操作，最后调用 count() 方法结束。count() 方法将开始对流中元素进行迭代，这将导致字符串元素在 flatMap() 操作中被拆分成单词，并进行计数。最终将打印出的结果是14。

### findAny()

Java Stream 的 findAny() 方法可以从 Stream 中找到一个元素。找到的元素可以来自 Stream 中的任何位置。没有关于元素是从Stream 中的哪个位置获取的保证。下面是一个 Java Stream findAny() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

Optional<String> anyElement = stream.findAny();

System.out.println(anyElement.get());
```

请注意，findAny() 方法返回的是一个 Optional。Stream 可能是空的——因此可能无法返回任何元素。你可以通过 Optional 的 isPresent() 方法来检查是否找到了元素。

### findFirst()

Java Stream 的 findFirst() 方法用于在 Stream 中找到第一个元素（如果 Stream 中存在任何元素）。findFirst() 方法返回一个 Optional，你可以从中获取元素（如果存在）。下面是一个 Java Stream findFirst() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

Optional<String> result = stream.findFirst();

System.out.println(result.get());
```

你可以通过 isPresent() 方法来检查返回的 Optional 是否包含元素。

### forEach()

Java Stream 的 forEach() 方法是一个终端操作，它开始对流中元素进行迭代，并将一个 Consumer（java.util.function.Consumer）应用于流中的每个元素。forEach() 方法返回 void。下面是一个 Java Stream forEach() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

stream.forEach( element -> { System.out.println(element); });
```

### min()

Java Stream 的 min() 方法是一个终端操作，它返回流中的最小元素。哪个元素是最小的，取决于你传递给 min() 方法的 Comparator 实现。在关于 Java 集合排序的教程中，我已经解释了 Comparator 接口的工作原理。下面是一个 Java Stream min() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

Optional<String> min = stream.min((val1, val2) -> {
    return val1.compareTo(val2);
});

String minString = min.get();

System.out.println(minString);
```

请注意，min() 方法返回一个 Optional，它可能包含结果，也可能不包含。如果 Stream 为空，那么调用 Optional 的 get() 方法会抛出 NoSuchElementException。

### max()

Java Stream 的 max() 方法是一个终端操作，它返回流中的最大元素。哪个元素是最大的，取决于你传递给 max() 方法的 Comparator 实现。下面是一个 Java Stream max() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

Optional<String> max = stream.max((val1, val2) -> {
    return val1.compareTo(val2);
});

String maxString = max.get();

System.out.println(maxString);
```

请注意，max() 方法返回一个 Optional，它可能包含结果，也可能不包含。如果 Stream 为空，那么调用 Optional 的 get() 方法会抛出 NoSuchElementException。

### reduce()

Java Stream 的 reduce( )方法是一个终端操作，它可以将流中的所有元素缩减成一个元素。下面是一个 Java Stream reduce() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

Optional<String> reduced = stream.reduce((value, combinedValue) -> {
    return combinedValue + " + " + value;
});

System.out.println(reduced.get());
```

请注意reduce() 方法返回的 Optional。这个 Optional 包含了传递给 reduce() 方法的 lambda 表达式返回的值（如果有的话）。你可以通过调用 Optional 的 get() 方法来获取这个值。

### toArray()

Java Stream 的 toArray() 方法是一个终端操作，它开始对流中元素进行迭代，并返回一个包含所有元素的 Object 数组。下面是一个 Java Stream toArray() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

Object[] objects = stream.toArray();
```

# 合并流

Java Stream 接口包含一个名为 concat() 的静态方法，它可以将两个流合并为一个流。结果是一个新的 Stream，它包含第一个流中的所有元素，后跟第二个流中的所有元素。以下是使用 Java Stream concat() 方法的示例：

```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream1 = stringList.stream();

List<String> stringList2 = new ArrayList<>();
stringList2.add("Lord of the Rings");
stringList2.add("Planet of the Rats");
stringList2.add("Phantom Menace");

Stream<String> stream2 = stringList2.stream();

Stream<String> concatStream = Stream.concat(stream1, stream2);

List<String> stringsAsUppercaseList = concatStream
        .collect(Collectors.toList());

System.out.println(stringsAsUppercaseList);
```

# 从数组创建流

Java Stream 接口包含一个名为 of() 的静态方法，该方法可用于从一个或多个对象创建 Stream。下面是使用 Java Stream of() 方法的示例：

```java
Stream<String> streamOf = Stream.of("one", "two", "three");
```

