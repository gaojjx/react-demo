import {connect} from 'dva'
import React from 'react'
import { UserDetailForm } from './components/UserDetail'
import 'antd/dist/antd.css';

const UserDetail = ({user}) => {
  return (
    <div>

    <UserDetailForm user={user} />
    </div>
)
}

const mapStateToProps = state => {
  return {user: state.user.detail}
}

export default connect(mapStateToProps)(UserDetail)
