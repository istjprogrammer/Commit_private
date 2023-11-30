//먼저 npm i puppeteer 로 퍼펫티어를 설치해준다.

const  puppeteer = require('puppeteer');

class Crawler {
    browser = null;
    page = null;
    targetUrl = '';
    blogData = null;
  
    async setConfig() {
        this.browser = await puppeteer.launch({
            headless: false,
        });
        this.page = await this.browser.newPage();
        this.blogData = [];
    }
  
    async accessSite() {
        await this.page.goto(this.targetUrl);
    }

    async getPartOfPost() {
        await this.page.waitForSelector('#body > ul > li', {
            timeout: 1000,
        });

        const posts = await this.page.$$('#body > ul > li');
        for (const post of posts) {
            const name = await post.$eval('a', (e) => e.innerText);
            const date = await post.$eval('.date', (e) => e.innerText);
            this.blogData.push({
                name,
                date
            });
        }
    }

    async moveNextPage() {
        const flag = await this.page.waitForSelector('#paging > a.next.no-more-next', {
            timeout: 300,
        }).then(e => true)
            .catch(e => false);

        if (flag === true)
            return false;
              
        await this.page.click('#paging > a.next');
    }

    async checkLastPage() {
        const flag = await this.page.waitForSelector('#paging > a.next.no-more-next', {
            timeout: 300,
        }).then(e => true)
          .catch(e => false);

        return flag;
    }

    async closeBrowser() {
        await this.browser.close();
    }
} 

async function crawl(){
    const crawler = new Crawler();
    await crawler.setConfig();
    await crawler.accessSite();

    for (let i = 1; i <= 100; i++) {
				await crawler.getPartOfPost();
        const flag = await crawler.checkLastPage();
        if (flag === true)
            break;
        await crawler.moveNextPage();
    }
    
    await crawler.closeBrowser();
    console.log(crawler.blogData);
}

crawl();
