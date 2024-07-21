import React, { useState } from 'react'
import './index.scss'
import { ReactComponent as EditIcon } from "./edit.svg";
import Upload from 'rc-upload'
import { UploadProps } from 'rc-upload'
import { useOrgPageStore } from '../../../state/OrgPageState';
import { useHandleResponse, HandleResponseComponent } from '../ModalResponse/HandleResponse';


const S3_PREFIX = 'https://reachplatform.s3.us-east-2.amazonaws.com/' 
const organizationId = '326856169455685'
const userId = '10001'



/**
 * 
 * @param address 图片地址, base64 或 url
 * @returns 是否为 base64 格式图片
 */
const isBase64 = (address: string) => {
  return !!address && address.startsWith('data:image')
}


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

const useCreateOrgPageStore = useOrgPageStore.getState().CreateOrgPageStore

type wholeUploadProps = UploadProps & { 
  className?:string 
}
export default function OrgLogo(props: wholeUploadProps) {
  const { logo, setLogo, whyNotCompliant, setWhyNotCompliant, logoSrc, setLogoSrc } = useCreateOrgPageStore()

  const { onSuccess, beforeUpload, className, ...rest } = props;

  const imageSrc = isBase64(logoSrc) ? logoSrc : `${S3_PREFIX}${logoSrc}`

  // 获取图片信息
  // onBeforeUpload
  const onBeforeUpload:UploadProps['beforeUpload'] = (file, RcFiles) => {
    setWhyNotCompliant('')  // 上传之前状态初始化
    return new Promise((resolve,reject) => {

      blobToBase64(file).then(value => {  // value就是base64字符串
        // 像素不够高
        judgePixelValid(file).then(pixelInformation => {
          console.log('pixelInformation: ', pixelInformation)
          if (pixelInformation==='wrongPixel'){
            setWhyNotCompliant('The uploaded image is less than 640px*640px')
            reject('The uploaded image is less than 640px*640px')
          } else if(pixelInformation==='wrongProportion') {  // 比例不是1:1
            setWhyNotCompliant('The uploaded image is not in a 1:1 ratio')
            reject('The uploaded image is not in a 1:1 ratio')
          } else {
            resolve('')
          }
        })

    })
    }).then(() => {
      if (typeof beforeUpload === 'function') {
        return beforeUpload(file, RcFiles)
      }
      return true
    })
  }

  const uploadProps = {
    action: `http://data.reachplatform.org/community/organization/uploadPic?imageType=0&relatedId=${organizationId}&userId=${userId}`,
    multiple: false,
    headers: { 
      token: 'b7f9cba6bbc14dc88b6dd677c7118944'
    },
    accept: 'image/*',
    onStart(file: File) {
      console.log('onStart');
      showModal(true)
      if(!navigator.onLine){
        handleNetworkError();
      }
    },
    onSuccess(res:any, file:File) {
      if(res.code === 200){
        if(!whyNotCompliant){
          console.log('success', res)
          setLogo(file)
          setLogoSrc(res.data)
          handleSuccess();
        }
      } else {
        handleRequestError(res.data.msg);
      }
    },
    onError(err:string) {
      console.log('onError', err);
      if (err.includes("timeout")) {
        handleTimeout();
      } else {
        handleServerError();
      }
    },
  };

  // response modal
  const {
    status,
    showModal,
    handleServerError,
    handleNetworkError,
    handleRequestError,
    handleSuccess,
    handleTimeout,
  } = useHandleResponse();

  return (
    <>
    <Upload beforeUpload={onBeforeUpload} {...uploadProps} className={className}>
      <div className="orgLogo">
        <div className="orgLogo__mask">
          <EditIcon className='orgLogo__mask__editIcon' />
        </div>
        <img className='orgLogo__img' 
          src={imageSrc} 
          alt="logo" 
        />
      </div>
    </Upload>

    {/* response modal */}
    <HandleResponseComponent status={status} successMsg="Uploaded successfully" failureMsg = "Uploade failed" loadingMsg="Loading" />

    </>
  )
}
