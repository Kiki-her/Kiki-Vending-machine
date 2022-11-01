const VendingMachine = require("../VendingMachine");
const { expect } = require("chai");

describe("vending machine", () => {
  it("should accept valid coins", () => {
    // Setup
    const machine = new VendingMachine();

    // Exercise
    machine.insertCoin(500);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 0,
      50: 0,
      100: 0,
      500: 1,
    });
    expect(machine.balance).to.equal(500); // Use an ES6 getter
  });

  it("プログラム起動直後の残高は0である必要がある", () => {
    const machine = new VendingMachine();
    expect(machine.balance).to.equal(0);
  });

  it("行が選択されていない状態で行が選択されると、選択された行の文字を保存する必要がある", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, "A");
    expect(machine.selectedRow).to.equal("A");
  });

  it("列が選択されると、選択された列の数字を保存する", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, 1);
    expect(machine.selectedColumn).to.equal(1);
  });

  it("行が選択されている状態で、列が選択され、対象の商品を表示する", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, "A");
    expect(machine.pressButton(inventory, 1)).to.equal(juice);
  });

  it("対象の商品に十分な残高と在庫があれば、対象の商品の在庫を一つ減らす", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, "A");
    machine.pressButton(inventory, 2);
    expect(coffee).to.deep.equal({ name: "Starbucks", price: 250, count: 6 });
  });

  it("対象の商品が購入されたとき、必要に応じておつりを返す", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, "A");
    machine.pressButton(inventory, 2);
    machine.insertCoin(500);
    expect(machine.change).to.equal(250);
  });

  it("対象の商品が購入されたとき、必要に応じておつりを返し、コインの種類と数を記録する", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 7 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, "A");
    machine.pressButton(inventory, 2);
    machine.insertCoin(500);
    expect(machine.changeDetail).to.deep.equal({
      10: 0,
      50: 1,
      100: 2,
      500: 0,
    });
  });

  it("行と列が選択されているが、商品の在庫がないとき、エラーメッセージを記録する", () => {
    const machine = new VendingMachine();
    const juice = { name: "Apple Juice", price: 350, count: 5 };
    const coffee = { name: "Starbucks", price: 250, count: 0 };
    const milk = { name: "Milk", price: 150, count: 20 };
    const tea = { name: "Tea", price: 500, count: 10 };
    const inventory = [
      [juice, coffee, milk, tea],
      [tea, coffee, juice, milk],
      [milk, tea, coffee, juice],
      [coffee, juice, tea, milk],
    ];
    machine.pressButton(inventory, "A");
    machine.pressButton(inventory, 2);
    expect(machine.boo).to.equal(false);
  });

  it("残高をリセットする", () => {
    const machine = new VendingMachine();
    machine.insertCoin(500);
    machine.changeReturn();
    machine.insertCoin(200);
    expect(machine.balance).to.equal(200);
  });
});
