---
outline: [1, 4]
---


# SQL
全称 Structured Query Language，结构化查询语言。操作关系型数据库的编程语言，定义了
一套操作关系型数据库统一标准。




## SQL 通用语法

1. SQL语句可以单行或多行书写，以分号结尾。

2. SQL语句可以使用空格/缩进来增强语句的可读性。

3. MySQL数据库的SQL语句不区分大小写，关键字建议使用大写。

4. 注释：

   * 单行注释：-- 注释内容 或 # 注释内容

   * 多行注释：/* 注释内容 */



## SQL分类

SQL语句，根据其功能，主要分为四类：DDL、DML、DQL、DCL。

| 分类 | 全程                       | 说明                                                    |
| ---- | -------------------------- | ------------------------------------------------------- |
| DDL  | Data Definition Language   | 数据定义语言，用来定义数据库对象(数据库，表， 字段)     |
| DML  | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改          |
| DQL  | Data Query Language 数     | 数据查询语言，用来查询数据库中表的记录                  |
| DCL  | Data Control Language      | 数据控制语言，用来创建数据库用户、控制数据库的 访问权限 |



## DDL

Data Definition Language，数据定义语言，用来定义数据库对象(数据库，表，字段) 。

### 数据库操作

1. 查询所有数据库

   ```sql
   show databases;
   ```

2.  查询当前数据库

   ```sql
   select database();
   ```

3. 创建数据库

   ```sql
   create database [if not exists] 数据库名 [default charset 字符集] [collate 排序
   规则] ;
   ```

4. 删除数据库

   ```sql
   drop database [if exists] 数据库名;
   ```

5. 切换数据库

   ```sql
   use 数据库名;
   ```



### 表操作

<br>

#### 查询创建

1. 查询当前数据库所有表

   ```sql
   show tables;
   ```

   比如,我们可以切换到 sys 这个系统数据库,并查看系统数据库中的所有表结构。

   ```sql
   use sys;
   show tables;
   ```

2. 查看指定表结构

   ```sql
   desc 表名;
   ```

   通过这条指令，我们可以查看到指定表的字段，字段的类型、是否可以为NULL，是否存在默认值等信息。

3. 查询指定表的建表语句

   ```sql
   show create table 表名;
   ```

   通过这条指令，主要是用来查看建表语句的，而有部分参数我们在创建表的时候，并未指定也会查询 到，因为这部分是数据库的默认值，如：存储引擎、字符集等。

4. 创建表结构

   ```sql
   CREATE TABLE 表名(
   字段1 字段1类型 [ COMMENT 字段1注释 ],
   字段2 字段2类型 [COMMENT 字段2注释 ],
   字段3 字段3类型 [COMMENT 字段3注释 ],
   ......
   字段n 字段n类型 [COMMENT 字段n注释 ]
   ) [ COMMENT 表注释 ] ;
   ```



#### 数据类型

MySQL中的数据类型有很多，主要分为三类：数值类型、字符串类型、日期时间类型。

1. 数值类型

   | 类型        | 大小   | 有符号(SIGNED)范围                                     | 无符号(UNSIGNED)范围                                       | 描述                  |
   | ----------- | ------ | ------------------------------------------------------ | ---------------------------------------------------------- | --------------------- |
   | TINYINT     | 1byte  | (-128，127)                                            | (0，255)                                                   | 小整 数值             |
   | SMALLINT    | 2bytes | (-32768，32767)                                        | (0，65535)                                                 | 大整 数值             |
   | MEDIUMINT   | 3bytes | (-8388608，8388607)                                    | (0，16777215)                                              | 大整 数值             |
   | INT/INTEGER | 4bytes | (-2147483648， 2147483647)                             | (0，4294967295)                                            | 大整 数值             |
   | BIGINT      | 8bytes | (-2^63，2^63-1)                                        | (0，2^64-1)                                                | 极大 整数 值          |
   | FLOAT       | 4bytes | (-3.402823466 E+38， 3.402823466351 E+38)              | 0 和 (1.175494351 E38，3.402823466 E+38)                   | 单精 度浮 点数 值     |
   | DOUBLE      | 8bytes | (-1.7976931348623157 E+308， 1.7976931348623157 E+308) | 0 和 (2.2250738585072014 E-308， 1.7976931348623157 E+308) | 双精 度浮 点数 值     |
   | DECIMAL     |        | 依赖于M(精度)和D(标度) 的值                            | 依赖于M(精度)和D(标度)的 值                                | 小数 值(精 确定 点数) |

2. 字符串类型

   | 类型       | 大小                  | 描述                         |
   | ---------- | --------------------- | ---------------------------- |
   | CHAR       | 0-255 bytes           | 定长字符串(需要指定长度)     |
   | VARCHAR    | 0-65535 bytes         | 变长字符串(需要指定长度)     |
   | TINYBLOB   | 0-255 bytes           | 不超过255个字符的二进制数据  |
   | TINYTEXT   | 0-255 bytes           | 短文本字符串                 |
   | BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据       |
   | TEXT       | 0-65 535 bytes        | 长文本数据                   |
   | MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据 |
   | MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据             |
   | LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据     |
   | LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                 |

   char 与 varchar 都可以描述字符串，char 是定长字符串，指定长度多长，就占用多少个字符，和 字段值的长度无关 。而 varchar 是变长字符串，指定的长度为最大占用长度 。相对来说，char的性 能会更高些。

