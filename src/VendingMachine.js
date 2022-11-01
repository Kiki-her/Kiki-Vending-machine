// your class here
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/
class VendingMachine {
  constructor() {
    this.till = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this.balance = 0;
    this.selectedRow;
    this.selectedColumn;
    this.change;
    this.changeDetail = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this.boo = true;
  }

  insertCoin(denomination) {
    this.till[denomination]++;
    this.balance = this.balance + denomination;
  }

  changeReturn() {
    console.log(`coin: ${this.till}`);
    this.till = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this.balance = 0;
  }

  pressButton(array, target) {
    const obj = {
      A: array[0],
      B: array[1],
      C: array[2],
      D: array[3],
    };
    if (typeof target === "string" && !this.selectedRow) {
      this.selectedRow = target;
    } else if (!this.selectedColumn) {
      this.selectedColumn = target;
    }

    if (this.selectedRow && this.selectedColumn) {
      let str = this.selectedRow;
      let num = this.selectedColumn;
      if (obj[str][num - 1].count) {
        this.boo = true;
        console.log(`row: ${this.selectedRow}, column: ${this.selectedColumn}`);
        console.log(`Here is your ${obj[str][num - 1].name}`);
        obj[str][num - 1].count -= 1;
        let resultBalance = 0;
        Object.keys(this.till).forEach((key) => {
          resultBalance += Number(key) * this.till[key];
        });
        this.change = obj[str][num - 1].price - resultBalance;
        let copyChange = this.change;
        if (copyChange) {
          if (copyChange >= 500) {
            this.changeDetail["500"] = Math.floor(copyChange / 500);
            copyChange -= this.changeDetail["500"] * 500;
            console.log("500", copyChange);
          }

          if (copyChange >= 100) {
            this.changeDetail["100"] = Math.floor(copyChange / 100);
            copyChange -= this.changeDetail["100"] * 100;
            console.log("100", copyChange);
          }

          if (copyChange >= 50) {
            this.changeDetail["50"] = Math.floor(copyChange / 50);
            copyChange -= this.changeDetail["50"] * 50;
            console.log("50", copyChange);
          }

          if (copyChange >= 10) {
            this.changeDetail["10"] = Math.floor(copyChange / 10);
            copyChange -= this.changeDetail["10"] * 10;
            console.log("10", copyChange);
          }
        }
      } else {
        this.boo = false;
        console.error("Out of stock now!");
      }
      this.selectedRow;
      this.selectedColumn;
      return obj[str][num - 1];
    }
  }
}

module.exports = VendingMachine;
