import React from 'react'
import { useDispatch } from 'react-redux'
import {
  loginUser
} from '../../../_actions/user_action';

function LoginPage() {

  // 인풋 안에있는 데이터 변경시에는 state와 연결되어있도록 하고 있습니다.
  // const [state, setstate] = useState(initialState)
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    const dispatch = useDispatch;
    // 페이지가 자동으로 리프레시 되는 것을 막아준다.
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)).then(response => {
      if(response.payload.loginSuccess) {
        props.history.push('/') // 페이지 이동시에 쓰는 함수
      }
    })

    
    
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
        <form style={{
          display='flex', flexDirection: 'column'
        }} onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input type='email' value={Email} onChange={onEmailHandler} />
          <label>Password</label>
          <input type='password' value={Password} onChange={onPasswordHandler} />
          <br/>
          <button type='submit'>
            Login
          </button>
        </form>
    </div>
  )
}

export default LoginPage
