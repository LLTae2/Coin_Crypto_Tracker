import { useState } from "react";
import styled from "styled-components";

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  text-align: center;
  line-height: 200px;
  font-size: 23px;
  font-weight: 700;
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Circle = ({
  bgColor,
  borderColor,
  text = "default text",
}: CircleProps) => {
  const [value, setValue] = useState<number | string>(1);
  // 만약 숫자로 시작해서 문자열로 끝나거나 문자열로 시작해서 숫자로 끝나는 state라면 이렇게
  setValue(10);
  setValue("hello");
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {/*     ?? 연산자 : 만약 왼쪽에 값이 있으면 그걸 사용하고 없으면 오른쪽 값을 사용함.     */}
      {text}
    </Container>
  );
};

export default Circle;

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old.`;
sayHello({ name: "taehi", age: 12 });
sayHello({ name: "dohi", age: 17 });
