export class Report {
  constructor(name,code,year,producationAsset,receivable,money,liability,slidelineAsset,totalProfit,totalAsset) {
    this.year = year;
    this.producationAsset = producationAsset;
    this.receivable = receivable;
    this.money = money;
    this.liability = liability;
    this.slidelineAsset = slidelineAsset;
    this.totalProfit = totalProfit;
    this.totalAsset = totalAsset;
    this.stockName = name;
    this.stockCode = code;
  }
}