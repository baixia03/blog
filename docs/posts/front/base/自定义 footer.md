---
outline: [1, 3]
---

# 自定义 1

## 预览

![image-20240418171645723](image/image-20240418171645723.png)

## html

```html
<div class='page_footer' id="page_footer">
    <label>有疑问请联系{{helpPersonMobile}}</label>
</div>
```

## css

```css
.page_footer label {
    display: table;
    width: 100%;
    line-height: 25px;
    white-space: nowrap;
    border-spacing: 2rem 0;
    font-size: 15px;
    color: gray
}

.page_footer label::before,
.page_footer label::after {
    display: table-cell;
    content: "";
    width: 50%;
    background: linear-gradient(#eee, #d1cfcf) repeat-x center;
    background-size: 0.1rem 0.1rem;
}
```