3. 日期时间类型

   | 类型      | 大 小 | 范围                                       | 格式                | 描述                     |
   | --------- | ----- | ------------------------------------------ | ------------------- | ------------------------ |
   | DATE      | 3     | 1000-01-01 至 9999-12-31                   | YYYY-MM-DD          | 日期值                   |
   | TIME      | 3     | -838:59:59 至 838:59:59                    | HH:MM:SS            | 时间值或持续时间         |
   | YEAR      | 1     | 1901 至 2155                               | YYYY                | 年份值                   |
   | DATETIME  | 8     | 1000-01-01 00:00:00 至 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
   | TIMESTAMP | 4     | 1970-01-01 00:00:01 至 2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值，时间戳 |

   

#### 修改

1. 添加字段

   ```sql
   ALTER TABLE 表名 ADD 字段名 类型 (长度) [COMMENT 注释] [约束];
   ```

   为 emp 表增加一个新的字段 ”昵称” 为 nickname，类型为 varchar(20)：

   ```sql
   ALTER TABLE emp ADD nickname varchar(20) COMMENT '昵称';
   ```

2. 修改数据类型

   ```sql
   ALTER TABLE 表名 MODIFY 字段名 新数据类型 (长度);
   ```

3. 修改字段名和字段类型

   ```sql
   ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型 (长度) [COMMENT 注释] [约束];
   ```

   将 emp 表的 nickname 字段修改为 username，类型为 varchar(30)：

   ```sql
   ALTER TABLE emp CHANGE nickname username varchar(30) COMMENT '昵称';
   ```

4. 删除字段

   ```sql
   ALTER TABLE 表名 DROP 字段名;
   ```

   将 emp 表的字段 username 删除：

   ```sql
   ALTER TABLE emp DROP username;
   ```

5. 修改表名

   ```sql
   ALTER TABLE 表名 RENAME TO 新表名;
   ```

#### 删除

1. 删除表

   ```sql
   DROP TABLE [IF EXISTS] 表名;
   ```

2. 删除指定表, 并重新创建表

   ```sql
   TRUNCATE TABLE 表名;
   ```



## DML

DML 英文全称是 Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进 行增、删、改操作。

* 添加数据（INSERT） 
* 修改数据（UPDATE） 
* 删除数据（DELETE）



### 添加数据

1.  给指定字段添加数据

   ```sql
   INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);
   ```

2. 给全部字段添加数据

   ```sql
   INSERT INTO 表名 VALUES (值1, 值2, ...);
   ```

3. 批量添加数据

   ```sql
   INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...) ;
   ```

   

### 修改数据

修改数据的具体语法为:

```sql
UPDATE 表名 SET 字段名1 = 值1, 字段名2 = 值2 , .... [WHERE 条件];
```



### 删除数据

删除数据的具体语法为：

```sql
DELETE FROM 表名 [WHERE 条件];
```



## DQL

DQL 英文全称是 Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中表的记 录。

查询关键字: SELECT



### 基本语法

DQL 查询语句，语法结构如下：

```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
```



### 基础查询

在基本查询的 DQL 语句中，不带任何的查询条件，查询的语法如下：

1. 查询多个字段

   ```sql
   SELECT 字段1, 字段2, 字段3 ... FROM 表名;
   SELECT * FROM 表名 ;
   ```

2. 字段设置别名

   ```sql
   SELECT 字段1 [AS 别名1] , 字段2 [AS 别名2] ... FROM 表名
   SELECT 字段1 [别名1] , 字段2 [别名2] ... FROM 表名;
   ```

3. 去除重复记录

   ```sql
   SELECT DISTINCT 字段列表 FROM 表名;
   ```



### 条件查询

1. 语法

   ```sql
   SELECT 字段列表 FROM 表名 WHERE 条件列表;
   ```

2. 条件

   常用的比较运算符如下：

   | 比较运算符          | 功能                                        |
   | ------------------- | ------------------------------------------- |
   | \>                  | 大于                                        |
   | \>=                 | 大于等于                                    |
   | <                   | 小于                                        |
   | <=                  | 小于等于                                    |
   | <> 或 !=            | 不等于                                      |
   | BETWEEN ... AND ... | 在某个范围之内(含最小、最大值)              |
   | IN(...)             | 在 in 之后的列表中的值，多选一              |
   | LIKE 占位符         | 模糊匹配( _ 匹配单个字符, % 匹配任意个字符) |
   | IS NULL             | 是 NULL                                     |

   常用的逻辑运算符如下：

   | 逻辑运算符 | 功能                        |
   | ---------- | --------------------------- |
   | AND 或 &&  | 并且 (多个条件同时成立)     |
   | OR 或      | 或者 (多个条件任意一个成立) |
   | NOT 或 !   | 非 , 不是                   |

   

### 聚合函数

1. 介绍

   将一列数据作为一个整体，进行纵向计算。

2. 常见的聚合函数

   | 函数  | 功能     |
   | ----- | -------- |
   | count | 统计数量 |
   | max   | 最大值   |
   | min   | 最小值   |
   | avg   | 平均值   |
   | sum   | 求和     |

3. 语法

   ```sql
   SELECT 聚合函数(字段列表) FROM 表名 ;
   ```

> 注意 : NULL 值是不参与所有聚合函数运算的。



### 分组查询

1. 语法

   ```sql
   SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组
   后过滤条件];
   ```

2. where 与 having 区别

   * 执行时机不同：where 是分组之前进行过滤，不满足 where 条件，不参与分组；而having 是分组 之后对结果进行过滤。 

   * 判断条件不同：where 不能对聚合函数进行判断，而 having 可以。

   >注意事项: 
   >
   >* 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义。 
   >* 执行顺序: where > 聚合函数 > having 。
   >* 支持多字段分组, 具体语法为 : group by columnA, columnB

