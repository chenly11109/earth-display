import React, { useState } from 'react'
import './index.scss'
import { ReactComponent as AddImageIcon } from './button_add_image.svg'
import Upload from 'rc-upload'
import { UploadProps } from 'rc-upload'
import { service } from '../../../api/service'
import { useOrgPageStore } from '../../../state/OrgPageState'
import cn from 'classnames'
import NotificationPopup from '../NotificationPopup'
import { resolveActions } from 'xstate/lib/actions'

const useCreateOrgPageStore = useOrgPageStore.getState().CreateOrgPageStore

// 把file实例对象 转成 base64 格式，作为图片src
function blobToBase64(blob: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
// 判断图片 像素 和 比例 是否合规
function judgePixelValid(file:File){
  return new Promise((res,rej) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const width = img.naturalHeight
      const height = img.naturalWidth      
      if(width < 640 && height < 640){
        console.log('像素太低：', width, height);
        res('wrongPixel')
      } else if(width !== height) {
        console.log('比例不对：', width, height);
        res('wrongProportion')
      } else {
        console.log('像素合规：', width, height);
        res(true)
      }
    }
  })
}

type UploadState = 'initial' | 'uploaded'
type wholeUploadProps = UploadProps & { 
  shape?: 'default' | 'circle'
  uploadState:UploadState
  setUploadState:()=>void
  className?:string 
  handleNotificationPopupDone: ()=>void
  handlePixelWrong: ()=>void
  handleProportionWrong: ()=>void
}

export default function AddImageButton({
  shape='default',
  ...props
}: wholeUploadProps){
  const { beforeUpload, className, uploadState,
    handleNotificationPopupDone, handleRequsetSuccess, showAddImageModal,
    modalContent, handlePixelWrong, handleProportionWrong, imgSrc } = props;

  const [src, setSrc] = useState('')  // 用于向外传递接收到的src

  // onBeforeUpload
  const onBeforeUpload:UploadProps['beforeUpload'] = (file, RcFiles) => {
    // setWhyNotCompliant('')  // 上传之前状态初始化
    return new Promise((resolve, reject) => {
    
    blobToBase64(file).then(value => {  // value就是base64字符串
      // 像素不够高
      judgePixelValid(file).then(pixelInformation => {
        if (pixelInformation==='wrongPixel'){
          handlePixelWrong()
          reject('The uploaded image is less than 640px*640px')
          return
        } else if(pixelInformation==='wrongProportion') {  // 比例不是1:1
          handleProportionWrong()
          reject('The uploaded image is not in a 1:1 ratio')
          return
        } else {
          setSrc(value as string)
          resolve('')
        }
      })
    })

  })
  .then(() => {
      if (typeof beforeUpload === 'function') {
        return beforeUpload(file, RcFiles)
      }
      return true
    })
  }

  const uploadProps = {
    action: '/community/organization/uploadPic',
    multiple: false,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    accept: 'image/*',
    onStart(file: File) {
      console.log('onStart', file.name);
    },
    onError(err:string) {
      console.log('onError', err);
    },
    customRequest({
      action,
      file,
      onError,
      headers,
    }) {
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('imageType', '0');
      service
        .post(action, formData, {
          headers
        })
        .then(
          handleRequsetSuccess(file,src)
        )
        .catch(onError);
  
      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
    },
  };

  return (
    <div className={className}>
      {
        uploadState === 'initial' && !imgSrc ? 
          <Upload beforeUpload={onBeforeUpload} {...uploadProps}>
            <div className={cn('addImageButton', shape && shape==='circle' && 'addImageButton--circle')}>
              <AddImageIcon /> 
            </div>
          </Upload>
        :
        <Upload beforeUpload={onBeforeUpload} {...uploadProps}>
          <div className={cn('addImageButton--uploaded', shape && shape==='circle' && 'addImageButton--uploaded--circle')}>
            <div className='addImageButton--uploaded__text'>Change</div>
            <img className='addImageButton--uploaded__uploadImg' src={imgSrc}></img>
          </div>
        </Upload>
      }

      <NotificationPopup
        showModal={showAddImageModal}
        handleDone={handleNotificationPopupDone}
        title="Error"
        content={modalContent}
      />

    </div>
  )
}
