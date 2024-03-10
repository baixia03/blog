---
layoutClass: m-page-layout
outline: [1, 3]
---

sded





# 第 1 章 Spring 起步

## Starter 依赖

问：为什么有些依赖的 artifactId 上带有 starter，有些却没有？

答：starter 依赖本身不包含任何库代码，而是传递性的拉取其他的库。

## @SpringBootApplication 注解

@SpringBootApplication 注解是一个组合注解，其组合了其他的注解：

* @SpringBootConfiguration：将该类声明为配置类，是 @Configuration 注解的特殊形式。
* @EnableAutoConfiguration：启用 Spring Boot 的自动配置。
* @ComponentScan：启用组件扫描。Spring 会自动查找像 @Component、@Service、@Controller 注解声明的其他来，将它们注册为容器中的 bean。

## @SpringBootTest 注解

@SpringBootTest 注解是一个组合注解，告诉 Junit 在启动测试的时候要添加上 Spring Boot 的功能。

## @Controller 注解

让组件扫描将这个类识别为一个组件。

## @GetMapping 注解

表明该方法是用来处理 HTTP GET 请求。

## Spring Boot DevTools

问：Spring Boot DevTools 是啥？

答：Spring Boot DevTools 为 Spring 开发人员提供了一些便利的开发期工具和特性。其中包括：

1. 代码变更后应用自动重启。
2. 浏览器自动刷新和禁用模板缓存。
3. 内置 H2 数据库控制台。地址栏末尾加上 h2-console 即可访问。

<br>

# 第 2 章 开发 Web 应用

## Lombok

### 添加依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
<!-- 运行期排除 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 常用注解

| 注解名称 | 注解含义                                                     |
| -------- | ------------------------------------------------------------ |
| @Data    | 在编译期间自动生成所有缺失的 JavaBean 的基本方法，同时生成所有以 final 属性为参数的构造器。 |
| @Slf4j   | 在编译器为类自动生成一个 SLF4J Logger 静态属性。             |

## @RequestMapping 注解

当 @RequestMapping 注解用到类级别的时候，它能够指定该控制器所处理的请求类型。

## @SessionAttributes 注解

@SessionAttributes 注解只能使用在类上，可以将指定的模型中的数据暂存到 HttpSession 中，使得多个请求之间可以共享数据。

## @ModelAttribute 注解

@ModelAttribute 注解用到控制器类的方法上或者方法的参数上。

方法上：当前 controller 类里的每个方法执行前该方法都会被执行。将该方法的返回值放入到模型中（一般是公用对象），可以通过 name 属性指定放入对象名称。

方法的参数上：方法接收一个模型中的对象，可以为其赋值。

## @PostMapping 注解

表明该方法是用来处理 HTTP POST 请求。

## Converter 接口

Spring 提供的 Converter 接口，重写 convert 方法可以实现一个转换器。

## 清理会话

当通过 @SessionAttributes 注解将指定模型中的数据暂存到 HttpSession 中后，如果想要清理 session，可以通过在控制器方法的参数上传入一个 SessionStatus 的对象，调用其 setComplete 方法。

## Spring Validation

### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

Spring Validation Starter 依赖在早期的 Spring Boot 版本中会被自动包含进 Web Starter，在 Spring Boot 2.3 版本开始后需要显示添入。

### 常用注解

| 注解名称          | 注解含义                                                 |
| ----------------- | -------------------------------------------------------- |
| @NotNul           | 非null验证。                                             |
| @Size             | 指定区间大小验证。                                       |
| @NotBlank         | 空白字段验证。                                           |
| @CreditCardNumber | 信用卡号格式验证。                                       |
| @Pattern          | 正则表达式验证。                                         |
| @Digits           | 整数位数和小数位数上限验证。                             |
| @Valid            | 声明在方法的参数上，告诉 Spring MVC 要对该对象进行验证。 |

## 视图控制器

如果一个请求非常简单，不需要为其添加模型或者处理数据，那么可以声明视图控制器。

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("home");
    }
}
```

<br>

# 第 3 章 使用数据

## JdbcTemplate

### 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```