案例：

```sql
# 根据性别分组 , 统计男性员工 和 女性员工的数量
select gender, count(*) from emp group by gender;

# 根据性别分组 , 统计男性员工 和 女性员工的平均年龄
select gender, avg(age) from emp group by gender;

# 查询年龄小于45的员工 , 并根据工作地址分组 , 获取员工数量大于等于3的工作地址
select workaddress, count(*) address_count from emp where age < 45 group by workaddress having address_count >= 3;

# 统计各个工作地址上班的男性及女性员工的数量
select workaddress, gender, count(*) '数量' from emp group by gender, workaddress;
```



### 排序查询

排序在日常开发中是非常常见的一个操作，有升序排序，也有降序排序。

1. 语法

   ```sql
   SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1 , 字段2 排序方式2;
   ```

2. 排序方式

   * ASC : 升序(默认值)
   * DESC: 降序

   > 注意事项： 
   >
   > * 如果是升序, 可以不指定排序方式ASC ; 
   > * 如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序 ;

案例：

```sql
# 根据年龄对公司的员工进行升序排序
select * from emp order by age asc;
select * from emp order by age;

#  根据入职时间, 对员工进行降序排序
select * from emp order by entrydate desc;

# 根据年龄对公司的员工进行升序排序，年龄相同，再按照入职时间进行降序排序
select * from emp order by age asc , entrydate desc;
```



### 分页查询

分页操作在业务系统开发时，也是非常常见的一个功能，我们在网站中看到的各种各样的分页条，后台都需要借助于数据库的分页操作。

1. 语法

   ```sql
   SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;
   ```

   > 注意事项: 
   >
   > * 起始索引从0开始，起始索引 = （查询页码 - 1）* 每页显示记录数。
   > * 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是LIMIT。
   > * 如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 10。

案例：

```sql
# 查询第1页员工数据, 每页展示10条记录
select * from emp limit 0,10;
select * from emp limit 10;

# 查询第2页员工数据, 每页展示10条记录
select * from emp limit 10,10;
```



### 案例

1. 查询年龄为 20,21,22,23 岁的员工信息。

   ```sql
   select * from emp where gender = '女' and age in(20,21,22,23);
   ```

2. 查询性别为男 ，并且年龄在 20-40 岁(含)以内的姓名为三个字的员工。

   ```sql
   select * from emp where gender = '男' and ( age between 20 and 40 ) and name like '___';
   ```

3.  统计员工表中, 年龄小于60岁的 , 男性员工和女性员工的人数。

   ```sql
   select gender, count(*) from emp where age < 60 group by gender;
   ```

4. 查询所有年龄小于等于35岁员工的姓名和年龄，并对查询结果按年龄升序排序，如果年龄相同按 入职时间降序排序。

   ```sql
   select name, age from emp where age <= 35 order by age asc, entrydate desc;
   ```

5. 查询性别为男，且年龄在20-40 岁(含)以内的前5个员工信息，对查询的结果按年龄升序排序， 年龄相同按入职时间升序排序。

   ```sql
   select * from emp where gender = '男' and age between 20 and 40 order by age asc, entrydate asc limit 5;
   ```



### 执行顺序

编写顺序：

```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
```

执行顺序：

```sql
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
SELECT
	字段列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
```



## DCL

DCL 英文全称是 Data Control Language（数据控制语言），用来管理数据库用户、控制数据库的访 问权限。

###  管理用户

1. 查询用户

   ```sql
   select * from mysql.user;
   ```

   查询结果中，Host 代表当前用户访问的主机，如果为 localhost, 仅代表只能够在当前本机访问，是不可以远程访问的。User 代表的是访问该数据库的用户名。在 MySQL 中需要通过 Host 和 User 来唯一标识一 个用户。

2. 创建用户

   ```sql
   CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
   ```

3. 修改用户密码

   ```sql
   ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';
   ```

4. 删除用户

   ```sql
   DROP USER '用户名'@'主机名';
   ```

> 注意事项：
>
> * 在MySQL中需要通过用户名@主机名的方式，来唯一标识一个用户。
> * 主机名可以使用 % 通配。 
> * 这类 SQL 开发人员操作的比较少，主要是DBA（ Database Administrator 数据库 管理员）使用。

案例：

* 创建用户itcast, 只能够在当前主机localhost访问, 密码123456;

  ```sql
  create user 'itcast'@'localhost' identified by '123456';
  ```

*  创建用户heima, 可以在任意主机访问该数据库, 密码123456;

  ```sql
  create user 'heima'@'%' identified by '123456';
  ```

* 修改用户heima的访问密码为1234;

  ```sql
  alter user 'heima'@'%' identified with mysql_native_password by '1234';
  ```

* 删除 itcast@localhost 用户

  ```sql
  drop user 'itcast'@'localhost';
  ```



### 权限控制

MySQL 中定义了很多种权限，但是常用的就以下几种：

| 权限                | 说明               |
| ------------------- | ------------------ |
| ALL, ALL PRIVILEGES | 所有权限           |
| SELECT              | 查询数据           |
| INSERT              | 插入数据           |
| UPDATE              | 修改数据           |
| DELETE              | 删除数据           |
| ALTER               | 修改表             |
| DROP                | 删除数据库/表/视图 |
| CREATE              | 创建数据库/表      |

