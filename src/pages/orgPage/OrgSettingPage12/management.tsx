import classNames from "classnames"
import { useEffect, useState } from "react"
import { useOrgPageStore } from "../../../state/OrgPageState"
import { Authority, Decision } from "../../../types/orgPage"
import Modal, { ModalProps } from "../../../design/Orgnization/modal"
import List from "../../../design/Orgnization/list"
import { Radio, RadioGroup } from "../../../design/Orgnization/radio"
import Row from "../../../design/Orgnization/row"
import { Switch } from "../../../design/Orgnization/switch"
import { Tab } from "../../../design/Orgnization/tab"

const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore
useOrgSettingPageStore.subscribe(state => {
    console.log(state)
})
const tabs = ['Decentralized Operated Project', 'Asset', 'Member', 'Basic']
function Management({
    showWarningStyle
}: {
    showWarningStyle: boolean
}) {
    const [type, setType] = useState(0)
    const { authorities } = useOrgSettingPageStore()
    return (
        <div className="management">
            <div className="setting-title">Decentralized Organization Setting</div>
            <List className="tab-bar" data={tabs} idx={type} setIdx={setType} align='horizontal' />
            <div className="auths">
                {authorities.settings[type].options.map(auth => {
                    return <AuthCard auth={auth} key={auth.name} showWarningStyle={showWarningStyle} />
                })}
            </div>
        </div>
    )
}

function AuthCard({
    auth,
    showWarningStyle
}: {
    auth: Authority,
    showWarningStyle: boolean
}) {
    const [showSettingModal, setShowSettingModal] = useState(false)
    const { positions, decisions, forceupdate } = useOrgSettingPageStore()

    return <div className={classNames('auth-card', { warn: showWarningStyle && !auth.data })} onClick={() => setShowSettingModal(true)}>
        <div className="row">
            <div className="left">
                <span className="auth-name">{auth.name}</span>
            </div>
            <div className="right">
                <span>public</span>
                <Switch checked={auth.isPublic} onClick={(e) => {
                    auth.isPublic = !auth.isPublic
                    e.stopPropagation()
                    forceupdate()
                }} />
            </div>
        </div>
        <AuthData auth={auth} />
        {showSettingModal && <AuthModal auth={auth} setVisible={setShowSettingModal} />}
    </div>
}
function AuthModal({ auth, setVisible }: {
    auth: Authority
    setVisible: (visible: boolean) => void
}) {
    const { positions, decisions, forceupdate } = useOrgSettingPageStore()
    const [tempType, setTempType] = useState<'position' | 'workflow'>()
    const [tempAuthorizer, setTempAuthorizer] = useState<any[]>([])
    const [tempIsPublic, setTempIsPublic] = useState<boolean | undefined>()

    useEffect(() => {
        setTempType(auth.data?.type)
        setTempIsPublic(auth.isPublic)
        if (auth.data)
            setTempAuthorizer([...auth.data.authorizer])
    }, [])

    function commit() {
        if (tempType) {
            if (auth.data) {
                auth.data.type = tempType
                auth.data.authorizer = tempAuthorizer
            } else {
                auth.data = {
                    type: tempType,
                    authorizer: tempAuthorizer
                }
            }
        }
        auth.isPublic = tempIsPublic
        forceupdate()
    }

    return <div className='auth-card-modal'>
        <Row
            left={<label>{auth.name}</label>}
            right={<><span>public</span><Switch checked={tempIsPublic} onClick={() => {
                setTempIsPublic(!tempIsPublic)
            }} /></>}
        />
        <label>Decision object</label>
        <RadioGroup value={tempType} onChange={(value) => {
            setTempType(value)
            setTempAuthorizer([])
        }}>
            <Radio value={'position'}>Position</Radio>
            <Radio value={'workflow'}>Workflow</Radio>
        </RadioGroup>
        {tempType === 'position' && <div className="position-tab-bar">
            {positions.map((position, idx) => {
                return (
                    <Tab defaultChecked={tempAuthorizer?.includes(position)} key={idx} onChange={(checked) => {
                        if (checked) setTempAuthorizer([...tempAuthorizer, position])
                        else setTempAuthorizer(tempAuthorizer.filter(item => item !== position))
                    }}>{position}</Tab>
                )
            })}
        </div>}
        {tempType === 'workflow' && <div className="workflow-list">
            {decisions.map((v, idx) => {
                return (
                    <Tab defaultChecked={tempAuthorizer?.includes(v)} key={idx} onChange={(checked) => {
                        if (checked) setTempAuthorizer([...tempAuthorizer, v])
                        else setTempAuthorizer(tempAuthorizer.filter(item => item !== v))
                    }}>{v.title}</Tab>
                )
            })}
        </div>}
        <footer>
            <Row
                left={<button onClick={(e) => {

                    setVisible?.(false)
                    e.stopPropagation()//阻止触发父组件click事件
                }}>Back</button>}
                right={<button onClick={(e) => {
                    commit()
                    setVisible?.(false)
                    e.stopPropagation()//阻止触发父组件click事件
                }}>Save</button>}
            />
        </footer>
    </div>
}
function AuthData({ auth }: { auth: Authority }) {
    if (auth.data) {
        if (auth.data.type === 'position') {
            return <span className="auth-data">
                <span className="auth-type">Decision by position:</span>
                {auth.data.authorizer.map((data, idx) => {
                    const text = (idx !== 0 ? "," : "") + data
                    return <span className={classNames("auth-authorizer", { highlight: data === 'CEO' })} key={idx}>{text}</span>
                })}
            </span>
        } else {
            return <span className="auth-data">
                <span className="auth-type">Decision by D-M Workflow:</span>
                {auth.data.authorizer.map((data, idx) => {
                    const text = (idx !== 0 ? "," : "") + (data as Decision).title
                    return <span className={classNames("auth-authorizer")} key={idx}>{text}</span>
                })}
            </span>
        }
    }
    else {
        return <span className="auth-data">Not set</span>
    }
}
export default Management