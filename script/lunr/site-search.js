(function () {
    const form = document.getElementById('lunrsearchform');
    const input = document.getElementById('lunrsearch');
    const status = document.getElementById('lunrsearchstatus');
    const list = document.querySelector('#lunrsearchresults ul');
    let searchData;
    let latestQuery = 0;

    async function loadSearchData() {
        const response = await fetch(form.dataset.indexUrl);
        if (!response.ok) {
            throw new Error('搜尋索引載入失敗');
        }

        const documents = await response.json();
        const documentsByUrl = new Map(documents.map(document => [document.url, document]));
        const index = lunr(function () {
            this.ref('url');
            this.field('title');
            this.field('body');
            documentsByUrl.forEach(document => this.add(document));
        });

        return { index, documentsByUrl };
    }

    function getSearchData() {
        if (!searchData) {
            searchData = loadSearchData().catch(error => {
                searchData = undefined;
                throw error;
            });
        }
        return searchData;
    }

    function renderResults(results, documentsByUrl) {
        status.textContent = results.length ? '共' + results.length + '筆，如下：' : '查無結果';
        results.forEach((result, index) => {
            const documentData = documentsByUrl.get(result.ref);
            const item = document.createElement('li');
            item.className = 'lunrsearchresult';
            const link = document.createElement('a');
            link.href = documentData.url;
            const title = document.createElement('span');
            title.className = 'title';
            title.textContent = (index + 1) + '. ' + documentData.title;
            const body = document.createElement('span');
            body.className = 'body';
            body.textContent = documentData.body.slice(0, 80) + (documentData.body.length > 80 ? '…' : '');

            link.append(title, document.createElement('br'), body);
            item.append(link);
            list.append(item);
        });
    }

    async function search(term) {
        const query = ++latestQuery;
        list.textContent = '';
        status.textContent = '';
        if (!term) {
            return;
        }

        status.textContent = '搜尋中…';
        let data;
        try {
            data = await getSearchData();
        } catch (error) {
            if (query === latestQuery) {
                status.textContent = '無法載入搜尋索引，請再試一次。';
            }
            return;
        }

        if (query !== latestQuery) {
            return;
        }

        let results;
        try {
            results = data.index.search(term);
        } catch (error) {
            status.textContent = '無法解析搜尋字詞，請試試其他關鍵字。';
            return;
        }
        renderResults(results, data.documentsByUrl);
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        search(input.value.trim());
    });

    if (form.querySelector('button[type="submit"]')) {
        const initialQuery = new URLSearchParams(window.location.search).get(input.name);
        if (initialQuery) {
            input.value = initialQuery.slice(0, input.maxLength);
            search(input.value.trim());
        }
    }
})();
