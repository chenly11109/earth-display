import { TextBtnType } from '../../../config/unifyUI';
import './index.css';

export interface TextBtnProps {
    title: string,
    type?: string,
    clickable?: boolean
}

export default function TextBtn(props: TextBtnProps) {
    const { title, type, clickable } = props;
    const click = clickable === undefined ? true : clickable;

    function switchStyle() {
        switch (type) {
            case TextBtnType.Next:
                return 'next_btn';
            case TextBtnType.Skip:
                return 'skip_btn';
            case TextBtnType.Create:
                return 'create_btn';
            case TextBtnType.Condition:
                return 'condition_btn';
            case TextBtnType.ChooseA:
                return 'choose_btn';
            case TextBtnType.CreTag:
                return 'creTag_btn';
            case TextBtnType.Transfer:
                return 'transfer_btn';
            case TextBtnType.Done:
                return 'done_btn'
            default:
                return 'next_btn';
        }
    }

    return (
        <div
            id='btn'
            className={switchStyle()}
            style={click ? {} : { border: '1px solid #717778', color: '#717778', backgroundImage: 'none', backgroundColor: 'rgba(255,255,255,0)' }}
        >
            {title}
        </div>
    )
}
