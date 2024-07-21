/* eslint-disable no-debugger */
import { calcPosFromAngles } from "@react-three/drei"
import { useState } from "react"
import useSWR from "swr"
import { getUserList } from "../../../api/orgPage"
import { useOrgPageStore } from "../../../state/OrgPageState"
import { Member } from "../../../types/orgPage"
import { Hits } from "../../../design/Orgnization/auto_complete"
import Input from "../../../design/Orgnization/input"
import UserName from "../../../design/Orgnization/username"

import './index.css'
const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore
useOrgSettingPageStore.subscribe((state) => {
    console.log(state)
})
export default function PositionAndMember() {
    const { positions, members } = useOrgSettingPageStore()
    return (
        <div className="position-and-member">
            <div className="position-box">
                <label>Position</label>
                <div className="row">
                    {positions.map((v, idx) => {
                        return <PositionItem key={idx} position={v} />
                    })}
                    <PositionAddBtn />
                </div>
                <div>Drag and drop to assign the Position for member</div>
            </div>
            <div className="member-box">
                <label>Member</label>
                <div className="members">
                    {members.map((v, idx) => {
                        return <MemberItem member={v} key={idx} />
                    })}
                    <MemberAddBtn />
                </div>
            </div>
        </div>
    )
}
function PositionAddBtn() {
    const [onAdding, setOnAdding] = useState(false)
    const [word, setWord] = useState("")
    const { addPosition } = useOrgSettingPageStore()
    return (
        <>
            {onAdding ? <input onChange={(e) => setWord(e.target.value)} /> : <button onClick={() => setOnAdding(true)} >add</button>}
            {onAdding && word && <button onClick={() => {
                addPosition(word)
                setOnAdding(false)
            }}>finish</button>}
        </>
    )
}
function MemberAddBtn() {
    const [onAdding, setOnAdding] = useState(false)
    const [word, setWord] = useState("")
    const { addMember } = useOrgSettingPageStore()
    const { data, error } = useSWR(['/community/organization/userList', word], getUserList)
    //todo search box
    let content
    if (error) content = (<div>error</div>)
    else if (!data) content = (<div>loading</div>)
    else
        content = (<Hits onSelect={(hit: any) => {
            addMember({ userName: hit.userName, positions: [], userId: hit.userId, avatar: hit.avatar })
            setOnAdding(false)
            setWord("")
        }} options={data.map((v: any) => ({ ...v, keyword: word }))} notFoundContent={<>no results</>}></Hits>)
    return (
        <div className="btn add-member">
            {onAdding ?
                <div className='search-box' >
                    <input onChange={(e) => { setWord(e.target.value) }} />
                    {content}
                </div>
                : <button onClick={() => setOnAdding(true)} >More</button>}
        </div>
    )
}

function PositionItem({
    position,
}: {
    position: string
}) {
    const { delPosition, updatePosition } = useOrgSettingPageStore()
    const [hovered, setHovered] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [word, setWord] = useState(position)
    return (
        <div className="position-item" draggable
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => {
                setHovered(true)
            }}
            onMouseLeave={() => setHovered(false)}
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', position)
            }}>
            {isEditing ? <Input word={word} setWord={setWord} /> : position}
            {hovered && <button className="del-position-btn" onClick={() => delPosition(position)}>del</button>}
            {isEditing && <button className="finish-btn" onClick={(e) => {
                setIsEditing(false)
                updatePosition(position, word)
                e.stopPropagation()
            }}>finish</button>}
        </div>
    )
}

function MemberItem({
    member
}: {
    member: Member
}) {
    const { delMember, updateMember } = useOrgSettingPageStore()
    const [selected, setSelected] = useState(false)
    return (
        <div className="member-item"
            onClick={() => setSelected(!selected)}
            onDragOver={e => e.preventDefault()} onDrop={
                (e) => {
                    const position = e.dataTransfer.getData('text')
                    member?.positions?.push(position)
                    updateMember(member, member)
                }
            }>
            <div className="left">
                <div className="avatar" />
            </div>
            <div className="right">
                <UserName userName={member?.userName} />
                <div className="positions">
                    {member?.positions?.map((v, idx) => {
                        return <div className="position" key={idx}>{v}</div>
                    })}
                    {member?.positions === undefined || member?.positions.length === 0 ? <span>No Position</span> : null}
                </div>
            </div>
            {selected && <button className="btn del-member" onClick={() => delMember(member)}>del</button>}
        </div>
    )
}