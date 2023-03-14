---
layout: default_post
title:  "0010. 合併排序(Merge Sort)-穩定排序"
excerpt: "演算法-排序"
tags: Algorithm Sort Paractical
---
<div class="summary">
<br/>時間複雜度(Time Complex)：  O(log n)
<br/>空間複雜度(Space Complex)： O(n)
<br/>最佳時間： O(nlogn)
<br/>最壞時間： O(nlong)
<br/>範例檔案：<a href="https://github.com/gotoa1234/Algorithm_Sort/blob/main/Practical/MergeSort.cs">Source Code</a>
<br/>範例專案：<a href="https://github.com/gotoa1234/Algorithm_Sort/">Code Project</a>
<br/>基本介紹：本篇分為3大部分。
<br/>第一部分：合併排序 - 介紹
<br/>第二部分：圖解範例說明
<br/>第三部分：代碼
</div>

<div class="title">
    <br/><hr class="titleinner">
	<span></span>
	<hr class="titleinner"><br/>
</div>


<br/><br/>
<h1>第一部分：合併排序 - 介紹</h1>
<h2>Step 1：原理</h2>
分而治之法，將陣列切割成最小的兩個陣列，然後進行排序，重組後再用這生成的陣列由小而大依序插入
<br/>解決了當元素太多時需要不斷交換的問題，所以可以達到 O(nlog)的效能
<br/><br/>

<h2>Step 2：演算法流程圖</h2>
<br/> <img src="/assets/image/Algorithm/Sort/Practical/MergeSort.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第二部分：圖解範例說明</h1>
<h2>Step 1：以整數陣列為例</h2>
初始內有6個值
<br/>每次合併的時候都會產生出新的陣列，由兩個陣列小的逐一插入
<br/> <img src="/assets/image/Algorithm/Sort/Practical/MergeSort_compare1.jpg" width="50%" height="50%" />
<br/> <img src="/assets/image/Algorithm/Sort/Practical/MergeSort_compare2.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第三部分：代碼</h1>
<h2>Step 1：合併排序代碼 - 呼叫進入點</h2>
輸入一組數列 inputItem 求出 result

``` C#

public void Execute()
{
     List<int> inputItem = new() { 92, 17, 38, 59, 26, 39 };
     var execute = new MergeSort<int>();
     var result = execute.MergeAscendingSort(inputItem);
}

```

<br/><br/>

<h2>Step 2：合併排序代碼 - 主程式</h2>
主要三個流程
<br/>1. 建立空間
<br/>2. 塞入值轉換對應的索引位置
<br/>3. 轉換由小到大取出值

``` C#

public class MergeSort<T> where T : IComparable
{
    /// <summary>
    /// 主程式，合併排序
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    public List<T> MergeAscendingSort(List<T> items)
    {
        if (items.Count <= 1)
            return items;
        //1. 切割一半的數量
        int mid = items.Count / 2;
        var leftItems = items.Take(mid).ToList();
        var rightItems = items.Skip(mid).Take(items.Count - mid).ToList();
        //2. 找出左邊陣列、右邊陣列的結果 (遞迴自己)
        leftItems =  MergeAscendingSort(leftItems);
        rightItems =  MergeAscendingSort(rightItems);
        //3. 將排序的結果返回
        return Sort(leftItems, rightItems);
    }
    /// <summary>
    /// 合併兩個陣列的值，並且由小到大組成回傳
    /// </summary>
    /// <returns></returns>
    private List<T> Sort(List<T> leftItems, List<T> rightItems)
    {
        var mergeSortResult = new List<T>();
        //2-1. 兩個陣列小的逐一放進結果中
        while(leftItems.Count> 0 && rightItems.Count>0)
        {
            if (leftItems[0].CompareTo(rightItems[0]) < 0)
            {
                mergeSortResult.Add(leftItems[0]);
                leftItems.RemoveAt(0);
            }
            else
            {
                mergeSortResult.Add(rightItems[0]);
                rightItems.RemoveAt(0);
            }
        }
        //跑到這必定是 rightItems.Count == 0 把剩下的值逐一丟進結果中
        if (leftItems.Count > 0)
        {
            mergeSortResult.AddRange(leftItems);
        }
        else if(rightItems.Count > 0)//跑到這必定是 leftItems.Count == 0 把剩下的值逐一丟進結果中
        {
            mergeSortResult.AddRange(rightItems);
        }
        return mergeSortResult;
    }
}

```

<br/><br/>