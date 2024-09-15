import styled from "styled-components";

const ErrMsg = styled.h1`
  color: var(--clr-4);
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
  position: absolute;
  font-size: 2em;
  font-weight: 500;
  text-align: center;
  user-select: none;
`;

export default function ErrMessage(e) {
  return <ErrMsg>{e.contact}</ErrMsg>;
}