上述只是简单罗列了常见的几种权限描述，其他权限描述及含义，可以直接参考https://dev.mysql.com/doc/refman/8.0/en/privileges-provided.html 。

1. 查询权限

   ```sql
   SHOW GRANTS FOR '用户名'@'主机名';
   ```

2. 授予权限

   ```sql
   GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
   ```

3. 撤销权限

   ```sql
   REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
   ```

> 注意事项： 
>
> * 多个权限之间，使用逗号分隔。
> * 授权时，数据库名和表名可以使用 * 进行通配，代表所有。

案例：

* 查询 'heima'@'%' 用户的权限

  ```sql
  show grants for 'heima'@'%';
  ```

* 授予 'heima'@'%' 用户 itcast 数据库所有表的所有操作权限

  ```sql
  grant all on itcast.* to 'heima'@'%';
  ```

* 撤销 'heima'@'%' 用户的itcast数据库的所有权限

  ```sql
  revoke all on itcast.* from 'heima'@'%';
  ```

<br>

# 函数

**函数** 是指一段可以直接被另一段程序调用的程序或代码。 也就意味着，这一段程序或代码在MySQL中 已经给我们提供了，我们要做的就是在合适的业务场景调用对应的函数完成对应的业务需求即可。

MySQL 中的函数主要分为以下四类： **字符串函数**、**数值函数**、**日期函数**、**流程函数**。

MySQL 中内置了很多字符串函数，常用的几个如下：

| 函数                     | 功能                                                         |
| ------------------------ | ------------------------------------------------------------ |
| CONCAT(S1,S2,...Sn)      | 字符串拼接，将 S1，S2，... Sn 拼接成一个字符串               |
| LOWER(str)               | 将字符串 str 全部转为小写                                    |
| UPPER(str)               | 将字符串 str 全部转为大写                                    |
| LPAD(str,n,pad)          | 左填充，用字符串 pad 对 str 的左边进行填充，达到 n 个字符 串长度 |
| RPAD(str,n,pad)          | 右填充，用字符串 pad 对 str 的右边进行填充，达到 n 个字符 串长度 |
| TRIM(str)                | 去掉字符串头部和尾部的空格                                   |
| SUBSTRING(str,start,len) | 返回从字符串 str 从 start 位置起的 len 个长度的字符串        |

案例：

由于业务需求变更，需要将企业员工的工号，统一为 5 位数，目前不足 5 位数的全部在前面补 0。比如：1号员 工的工号应该为00001。

```sql
update emp set workno = lpad(workno, 5, '0');
```



## 数值函数

常见的数值函数如下：

| 函数       | 功能                                   |
| ---------- | -------------------------------------- |
| CEIL(x)    | 向上取整                               |
| FLOOR(x)   | 向下取整                               |
| MOD(x,y)   | 返回 x/y 的模                          |
| RAND()     | 返回 0~1 内的随机数                    |
| ROUND(x,y) | 求参数 x 的四舍五入的值，保留 y 位小数 |

示例：

*  ceil：向上取整

  ```sql
  select ceil(1.1);
  ```

*  floor：向下取整

  ```sql
  select floor(1.9);
  ```

*  mod：取模

  ```sql
  select mod(7,4)
  ```

* rand：获取随机数

  ```sql
  select rand();
  ```

* round：四舍五入

  ```sql
  select round(2.344,2);
  ```

案例： 

通过数据库的函数，生成一个六位数的随机验证码。 思路： 获取随机数可以通过 rand() 函数，但是获取出来的随机数是在 0-1 之间的，所以可以在其基础上乘以 1000000，然后舍弃小数部分，如果长度不足 6 位，补 0

```sql
select lpad(round(rand()*1000000 , 0), 6, '0');
```



## 日期函数

常见的日期函数如下：

| 函数                               | 功能                                                |
| ---------------------------------- | --------------------------------------------------- |
| CURDATE()                          | 返回当前日期                                        |
| CURTIME()                          | 返回当前时间                                        |
| NOW()                              | 返回当前日期和时间                                  |
| YEAR(date)                         | 获取指定date的年份                                  |
| MONTH(date)                        | 获取指定date的月份                                  |
| DAY(date)                          | 获取指定date的日期                                  |
| DATE_ADD(date, INTERVAL expr type) | 返回一个日期/时间值加上一个时间间隔 expr 后的时间值 |
| DATEDIFF(date1,date2)              | 返回起始时间 date1 和结束时间 date2 之间的天数      |

示例：

*  curdate：当前日期

  ```sql
  select curdate()
  ```

* curtime：当前时间

  ```sql
  select curtime();
  ```

*  now：当前日期和时间

  ```sql
  select now();
  ```

* YEAR , MONTH , DAY：当前年、月、日

  ```sql
  select YEAR(now());
  select MONTH(now());
  select DAY(now());
  ```

*  date_add：增加指定的时间间隔

  ```sql
  select date_add(now(), INTERVAL 70 YEAR);
  ```

* datediff：获取两个日期相差的天数

  ```sql
  select datediff('2021-10-01', '2021-12-01');
  ```

案例：

查询所有员工的入职天数，并根据入职天数倒序排序。思路：入职天数，就是通过当前日期 - 入职日期，所以需要使用 datediff 函数来完成。

```sql
select name, datediff(curdate(), entrydate) as 'entrydays' from emp order by
entrydays desc;
```



## 流程函数

流程函数也是很常用的一类函数，可以在SQL语句中实现条件筛选，从而提高语句的效率。

