---
layout: default_post
title:  "0011. 圖書館排序(Library Sort)-穩定排序"
excerpt: "演算法-排序"
tags: Algorithm Sort Paractical
---
<div class="summary">
<br/>時間複雜度(Time Complex)：  O(n²)
<br/>空間複雜度(Space Complex)： O(1)
<br/>最佳時間： O(n)
<br/>最壞時間： O(n²)
<br/>範例檔案：<a href="https://github.com/gotoa1234/Algorithm_Sort/blob/main/Practical/LibrarySort.cs">Source Code</a>
<br/>範例專案：<a href="https://github.com/gotoa1234/Algorithm_Sort/">Code Project</a>
<br/>基本介紹：本篇分為2大部分。
<br/>第一部分：圖書館排序 - 介紹
<br/>第二部分：偽代碼展示
</div>

<div class="title">
    <br/><hr class="titleinner">
	<span></span>
	<hr class="titleinner"><br/>
</div>


<br/><br/>
<h1>第一部分：圖書館排序 - 介紹</h1>
<h2>Step 1：原理</h2>
插入排序的變形，原本的插入排序後需要位移，如果在插入前就先有空間的話，那就省去插入排序時的"位移"只要放進去即可
<br/>缺點是要額外的空間，但在現在實作上仍需要對額外的空間做位移
<br/><br/>

<h2>Step 2：歷史論文</h2>
演算法根據以下三個重要的步驟(出自Wiki截錄2006年論文訊息)：
<br/>1. 二分尋找：我們在已經插入的元素中，二分尋找這個元素應該插入的位置。這可以通過線性移動到陣列的左側或右側，如果您點擊中間元素中的空格。
<br/>2. 插入: 將元素插入到正確的位置，並且通過交換把後面的元素向右移動，直到空格。
<br/>3. 重新平衡：在陣列中的每對元素之間插入空格。這需要線性時間，並且由於演算法只執行log n輪，總重新平衡只需要O（n log n）時間。
<br/><br/>

<h2>Step 2：演算法流程圖</h2>
<br/> <img src="/assets/image/Algorithm/Sort/Practical/LibrarySort.jpg" width="50%" height="50%" />
<br/><br/>

<h1>第二部分：偽代碼展示</h1>
<h2>Step 1：圖書館排序代碼 - 呼叫進入點</h2>
輸入一組數列 inputItem 求出 result，本範例是將圖書館排序視為插入排序的變形

``` C#

public class LibrarySortExecute
{
    public void Execute()
    {
        List<int> inputItem = new() { 18, 17, 38, 59, 26, 39 };
        List<int> peddingItems = new List<int>(inputItem);            
        var librarySort = new LibrarySort<int>();
        var result = librarySort.LibraryAsecdingSoring(inputItem, peddingItems);
    }
}

```

<br/><br/>

<h2>Step 2：圖書館排序代碼 - 主程式</h2>
主要三個流程
<br/>1. 建立輸入陣列的額外空間
<br/>2. 遍歷輸入陣列，並且用插入排序的方式將值放進額外空間
<br/>3. 最後即為由小而大的排序結果

``` C#

public class LibrarySort<T> where T : IComparable, new()
{
    public List<T> LibraryAsecdingSoring(List<T> items, List<T> peddingItems)
    {
        //1. 插入排序法將得到的值放進額外空間 peddingItems 中
        for (int index = 0; index < items.Count(); index++)
        {
            int tempIndex = index;
            while (tempIndex > 0 && peddingItems[tempIndex - 1].CompareTo(items[index]) > 0)
            {
                peddingItems[tempIndex] = peddingItems[tempIndex - 1];
                tempIndex--;
            }            peddingItems[tempIndex] = items[index];
        }           
        //2. 最後額外空間所放入的資料為排序後的結果
        return peddingItems;
    }
}

```

<br/><br/>