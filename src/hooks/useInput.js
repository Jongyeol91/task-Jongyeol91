import { useCallback, useState } from 'react';

const useInput = (settings) => {
  const {maxLength, minLength, initialValue, type} = settings
  const [value, setter] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');

  const handler = useCallback((e) => {
    setter(e.target.value);

    if (maxLength && maxLength < e.target.value.length) {
      setErrorMsg(`최대 ${maxLength}자까지 입력 가능합니다.`)
    } else {
      setErrorMsg('');
    }

    if (minLength && minLength > e.target.value.length) {
      setErrorMsg(`최소 ${minLength}자 이상 입력해주세요.`)
    }

    if (type === 'eng') {
      const onlyEngAndSpaceRegEx = /^[a-zA-Z\s]+$/;
      if (!onlyEngAndSpaceRegEx.test((e.target.value))) {
        setErrorMsg('영어와 띄어쓰기만 입력 가능합니다.');
      }
    } else if (type === 'number') {
      const onlyNumberRegEx = /^[0-9]+$/;
      if (!onlyNumberRegEx.test(e.target.value)) {
        setErrorMsg('숫자(0~9)만 입력 가능합니다.');
      }
    } else if (type === 'kor') {
      const onlyNumberRegEx = /^[가-힣\s]+$/;
      if (!onlyNumberRegEx.test(e.target.value)) {
        setErrorMsg('한글만 입력 가능합니다.');
      }
    }
  }, [type, maxLength, minLength]);
  return [value, handler, errorMsg, setErrorMsg];
};

export default useInput;