| 函数                                                         | 功能                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| IF(value , t , f)                                            | 如果 value 为 true，则返回 t，否则返回 f                     |
| IFNULL(value1 , value2)                                      | 如果 value1 不为空，返回 value1，否则返回 value2             |
| CASE WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END      | 如果 val1 为 true，返回 res1，... 否则返回 default 默认值    |
| CASE [ expr ] WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END | 如果 expr 的值等于 val1，返回 res1，... 否则返回 default 默认值 |

示例：

* if

  ```sql
  select if(false, 'Ok', 'Error');
  ```

* ifnull

  ```sql
  select ifnull('Ok','Default');
  select ifnull('','Default');
  select ifnull(null,'Default');
  ```

* case when then else end

  需求: 查询emp表的员工姓名和工作地址 (北京/上海 ----> 一线城市 , 其他 ----> 二线城市)

  ```sql
  select name,
  (case workaddress when '北京' then '一线城市' when '上海' then '一线城市' else
  '二线城市' end) as '工作地址'
  from emp;
  ```

案例：

```sql
create table score(
	id int comment 'ID',
	name varchar(20) comment '姓名',
	math int comment '数学',
	english int comment '英语',
	chinese int comment '语文'
) comment '学员成绩表';

insert into score(id, name, math, english, chinese) VALUES (1, 'Tom', 67, 88, 95
), (2, 'Rose' , 23, 66, 90),(3, 'Jack', 56, 98, 76);
```

```sql
select id, name,
(case when math >= 85 then '优秀' when math >=60 then '及格' else '不及格' end )
'数学',
(case when english >= 85 then '优秀' when english >=60 then '及格' else '不及格'
end ) '英语',
(case when chinese >= 85 then '优秀' when chinese >=60 then '及格' else '不及格'
end ) '语文'
from score;
```

<br>

# 约束

## 概述

概念：约束是作用于表中字段上的规则，用于限制存储在表中的数据。 

目的：保证数据库中数据的正确、有效性和完整性。

分类：

| 约束                      | 描述                                                     | 关键字      |
| ------------------------- | -------------------------------------------------------- | ----------- |
| 非空约束                  | 限制该字段的数据不能为 null                              | NOT NULL    |
| 唯一约束                  | 保证该字段的所有数据都是唯一、不重复的                   | UNIQUE      |
| 主键约束                  | 主键是一行数据的唯一标识，要求非空且唯一                 | PRIMARY KEY |
| 默认约束                  | 保存数据时，如果未指定该字段的值，则采用默认值           | DEFAULT     |
| 检查约束(8.0.16版本 之后) | 保证字段值满足某一个条件                                 | CHECK       |
| 外键约束                  | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | FOREIGN KEY |

> 注意：约束是作用于表中字段上的，可以在创建表/修改表的时候添加约束。



## 约束演示

案例需求： 根据需求，完成表结构的创建。需求如下：

| 字段名 | 字段含义    | 字段类型    | 约束条件                  | 约束关键字                  |
| ------ | ----------- | ----------- | ------------------------- | --------------------------- |
| id     | ID 唯一标识 | int         | 主键，并且自动增长        | PRIMARY KEY, AUTO_INCREMENT |
| name   | 姓名        | varchar(10) | 不为空，并且唯一          | NOT NULL , UNIQUE           |
| age    | 年龄        | int         | 大于 0，并且小于等于 120  | CHECK                       |
| status | 状态        | char(1)     | 如果没有指定该值，默认为1 | DEFAULT                     |
| gender | 性别        | char(1)     | 无                        |                             |

对应的建表语句为：

```sql
CREATE TABLE tb_user(
	id int AUTO_INCREMENT PRIMARY KEY COMMENT 'ID唯一标识',
	name varchar(10) NOT NULL UNIQUE COMMENT '姓名' ,
	age int check (age > 0 && age <= 120) COMMENT '年龄' ,
	status char(1) default '1' COMMENT '状态',
	gender char(1) COMMENT '性别'
);
```



## 外键约束

外键：用来让两张表的数据之间建立连接，从而保证数据的一致性和完整性。



### 语法

1.  添加外键

   ```sql
   CREATE TABLE 表名(
   	字段名 数据类型,
   	...
   	[CONSTRAINT] [外键名称] FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名)
   );
   
   ```

   ```sql
   ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名);
   ```

   案例：

   为 emp 表的 dept_id 字段添加外键约束,关联 dept 表的主键 id。

   ```sql
   alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references
   dept(id);
   ```

2. 删除外键

   ```sql
   ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
   ```

   案例：

   删除 emp 表的外键 fk_emp_dept_id：

   ```sql
   alter table emp drop foreign key fk_emp_dept_id;
   ```



### 删除/更新行为

添加了外键之后，再删除父表数据时产生的约束行为，我们就称为**删除/更新行为**。具体的删除/更新行为有以下几种:

| 行为        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| NO ACTION   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。 (与 RESTRICT 一致) 默认行为 |
| RESTRICT    | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。 (与 NO ACTION 一致) 默认行为 |
| CASCADE     | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录。 |
| SET NULL    | 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（这就要求该外键允许取null）。 |
| SET DEFAULT | 父表有变更时，子表将外键列设置成一个默认的值 (Innodb不支持)  |

