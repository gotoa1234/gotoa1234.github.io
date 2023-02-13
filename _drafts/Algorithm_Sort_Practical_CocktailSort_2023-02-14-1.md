---
layout: default_post
title:  "0004. 雞尾酒排序法(Cocktail Sort)-穩定排序"
excerpt: "演算法-排序"
tags: Algorithm Sort Paractical
---
<div class="summary">
<br/>時間複雜度(Time Complex)： O(n^2)
<br/>空間複雜度(Space Complex)： O(1)
<br/>最佳時間： O(n)
<br/>最壞時間： O(n^2)
<br/>範例檔案：<a href="https://github.com/gotoa1234/Algorithm_Sort/blob/main/Practical/CocktailSort.cs">Source Code</a>
<br/>範例專案：<a href="https://github.com/gotoa1234/Algorithm_Sort/">Code Project</a>
<br/>基本介紹：本篇分為3大部分。
<br/>第一部分：雞尾酒排序 - 介紹
<br/>第二部分：圖解範例說明
<br/>第三部分：代碼
</div>

<div class="title">
    <br/><hr class="titleinner">
	<span></span>
	<hr class="titleinner"><br/>
</div>


<br/><br/>
<h1>第一部分：雞尾酒排序 - 介紹</h1>
<h2>Step 1：原理:又名(攪拌排序)</h2>
像是攪拌依一樣，由最左再往最右邊，並且依照以下規則
<br/>1. 往右時，將最大值放到最右邊，並且最右上限-1
<br/>2. 然後再往左，將最小值放到最左邊，並且最左上限+1
<br/>3. 重複1、2直到左與右相重疊時，表示跑完
<br/>最後排序將會由小至大
<br/><br/>

<h2>Step 2：演算法流程圖</h2>
<br/> <img src="/assets/image/Algorithm/Sort/Practical/CocktailSort.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第二部分：圖解範例說明</h1>
<h2>Step 1：以整數陣列為例</h2>
初始內有5個值，依序左、右、左、右、完成排序
<br/> <img src="/assets/image/Algorithm/Sort/Practical/CocktailSort_compare1.jpg" width="50%" height="50%" />
<br/> <img src="/assets/image/Algorithm/Sort/Practical/CocktailSort_compare2.jpg" width="50%" height="50%" />
<br/> <img src="/assets/image/Algorithm/Sort/Practical/CocktailSort_compare3.jpg" width="50%" height="50%" />
<br/> <img src="/assets/image/Algorithm/Sort/Practical/CocktailSort_compare4.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第三部分：代碼</h1>
<h2>Step 1：雞尾酒排序代碼 - 呼叫進入點</h2>
輸入一組數列 inputItem 求出 result

``` C#

public void Execute()
{
    List<int> inputItem = new() { 92, 17, 38, 59, 26, 39 };
    var cocktailSort = new CocktailSort<int>();
    var result = cocktailSort.CocktailAscsendingSorting(inputItem);
}

```

<br/><br/>

<h2>Step 2：雞尾酒排序代碼 - 主程式</h2>
主要四個流程
<br/>1. 輸入一組比較陣列Array[]
<br/>2. 由陣列最左邊元素取最大值放置最右邊
<br/>3. 由陣列最右邊元素取最小值放置最左邊
<br/>4. 直到到中心點，結束排序

``` C#

public class CocktailSort<T> where T : IComparable
{
    public List<T> CocktailAscsendingSorting(List<T> items)
    { 
        int right = items.Count - 1;
        int left = 0;
        T temp;
        while (left < right)
        {
            //往右 - 取大
            for (int index = left; index < right; index++)
            {
                if (items[index].CompareTo(items[index + 1]) > 0)
                {
                    temp = items[index];
                    items[index] = items[index + 1];
                    items[index + 1] = temp;
                }
            
            }
            right--;
            //往左 - 取小
            for (int index = right; index > left; index--)
            {
                if (items[index].CompareTo(items[index - 1]) < 0)
                {
                    temp = items[index];
                    items[index] = items[index - 1];
                    items[index - 1] = temp;
                }
            }
            left++;
        }
        return items;
    }
}

```

<br/><br/>