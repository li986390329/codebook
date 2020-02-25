### 对于单行和多行断句省略等CSS

```
{
  width: 100%;
  overflow : hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```