具体语法为：

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES
主表名 (主表字段名) ON UPDATE CASCADE ON DELETE CASCADE;
```

<br>

# 多表查询

## 多表关系

项目开发中，在进行数据库表结构设计时，会根据业务需求及业务模块之间的关系，分析并设计表结构，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本上分为三种：

* 一对多（多对一）
* 多对多 
* 一对一



### 一对多

* 案例：部门与员工的关系 

* 关系：一个部门对应多个员工，一个员工对应一个部门 
* 实现：在多的一方建立外键，指向一的一方的主键



### 多对多

* 案例：学生与课程的关系 

* 关系：一个学生可以选修多门课程，一门课程也可以供多个学生选择
* 实现：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键

对应的SQL脚本：

```sql
create table student(
	id int auto_increment primary key comment '主键ID',
	name varchar(10) comment '姓名',
	no varchar(10) comment '学号'
) comment '学生表';
insert into student values (null, '黛绮丝', '2000100101'), (null, '谢逊', '2000100102'),(null, '殷天正', '2000100103'),(null, '韦一笑', '2000100104');

create table course(
	id int auto_increment primary key comment '主键ID',
	name varchar(10) comment '课程名称'
) comment '课程表';
insert into course values (null, 'Java'), (null, 'PHP'), (null , 'MySQL') , (null, 'Hadoop');

create table student_course(
	id int auto_increment comment '主键' primary key,
	studentid int not null comment '学生ID',
	courseid int not null comment '课程ID',
	constraint fk_courseid foreign key (courseid) references course (id),
	constraint fk_studentid foreign key (studentid) references student (id)
)comment '学生课程中间表';

insert into student_course values (null,1,1),(null,1,2),(null,1,3),(null,2,2),
(null,2,3),(null,3,4);
```



### 一对一

案例：用户与用户详情的关系 

关系：一对一关系，多用于单表拆分，将一张表的基础字段放在一张表中，其他详情字段放在另 一张表中，以提升操作效率 

实现：在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的（UNIQUE）

对应的SQL脚本：

```sql
create table tb_user(
	id int auto_increment primary key comment '主键ID',
	name varchar(10) comment '姓名',
	age int comment '年龄',
	gender char(1) comment '1: 男 , 2: 女',
	phone char(11) comment '手机号'
) comment '用户基本信息表';
```

```sql
create table tb_user_edu(
	id int auto_increment primary key comment '主键ID',
	degree varchar(20) comment '学历',
	major varchar(50) comment '专业',
	primaryschool varchar(50) comment '小学',
	middleschool varchar(50) comment '中学',
    university varchar(50) comment '大学',
	userid int unique comment '用户ID',
	constraint fk_userid foreign key (userid) references tb_user(id)
) comment '用户教育信息表';
```

```sql
insert into tb_user(id, name, age, gender, phone) values
(null,'黄渤',45,'1','18800001111'),
(null,'冰冰',35,'2','18800002222'),
(null,'码云',55,'1','18800008888'),
(null,'李彦宏',50,'1','18800009999');

insert into tb_user_edu(id, degree, major, primaryschool, middleschool, university, userid) values
(null,'本科','舞蹈','静安区第一小学','静安区第一中学','北京舞蹈学院',1),
(null,'硕士','表演','朝阳区第一小学','朝阳区第一中学','北京电影学院',2),
(null,'本科','英语','杭州市第一小学','杭州市第一中学','杭州师范大学',3),
(null,'本科','应用数学','阳泉第一小学','阳泉区第一中学','清华大学',4);

