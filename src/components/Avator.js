import React, { useState } from 'react'
import { Upload, Icon } from 'antd'
import 'antd/dist/antd.css';


export const Avator = ({name}) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    const handleChange = info => {
        const { file } = info
        const { status } = file 
        if (status === 'uploading') {
            setLoading(true)
        }
        if (status === 'done') {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImageUrl(reader.result)
                setLoading(false)
            })
            reader.readAsDataURL(file.originFileObj)
        }
    }
    const beforeUpload = file => {
        // console.log(file)
    }
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    )
    
    return (
        <div>
            <Upload
                name={name}
                onChange={handleChange}
                className="avatar-uploader"
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                beforeUpload={beforeUpload}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    )
}
