import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    printMenu(date, menu) {
        Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`)
        Console.print("<주문 메뉴>");
        for (let i=0;i<menu.length;i++) {
            Console.print(menu[i][0] + " " + menu[i][1] + "개");
        }
    },
    menuList() { // 메뉴판 - 딕셔너리
        return {"양송이수프":["에피타이저",6000],"타파스":["에피타이저",5500],"시저샐러드":["에피타이저",8000],"티본스테이크":["메인",55000],"바비큐립":["메인",54000],"해산물파스타":["메인",35000],"크리스마스파스타":["메인",25000],"초코케이크":["디저트",15000],"아이스크림":["디저트",5000],"제로콜라":["음료",3000],"레드와인":["음료",60000],"샴페인":["음료",25000]}
    },
    comma(num) { // 숫자에 천 마디 구분 쉼표
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calTotalPrice(menu) { // 할인 전 총금액 계산
        const menuList = this.menuList() // 메뉴 불러오기
        let totalPrice = 0;
        for (let i=0;i<menu.length;i++) {
            totalPrice += menuList[menu[i][0]][1]*menu[i][1] // menu[i][0] = 이름, menu[i][1] = 수량, menuList[이름][1] = 가격
        }
        return totalPrice;
    },
    printTotalPrice(totalPrice) { // 할인 전 총금액 출력
        Console.print("\n<할인 전 총주문 금액>");
        Console.print(`${this.comma(totalPrice)}원`)
    },
    printGiving(totalPrice) { // 증정 메뉴 출력
        Console.print("\n<증정 메뉴>")
        if (totalPrice>=120000) Console.print("샴페인 1개");
        else Console.print("없음")
    },
    calBenefit(date, menu, totalPrice) { // 혜택 계산
        const menuList = this.menuList(); // 메뉴 불러오기
        let benefit = [0,0,0,0,0];
        // 1. 크리스마스 할인
        if (date<=25) {
            benefit[0] = 1000+(date-1)*100;
        }
        // 2. 평일 할인(디저트)/3. 주말 할인(메인)
        for (let i=0;i<menu.length;i++) {
            if (date%7==1||date%7==2) {
                if (menuList[menu[i][0]][0]=="디저트") {
                    benefit[1] += 2023;
                }
            } else {
                if (menuList[menu[i][0]][0]=="메인") {
                    benefit[2] += 2023;
                }
            }
        }
        // 4. 특별 할인
        if (date%7==3||date==25) {
            benefit[3] = 1000;
        }
        // 5. 증정 이벤트 할인
        if (totalPrice>=120000) {
            benefit[4] = 25000;
        }
        return benefit;
    },
    calbadge(totalbenefit) {
        if (totalbenefit >= 20000) {
            return "산타";
        }
        if (totalbenefit >= 10000) {
            return "트리";
        }
        if (totalbenefit >= 5000) {
            return "별";
        }
        return "없음";
    },
    printBenefit(date, menu, totalPrice) { // 혜택 내역, 총혜택 금액, 할인후금액, 배지 출력
        const benefit = this.calBenefit(date, menu, totalPrice)
        Console.print("\n<혜택 내역>")
        let totalbenefit = 0; // 증정이벤트 포함 금액
        let totalbenefit2 = 0; // 증정이벤트 제외 금액
        for (let i=0;i<5;i++) {
            if (benefit[i]!=0) {
                if (i==0) {Console.print(`크리스마스 디데이 할인: -${this.comma(benefit[0])}원`)}
                if (i==1) {Console.print(`평일 할인: -${this.comma(benefit[1])}원`)}
                if (i==2) {Console.print(`주말 할인: -${this.comma(benefit[2])}원`)}
                if (i==3) {Console.print(`특별 할인: -${this.comma(benefit[3])}원`)}
                if (i==4) {Console.print(`증정 이벤트: -${this.comma(benefit[4])}원`)}
            }
            totalbenefit+=benefit[i];
            if (i!=4) {totalbenefit2+=benefit[i]}
        }
        if (totalbenefit==0) {Console.print("없음")}

        Console.print("\n<총혜택 금액>");
        Console.print(`-${this.comma(totalbenefit)}원`);

        Console.print("\n<할인 후 예상 결제 금액>");
        Console.print(`${this.comma(totalPrice-totalbenefit2)}원`);

        Console.print("\n<12월 이벤트 배지>");
        Console.print(`${this.calbadge(totalbenefit)}`)
    }
}

export default OutputView;