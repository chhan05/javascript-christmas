import { Console } from '@woowacourse/mission-utils';

const InputView = {
    async readDate() { // 입력 날짜
        const input = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n");
        if (!this.isValidDate(input)) {
            throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        }
        return input;
        // ...
    },
    isValidDate(input) { // 입력 날짜 오류 처리
        const num = Number(input);
        return Number.isInteger(num) && num >= 1 && num <= 31;
    },
    async readMenu() { // 입력 메뉴
        let input = await Console.readLineAsync("주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n");
        input = input.split(",");
        for (let i=0;i<input.length;i++) {
            input[i] = input[i].split("-");
        }
        if (!this.isValidMenu(input)) {
            throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        };
        return input;
    },
    isValidMenu(input) { // 입력 메뉴 오류 처리
        const menuList = ["양송이수프","타파스","시저샐러드","티본스테이크","바비큐립","해산물파스타","크리스마스파스타","초코케이크","아이스크림","제로콜라","레드와인","샴페인"];
        let totalMenu = 0;
        const menuSet = new Set();
        for (let i=0;i<input.length;i++) {
            if (input[i].length != 2) { // 형식
                return false;
            }
            const menuName = input[i][0];
            const menuCount = Number(input[i][1]);
            if (!menuList.includes(menuName)) { // 메뉴 유효성
                return false;
            }
            if (!Number.isInteger(menuCount) || menuCount < 1) { // 개별 개수
                return false;
            }
            if (menuSet.has(menuName)) { // 중복 메뉴
                return false;
            }
            menuSet.add(menuName);
            totalMenu += menuCount;
        }
        if (totalMenu>20) { // 총개수 초과
            return false;
        }
        return true;
    }
}

export default InputView;