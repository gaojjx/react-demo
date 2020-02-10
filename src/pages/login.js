import styles from './login.css';
import { connect } from 'dva';
import { LoginForm } from '../components/LoginForm';
import 'antd/dist/antd.css';
import { useState } from 'react';


const LoginComponent = ({dispatch, Success, Errors}) => {
  const [loginSuccess, setLoginSuccess] = useState(Success)
  const [login, setLogin] = useState(false)
  const handleLogin = ({username, password}) => {
    dispatch({
      type: 'login/auth',
      payload: {username, password}
    })
  }
  const Error = ({Errors}) => {
    return (
      <span>{Errors[0]}</span>
    )
  }
  return (
    <div className={styles.normal}>
      {/* {!Success ? <Error Errors={Errors}/>: null} */}
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}
const mapStateToProps = state => {
  console.log(state.login)
  const {Success, Data, Errors} = state
  return {
    Success,
    Data,
    Errors
  }
}

export default connect(mapStateToProps)(LoginComponent)