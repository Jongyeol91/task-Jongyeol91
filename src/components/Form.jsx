import React, { useCallback, useState } from "react";
import useInput from "../hooks/useInput";
import Dropdown from "../components/Dropdown";
import useDropDown from "../hooks/useDropDown";
import useToggle from "../hooks/useToggle";

const Form = () => {
  const [engFirstName, onChangeEngFirstName, engFirstErrorMsg, setEngFirstErrorMsg] = useInput({
    type: 'eng',
    maxLength: 20,
    minLength: 2,
    initialValue: '',
  });
  const [engLastName, onChangeEngLastName, engLastErrorMsg, setEngLastErrorMsg] = useInput({
    type: 'eng',
    maxLength: 20,
    minLength: 2,
    initialValue: '',
  });
  const [korName, onChangeKorName, korNameErrorMsg, setKorNameErrorMsg] = useInput({
    type: 'kor',
    maxLength: 20,
    minLength: 2
  });
  const [birth, onChangeBirth, birthErrorMsg, setBirthErrorMsg] = useInput({
    type: 'number',
    maxLength: 6,
  });
  const [phoneUser, onChangePhoneUser, phoneUserErrorMsg, setPhoneUserErrorMsg] = useInput({
    type: 'eng',
    maxLength: 20,
    minLength: 2,
  });
  const [phoneNum, onChangePhoneNum, phoneNumErrorMsg, setPhoneNumErrorMsg] = useInput({
    type: 'number',
    maxLength: 20,
    minLength: 2,
  });
  const [reservationInfo, onChangeReservationInfo, reservationInfoErrorMsg, setReservationInfoErrorMsg] = useInput({
    maxLength: 200,
  });
  const [gender, setGender] = useState('');
  const [genderErrorMsg, setGenderErrorMsg] = useState('');

  const [arrivalHour, setArrivalHour, arrivalHourErrorMsg, setArrivalHourErrorMsg] = useDropDown(null);
  const [arrivalMinute, setArrivalMinute, arrivalMinuteErrorMsg, setArrivalMinuteErrorMsg] = useDropDown(null);
  const [allTerms, toggleAllTerms] = useToggle(false);
  const [requiredTerms, toggleRequiredTerms] = useToggle(false);
  const [selectionTerms, toggleSelectionTerms] = useToggle(false);


  const checkGender = (msg) => {
    if (!gender) {
      setGenderErrorMsg(msg)
    } else {
      setGenderErrorMsg('');
    }
  }
  const onChangeGender = useCallback((e) => {
    setGender(e.target.value)

  }, [gender]);

  const handleAllTerms = () => {
    toggleAllTerms()
    if (allTerms) {
      requiredTerms && toggleRequiredTerms();
      selectionTerms && toggleSelectionTerms();
    } else {
      !requiredTerms && toggleRequiredTerms();
      !selectionTerms && toggleSelectionTerms();
    }
  }

  const handleSubmit = (e) => {
    // 초기 빈 인풋창 에러 메세지 설정
    const defaultErrorMsg = '필수 항목입니다.';
    e.preventDefault();
    !engFirstName && setEngFirstErrorMsg(defaultErrorMsg);
    !engLastName && setEngLastErrorMsg(defaultErrorMsg);
    !korName && setKorNameErrorMsg(defaultErrorMsg);
    !birth && setBirthErrorMsg(defaultErrorMsg);
    !phoneUser && setPhoneUserErrorMsg(defaultErrorMsg);
    !phoneNum && setPhoneNumErrorMsg(defaultErrorMsg);
    !reservationInfo && setReservationInfoErrorMsg(defaultErrorMsg);
    !arrivalHour && setArrivalHourErrorMsg(defaultErrorMsg);
    !arrivalMinute && setArrivalMinuteErrorMsg(defaultErrorMsg);
    checkGender(defaultErrorMsg)

    if (engFirstName && engLastName && korName && birth && phoneUser && phoneNum && reservationInfo && arrivalHour && arrivalMinute && gender
    && !korNameErrorMsg && !engFirstErrorMsg && !engLastErrorMsg && !birthErrorMsg && !phoneUserErrorMsg && !phoneNumErrorMsg && !reservationInfoErrorMsg){
      alert("예약이 완료되었습니다.");
    }
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <h3>여행자</h3>
          <div>
            <label htmlFor="eng-first-name">영문 이름: </label>
            <input id="eng-first-name" name="eng-first-name" value={engFirstName} onChange={onChangeEngFirstName}/>
            {engFirstErrorMsg}
          </div>
          <div>
            <label htmlFor="eng-last-name">영문 성: </label>
            <input id="eng-last-name" name="eng-last-name" value={engLastName} onChange={onChangeEngLastName}/>
            {engLastErrorMsg}
          </div>
          <div>
            <label htmlFor="kor-name">한글 이름: </label>
            <input id="kor-name" name="kor-name" value={korName} onChange={onChangeKorName}/>
            {korNameErrorMsg}
          </div>
          <div>
            성별:
            <label htmlFor="male">
              <input type="radio" id="male" value="male" name="male" checked={gender === 'male'}
                     onChange={onChangeGender}/>
              남
            </label>
            <label htmlFor="female">
              <input type="radio" id="female" value="female" name="female" checked={gender === 'female'}
                     onChange={onChangeGender}/>
              여
            </label>
            {genderErrorMsg}
          </div>
          <div>
            <label htmlFor="arrival-time">숙소 도착 예정 시간: </label>
            <Dropdown level={23} unit={'시'} setValue={setArrivalHour}/>
            {arrivalHourErrorMsg}
            <Dropdown level={59} unit={'분'} setValue={setArrivalMinute}/>
            {arrivalMinuteErrorMsg}
          </div>
          <div>
            <label htmlFor="birth">생년월일: </label>
            <input id="birth" value={birth} onChange={onChangeBirth}/>
            {birthErrorMsg}
          </div>
          <div>
            <h3>상세 핸드폰 정보</h3>
            <label htmlFor="user-name">사용자 이름: </label>
            <input id="user-name" value={phoneUser} onChange={onChangePhoneUser}/>
            {phoneUserErrorMsg}
            <div>
              <label htmlFor="phone-num">핸드폰 번호: </label>
              <select name="countryNum" id="countryNum">
                <option key={`countryNum`}>{'+82(대한민국)'}</option>
              </select>
              <input id="phone-num" value={phoneNum} onChange={onChangePhoneNum}/>
              {phoneNumErrorMsg}
            </div>
          </div>
          <div>
            <h3>기타 예약 정보</h3>
            <textarea value={reservationInfo} onChange={onChangeReservationInfo}/>
            {reservationInfoErrorMsg}
          </div>
          <hr/>
          <h3>약관 동의</h3>
          <div>
            <label htmlFor="all-terms">
              <input type="checkbox" id="all-terms" name="all-terms" value={allTerms} onChange={handleAllTerms}/>
              전체동의
            </label>
            <label htmlFor="required-terms">
              <input type="checkbox" id="required-terms" name="required-terms" value={requiredTerms}
                     checked={requiredTerms} onChange={toggleRequiredTerms}/>
              여행자 약관 동의(필수)
            </label>
            <label htmlFor="selection-terms">
              <input type="checkbox" id="selection-terms" name="selection-terms" value={selectionTerms}
                     checked={selectionTerms} onChange={toggleSelectionTerms}/>
              특가 항공권 및 할인 혜택 안내 동의 (선택)
            </label>
          </div>
          <input type="submit" disabled={!requiredTerms}/>
        </form>
      </div>
  )
}

export default Form;
