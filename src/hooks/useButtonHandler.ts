import { MouseEvent } from "react";

/**
 * 버튼의 클릭 이벤트를 관리하는 커스텀 훅
 * @param {(e: MouseEvent<HTMLButtonElement>) => void} [onClick] - 클릭 시 실행할 함수
 * @param {boolean} disabled - 버튼 비활성화 여부
 * @returns {(e: MouseEvent<HTMLButtonElement>) => void} 클릭 이벤트 핸들러
 */
export const useButtonHandler = (onClick?: (e: MouseEvent<HTMLButtonElement>) => void, disabled: boolean = false) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return handleClick;
};
