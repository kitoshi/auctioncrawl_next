export interface CrawlerAPIObject {
  ebayPrice: string;
  itemName: string;
  gcPrice: string;
  itemLink: string;
  ebayLink: string;
}

export class ApiData {
  private _data: CrawlerAPIObject[] | undefined;
  constructor() {
    this._data;
  }

  async fetchData(): Promise<void> {
    try {
      const response = await fetch(
        `https://backend-dot-operating-ally-304222.uc.r.appspot.com/crawlerAPI`
      );
      const data = await response.json();
      this._data = data[0].combinedList as CrawlerAPIObject[];
    } catch (error) {
      //todo handle error
      console.log(error);
    }
  }

  getData() {
    return this._data;
  }
}
