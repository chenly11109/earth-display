import { useEffect, useState } from "react"
import { useOrgPageStore } from "../../../state/OrgPageState"
// import { ImageUploader } from "../CreateOrgPage/components/image_uploader"
import Input from "../../../design/Orgnization/input"
import TextArea from "../../../design/Orgnization/textarea"
import { orgValidator } from "../CreateOrgPage/validator"
const useOrgSettingPage = useOrgPageStore.getState().OrgSettingPageStore
export function BasicInfo() {
    const { logo, setLogo, name, setName, intro, setIntro, authorities } = useOrgSettingPage()
    const [isEdittingName, setIsEditingName] = useState(false)
    useEffect(() => {
        const listener = () => setIsEditingName(false)
        window.addEventListener('click', listener)
        return () => window.removeEventListener('click', listener)
    })
    return (
        <div className='basic-info right-pane'>
            <div className="row">
                {/* <ImageUploader setImg={setLogo}>
                    <div className='edit-icon'>edit</div>
                </ImageUploader> */}
                {isEdittingName ? <Input word={name} setWord={setName} validator={orgValidator.nameValidator} /> : <span>{name}</span>}
                <div className='edit-icon' onClick={(e) => {
                    setIsEditingName(true)
                    e.stopPropagation()
                }}>edit</div>
            </div>
            <span>Description</span>
            <TextArea word={intro} setWord={setIntro} maxLength={150} warningLength={50} placeholder='No introduction yet' />
        </div>
    )
}
export default BasicInfo