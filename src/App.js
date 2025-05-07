import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

class App {
  async run() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    let date;
    while (true) { // 날짜 입력
      try {
        date = await InputView.readDate();
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
    let menu;
    while (true) { // 주문 메뉴 입력
      try {
        menu = await InputView.readMenu();
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    OutputView.printMenu(date, menu);
    const totalPrice = OutputView.calTotalPrice(menu);
    OutputView.printTotalPrice(totalPrice);
    OutputView.printGiving(totalPrice);
    OutputView.printBenefit(date, menu, totalPrice);
  }
}

export default App;