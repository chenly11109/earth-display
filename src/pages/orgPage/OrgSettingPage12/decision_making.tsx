import { useOrgPageStore } from "../../../state/OrgPageState"
import { Decision } from "../../../types/orgPage"

//目的是减少导入 导入太多影响项目的构建速度、IDE的分析速度
const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore//一旦获取就不会再更新
useOrgSettingPageStore.subscribe(state => {
    console.log(state)
})
//TODO - 通过判断decision的username是否是创建者的username来判断哪一个member是me
export default function DecisionMaking() {
    const { decisions } = useOrgSettingPageStore()
    return (
        <div className="decision-making">
            <label>Decision-Making Workflow</label>
            <div className="decisions">
                {decisions.map((v, idx) => {
                    return (<DecisionItem decision={v} key={idx} />)
                })}
            </div>
            <button>More</button>
        </div>
    )
}
function DecisionItem({
    decision
}: {
    decision: Decision
}) {
    let members = ""
    if (decision.type === 'Custom') {
        for (let i = 0; i < decision.members.length; i++) {
            members += `${decision.members[i].userName}:${decision.members[i].percent}%`
            if (i !== decision.members.length - 1) members += ' , '
        }
    }
    else {
        for (let i = 0; i < decision.members.length; i++) {
            members += `${decision.members[i].userName}`
            if (i !== decision.members.length - 1) members += ' , '
        }
    }
    return (
        <div className="decision-item">
            <div className="decision-item_title">
                {decision.title}
            </div>
            <div className="content">
                {decision.assetType && <div className="assettype">{decision.assetType}</div>}
                <div className="type">{decision.type}-</div>
                <div className="members">{members}</div>
            </div>
        </div>
    )
}