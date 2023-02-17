---
layout: default_post
title:  "0004. 桶子排序法(Bucket Sort)-穩定排序"
excerpt: "演算法-排序"
tags: Algorithm Sort Paractical
---
<div class="summary">
<br/>時間複雜度(Time Complex)： O(n + k)  ※ k = 桶子數
<br/>空間複雜度(Space Complex)： O(n * k)
<br/>最佳時間： O(n)
<br/>最壞時間： O(n^2) ※最壞所有的值都丟入同一個桶
<br/>範例檔案：<a href="https://github.com/gotoa1234/Algorithm_Sort/blob/main/Practical/BucketSort.cs">Source Code</a>
<br/>範例專案：<a href="https://github.com/gotoa1234/Algorithm_Sort/">Code Project</a>
<br/>基本介紹：本篇分為3大部分。
<br/>第一部分：桶子排序 - 介紹
<br/>第二部分：圖解範例說明
<br/>第三部分：代碼
</div>

<div class="title">
    <br/><hr class="titleinner">
	<span></span>
	<hr class="titleinner"><br/>
</div>


<br/><br/>
<h1>第一部分：桶子排序 - 介紹</h1>
<h2>Step 1：原理</h2>
給定一組可比較陣列，遍歷
<br/>1. 將一組可比較數列輸入
<br/>2. 求出該數列最大值與最小值
<br/>3. 決定桶子數量，決定每個桶子的區間 => (最大值-最小值) / 桶子數 = 每個桶子區間
<br/>4. 遍歷輸入的所有元素，放進對應的桶子
<br/>5. 所有桶子各自排序 (Quick sort O(nlong) 可參考Quick Sort 排序演算法)
<br/>6. 最後合併的桶子將會由小至大的排序結果
<br/><br/>

<h2>Step 2：演算法流程圖</h2>
<br/> <img src="/assets/image/Algorithm/Sort/Practical/BucketSort.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第二部分：圖解範例說明</h1>
<h2>Step 1：以整數陣列為例</h2>
初始內有6個值
<br/> <img src="/assets/image/Algorithm/Sort/Practical/BucketSort_compare1.jpg" width="50%" height="50%" />
<br/> <img src="/assets/image/Algorithm/Sort/Practical/BucketSort_compare2.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第三部分：代碼</h1>
<h2>Step 1：桶子排序代碼 - 呼叫進入點</h2>
輸入一組數列 inputItem 求出 result

``` C#

public void Execute()
{
    List<int> inputItem = new() { 92, 17, 38, 59, 26, 39 };
    var execute = new BucketSort<int>();
    execute.BuckAscendingSorting(inputItem);
}

```

<br/><br/>

<h2>Step 2：桶子排序代碼 - 主程式</h2>
主要三個流程
<br/>1. 決定每個桶子放的區間
<br/>2. 將所有值放進對應的桶子內
<br/>3. 所有桶子內排序 + 組成所有桶子排序後的結果

``` C#

public class BucketSort<T> where T : IComparable, IConvertible
{
    private readonly static int _bucketCount = 10;
    public List<T> BuckAscendingSorting(List<T> items)
    {
        //1. 決定每個桶子放的區間
        var min = (dynamic)items.Min();
        var bucketSize = GetRegionSize(ref items);
        var buckets = new List<List<T>>();
        for (int index = 0; index < _bucketCount; index++)
            buckets.Add(new List<T>());
        //2. 將所有值放進對應的桶子內
        for (int index = 0; index < items.Count; index++)
        {
            var value = Convert.ToInt32(items[index]) - min;
            var putIndex = (value / bucketSize - 1) < 0 ? 0 : (value / bucketSize - 1);
            buckets[putIndex].Add(items[index]);
        }          
        //3. 所有桶子內排序 + 組成所有桶子排序後的結果
        items.Clear();
        foreach (var bucketItem in buckets)
        {
            //Quick sort 排序每個桶子 耗費 O( k * nlogn)
            bucketItem.Sort();
            items.AddRange(bucketItem);
        }
        return items;
    }
    private int GetRegionSize(ref List<T> items)
    {
        try
        {
            var max = items.Max();
            var min = items.Min();
            return ((dynamic)max - (dynamic)min) / _bucketCount;
        }
        catch (Exception ex)
        {
            return 0;
        }
    }
}

```

<br/><br/>