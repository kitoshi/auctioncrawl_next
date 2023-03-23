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
      const response = await fetch(`/api/crawler`, { method: 'GET' });
      const data = await response.json();
      this._data = data.data[0].combinedList as CrawlerAPIObject[];
    } catch (error) {
      //todo handle error
      console.log(`crawler route error: ` + error);
    }
  }

  getData() {
    return this._data;
  }
}
