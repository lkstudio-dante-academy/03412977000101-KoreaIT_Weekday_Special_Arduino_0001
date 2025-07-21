/**
* 모드
*/
static const int NUMBER_LED_PIN = 13;

/** 초기화 */
void setup() {
  /*
  * pinMode 함수란?
  * - 아두이노 보드의 특정 핀을 입력 or 출력 용으로 설정하는 역할을 수행하는 함수를 의미한다. (+ 즉, pinMode 함수를 활용하면 LED 를 켜거나 끄는 것이 가능하다.)
  */
  pinMode(NUMBER_LED_PIN, OUTPUT);
}

/** 상태를 갱신한다 */
void loop() {
  /*
  * digitalWrite 함수란?
  * - 디지털 신호를 아두이노 보드에 출력하는 역할을 수행하는 함수를 의미한다. (+ 즉, digitalWrite 함수를 활용하면 LED 에 신호를 보내서 점멸 여부를 제어하는 것이 가능하다.)
  * 
  * delay 함수란?
  * - 일정 시간 동안 대기하는 역할을 수행하는 함수를 의미한다. (+ 즉, delay 함수를 활용하면 LED 를 일정 시간 뒤에 켜거나 끄는 것이 가능하다.)
  */
  digitalWrite(NUMBER_LED_PIN, HIGH);
  delay(1000);

  digitalWrite(NUMBER_LED_PIN, LOW);
  delay(1000);
}
