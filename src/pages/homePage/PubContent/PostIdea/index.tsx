import { convertTextare } from '../../../../utils/public';
import './index.css';
import IconBtn from '../../../../design/UIcomponents/IconBtn';
import { IconBtnSize, IconBtnType } from '../../../../config/unifyUI';

export interface PostIdeaProps {
    title: string;
    describe: string;
    at: string[];
    classi: string[];
    introduce: string;
    editTitle: (step: number) => void;
    editIntroduce: (step: number) => void;
    editDescribe: (step: number) => void;
}

export default function PostIdea(props: PostIdeaProps) {
    const { title, describe, at, classi, introduce, editTitle, editIntroduce, editDescribe } = props;

    function renderAtUsers() {
        return (
            <div className='PubContentStep2_mentionUsers'>
                <span style={{ color: '#89898a' }}>Mentioned user : </span>
                {
                    at.map(item => {
                        return (
                            <div key={item}>
                                <span>{item}</span>
                                <span>&nbsp;</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function renderClassiName() {
        return (
            <div className='PubContentStep2_aboutClassis'>
                {
                    classi.map(item => {
                        return (
                            <div key={item}>
                                <span>#{item}</span>
                                <span>&nbsp;</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            <div id='edit_title'>
                <span style={{ color: '#ffffff' }}>{title}</span>
                <div onClick={() => editTitle(4)}>
                    <IconBtn type={IconBtnType.Edit} size={IconBtnSize.S} />
                </div>
            </div>
            {
                introduce.length > 0 ? (
                    <p id='inspire_text' className='introduce' onClick={() => editIntroduce(4)}>
                        {
                            convertTextare(introduce).map(i => {
                                return (
                                    <div className='PostIdea_describeline' key={`introduce-${i}`}>{i}</div>
                                )
                            })
                        }
                    </p>
                ) : null
            }
            <div id='idea_text' className='describe' onClick={() => editDescribe(4)}>
                {
                    convertTextare(describe).map(i => {
                        return (
                            <div className='PostIdea_describeline' key={`describe-${i}`}>{i}</div>
                        )
                    })
                }
                {(at.length > 0 || classi.length > 0) ? <br /> : null}
                {at.length > 0 ? renderAtUsers() : null}
                {classi.length > 0 ? renderClassiName() : null}
            </div>
        </div>
    )
}