```



## 多表查询概述

### 概述

多表查询就是指从多张表中查询数据。

原来查询单表数据，执行的SQL形式为：select * from emp。那么我们要执行多表查询，就只需要使用逗号分隔多张表即可，如： select * from emp , dept。这种查询结果中包含了大量的结果集，而这其实就是员工表 emp 所有的记录与部门表 dept 所有记录的所有组合情况，这种现象称之为笛卡尔积。

笛卡尔积：笛卡尔乘积是指在数学中，两个集合 A 集合和 B 集合的所有组合情况。而在多表查询中，我们是需要消除无效的笛卡尔积的，只保留两张表关联部分的数据。在SQL语句中，如何来去除无效的笛卡尔积呢？我们可以给多表查询加上连接查询的条件即可。

```sql
select * from emp , dept where emp.dept_id = dept.id
```



### 分类

* 连接查询
* 内连接：相当于查询 A、B 交集部分数据。
* 外连接
  * 左外连接：查询左表所有数据，以及两张表交集部分数据 
  * 右外连接：查询右表所有数据，以及两张表交集部分数据 
* 自连接：当前表与自身的连接查询，自连接必须使用表别名



## 内连接

内连接查询的是两张表交集部分的数据。

内连接的语法分为两种: 隐式内连接、显式内连接。先来学习一下具体的语法结构。

1. 隐式内连接

   ```sql
   SELECT 字段列表 FROM 表1 , 表2 WHERE 条件 ... ;
   ```

2. 显式内连接

   ```sql
   SELECT 字段列表 FROM 表1 [ INNER ] JOIN 表2 ON 连接条件 ... ;
   ```

案例：

* 查询每一个员工的姓名，及关联的部门的名称（隐式内连接实现）

  表结构：emp , dept 

  连接条件: emp.dept_id = dept.id

  ```sql
  select emp.name, dept.name from emp, dept where emp.dept_id = dept.id ;
  ```

*  查询每一个员工的姓名，及关联的部门的名称（显式内连接实现）

  表结构：emp , dept

  连接条件：emp.dept_id = dept.id

  ```sql
  select e.name, d.name from emp e inner join dept d on e.dept_id = d.id;
  ```



## 外连接

外连接分为两种，分别是：左外连接和右外连接。具体的语法结构为：

1. 左外连接

   ```sql
   SELECT 字段列表 FROM 表1 LEFT [ OUTER ] JOIN 表2 ON 条件 ... ;
   ```

   左外连接相当于查询表 1 (左表) 的所有数据，当然也包含表 1 和表 2 交集部分的数据。

2. 右外连接

   ```
   SELECT 字段列表 FROM 表1 RIGHT [ OUTER ] JOIN 表2 ON 条件 ... ;
   ```

   右外连接相当于查询表 2 (右表)的所有数据，当然也包含表 1 和表 2 交集部分的数据。

> 注意事项： 左外连接和右外连接是可以相互替换的，只需要调整在连接查询时 SQL 中，表结构的先后顺序就可以了。而我们在日常开发使用时，更偏向于左外连接。



## 自连接

### 自连接查询

自连接查询，顾名思义，就是自己连接自己，也就是把一张表连接查询多次。

自连接的查询语法：

```sql
SELECT 字段列表 FROM 表A 别名A JOIN 表A 别名B ON 条件 ... ;
```

而对于自连接查询，可以是内连接查询，也可以是外连接查询。

案例：

* 查询员工及其所属领导的名字

  表结构: emp

  ```sql
  select a.name, b.name from emp a, emp b where a.managerid = b.id;
  ```

* 查询所有员工 emp 及其领导的名字 emp , 如果员工没有领导, 也需要查询出来

  表结构：emp a , emp b

  ```sql
  select a.name '员工', b.name '领导' from emp a left join emp b on a.managerid = b.id;
  ```

> 注意事项: 在自连接查询中，必须要为表起别名，要不然我们不清楚所指定的条件、返回的字段，到底 是哪一张表的字段。



###  联合查询

对于 union 查询，就是把多次查询的结果合并起来，形成一个新的查询结果集。

```sql
SELECT 字段列表 FROM 表A ...
UNION [ ALL ]
SELECT 字段列表 FROM 表B ....;
```

* 对于联合查询的多张表的列数必须保持一致，字段类型也需要保持一致。 
* union all 会将全部的数据直接合并在一起，union 会对合并之后的数据去重。

案例：

* 将薪资低于 5000 的员工 , 和 年龄大于 50 岁的员工全部查询出来

  ```sql
  select * from emp where salary < 5000
  union
  select * from emp where age > 50;
  ```

> 注意： 如果多条查询语句查询出来的结果，字段数量不一致，在进行 union/union all 联合查询时，将会报 错。



## 子查询

### 概述

1. 概念

   SQL 语句中嵌套 SELECT 语句，称为嵌套查询，又称子查询。

   ```sql
   SELECT * FROM t1 WHERE column1 = (SELECT column1 FROM t2);
   ```

   子查询外部的语句可以是 INSERT / UPDATE / DELETE / SELECT 的任何一个。

2. 分类

   根据子查询结果不同，分为：

   * 标量子查询（子查询结果为单个值）
   * 列子查询（子查询结果为一列）
   * 行子查询（子查询结果为一行）
   * 表子查询（子查询结果为多行多列）

   根据子查询位置，分为： 

   * WHERE之后 
   * FROM之后 
   * SELECT之后



### 标量子查询

子查询返回的结果是单个值（数字、字符串、日期等），最简单的形式，这种子查询称为标量子查询。常用的操作符：=	<>	>	>=	<	<= 

案例：

1. 查询 "销售部" 的所有员工信息

   完成这个需求时，我们可以将需求分解为两步：

   ①. 查询 "销售部" 部门ID

   ```sql
   select id from dept where name = '销售部';
   ```

   ②. 根据 "销售部" 部门ID, 查询员工信息

   ```sql
   select * from emp where dept_id = (select id from dept where name = '销售部');
   ```

2. 查询在 "方东白" 入职之后的员工信息

   完成这个需求时，我们可以将需求分解为两步：

   ①.  查询 方东白 的入职日期

   ```sql
   select entrydate from emp where name = '方东白';
   ```

   ②. 查询指定入职日期之后入职的员工信息

   ```sql
   select * from emp where entrydate > (select entrydate from emp where name = '方东
   白');
   ```



### 列子查询

子查询返回的结果是一列（可以是多行），这种子查询称为列子查询。

常用的操作符：IN 、NOT IN 、 ANY 、SOME 、 ALL

| 操作符 | 描述                                   |
| ------ | -------------------------------------- |
| IN     | 在指定的集合范围之内，多选一           |
| NOT IN | 不在指定的集合范围之内                 |
| ANY    | 子查询返回列表中，有任意一个满足即可   |
| SOME   | 与ANY等同，使用SOME的地方都可以使用ANY |
| ALL    | 子查询返回列表的所有值都必须满足       |

案例

1. 查询 "销售部" 和 "市场部" 的所有员工信息

   分解为以下两步: 

   ①. 查询 "销售部" 和 "市场部" 的部门 ID

   ```sql
   select id from dept where name = '销售部' or name = '市场部';
   ```

   ②. 根据部门ID, 查询员工信息

   ```sql
   select * from emp where dept_id in (select id from dept where name = '销售部' or
   name = '市场部');
   ```

2. 查询比财务部所有人工资都高的员工信息

   分解为以下两步: 

   ①. 查询所有 财务部 人员工资

   ```sql
   select id from dept where name = '财务部';
   
   select salary from emp where dept_id = (select id from dept where name = '财务部');
   ```

   ②. 根据部门ID, 查询员工信息

   ```sql
   select * from emp where salary > all ( select salary from emp where dept_id =
   (select id from dept where name = '财务部') )
   ```

3. 查询比研发部其中任意一人工资高的员工信息

   分解为以下两步: 

   ①. 查询研发部所有人工资

   ```sql
   select salary from emp where dept_id = (select id from dept where name = '研发部');
   ```

   ②. 比研发部其中任意一人工资高的员工信息

   ```sql
   select * from emp where salary > any ( select salary from emp where dept_id =
   (select id from dept where name = '研发部') );
   ```



### 行子查询

子查询返回的结果是一行（可以是多列），这种子查询称为行子查询

常用的操作符：= 、<> 、IN 、NOT IN

案例: 

1. 查询与 "张无忌" 的薪资及直属领导相同的员工信息

   这个需求同样可以拆解为两步进行：

   ①. 查询 "张无忌" 的薪资及直属领导

   ```sql
   select salary, managerid from emp where name = '张无忌';
   ```

   ②. 查询与 "张无忌" 的薪资及直属领导相同的员工信息

   ```sql
   select * from emp where (salary,managerid) = (select salary, managerid from emp
   where name = '张无忌');
   ```



### 表子查询

子查询返回的结果是多行多列，这种子查询称为表子查询。 

常用的操作符：IN

案例：

1. 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息

   分解为两步执行：

   ①. 查询 "鹿杖客" , "宋远桥" 的职位和薪资

   ```sql
   select job, salary from emp where name = '鹿杖客' or name = '宋远桥';
   ```

   ②. 查询与 "鹿杖客" , "宋远桥" 的职位和薪资相同的员工信息

   ```sql
   select * from emp where (job,salary) in ( select job, salary from emp where name =
   '鹿杖客' or name = '宋远桥' );
   ```

2. 查询入职日期是 "2006-01-01" 之后的员工信息 , 及其部门信息

   分解为两步执行：

   ①. 入职日期是 "2006-01-01" 之后的员工信息

   ```sql
   select * from emp where entrydate > '2006-01-01';
   ```

   ②. 查询这部分员工, 对应的部门信息

   ```sql
   select e.*, d.* from (select * from emp where entrydate > '2006-01-01') e left
   join dept d on e.dept_id = d.id ;
   ```

<br>

# 事务 

## 事务简介

**事务**是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系 统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

就比如：张三给李四转账 1000 块钱，张三银行账户的钱减少 1000，而李四银行账户的钱要增加 1000。这一组操作就必须在一个事务的范围内，要么都成功，要么都失败。

为了解决可能发生的问题，就需要通过数据的事务来完成，我们只需要在业务逻辑执行之前开启事务，执行完毕后提交事务。如果执行过程中报错，则回滚事务，把数据恢复到事务开始之前的状态。

> 注意： 默认 MySQL 的事务是自动提交的，也就是说，当执行完一条 DML 语句时，MySQL 会立即隐式的提交事务。



## 事务操作

### 控制事务一

1. 查看/设置事务提交方式

   ```sql
   SELECT @@autocommit;
   SET @@autocommit = 0;
   ```

2.  提交事务

   ```sql
   COMMIT;
   ```

3. 回滚事务

   ```sql
   ROLLBACK;
   ```

> 注意：上述的这种方式，我们是修改了事务的自动提交行为，把默认的自动提交修改为了手动提交，此时我们执行的 DML 语句都不会提交，需要手动的执行 commit 进行提交。



###  控制事务二

1. 开启事务

   ```sql
   START TRANSACTION 或 BEGIN;
   ```

2.  提交事务

   ```sql
   COMMIT;
   ```

3. 回滚事务

   ```sql
   ROLLBACK;
   ```

转账案例：

```sql
-- 开启事务
start transaction

-- 1. 查询张三余额
select * from account where name = '张三';

-- 2. 张三的余额减少1000
update account set money = money - 1000 where name = '张三';

-- 3. 李四的余额增加1000
update account set money = money + 1000 where name = '李四';

-- 如果正常执行完毕, 则提交事务
commit;

-- 如果执行过程中报错, 则回滚事务
-- rollback;
```



## 事务四大特性

* 原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。 
* 一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态。 
* 隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。 
* 持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

上述就是事务的四大特性，简称 ACID。



## 并发事务问题

1. 赃读：一个事务读到另外一个事务还没有提交的数据。

   比如：事务 A 读取到了事务 B 未提交的数据。

2. 不可重复读：一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读。

   比如：事务 A 两次读取同一条记录，但是读取到的数据却是不一样的。

3.  幻读：一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了 "幻影"。



## 事务隔离级别

为了解决并发事务所引发的问题，在数据库中引入了事务隔离级别。主要有以下几种：

| 隔离级别              | 脏读 | 不可重复读 | 幻读 |
| --------------------- | ---- | ---------- | ---- |
| Read uncommitted      | √    | √          | √    |
| Read committed        | ×    | √          | √    |
| Repeatable Read(默认) | ×    | ×          | √    |
| Serializable          | ×    | ×          | ×    |

1. 查看事务隔离级别

   ```sql
   SELECT @@TRANSACTION_ISOLATION;
   ```

2. 设置事务隔离级别

   ```sql
   SET [ SESSION | GLOBAL ] TRANSACTION ISOLATION LEVEL { READ UNCOMMITTED |
   READ COMMITTED | REPEATABLE READ | SERIALIZABLE }
   ```

   > 注意：事务隔离级别越高，数据越安全，但是性能越低。



