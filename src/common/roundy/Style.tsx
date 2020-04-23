import styled from 'styled-components';

const Style = styled.div`
  display: inline-block;
  position: relative;
  svg path {
  }
  .sliderHandle {
    width: 50%;
    pointer-events: all;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 0 50%;
    &:after {
      content: '';
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 20px;
      position: absolute;
      right: -5px;
      border: 1px solid #f5859d;
      background-color: #f5859d;
      top: -10px;
      transform: all ease 0.4s;
    }
    &:before {
      content: '';
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      position: absolute;
      right: -11px;
      border: 2px solid #f5859d;
      top: -16px;
      transform: all ease 0.4s;
    }
    &:hover:after {
      box-shadow: 0 0 10px rgb(37, 205, 247);
    }
  }
  ${({ overrideStyle }) => overrideStyle}
`;
export default Style;
