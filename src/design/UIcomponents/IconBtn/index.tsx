import addIcon from './add.png';
import deleteIcon from './delete.png';
import enterIcon from './enter.png';
import delIcon from './del.png';
import { ReactComponent as EditIcon } from "./edit.svg";
import { IconBtnSize, IconBtnType } from '../../../config/unifyUI';
import './index.css';

export interface IconBtnProps {
    type: string,
    size?: string,
}

export default function IconBtn(props: IconBtnProps) {
    const { type, size } = props;
    const _size = size ? size : 'medium';

    function switchStyle() {
        switch (type) {
            case IconBtnType.Edit:
                return 'edit_icon';
            case IconBtnType.Enter:
                return 'enter_icon';
            case IconBtnType.Delete:
                return 'delete_icon';
            case IconBtnType.Add:
                return 'add_icon';
            case IconBtnType.Del:
                return 'del_icon';
            default:
                return 'edit_icon';
        }
    }

    // function switchIcon() {
    //     switch (type) {
    //         case IconBtnType.Edit:
    //             return editIcon;
    //         case IconBtnType.Enter:
    //             return enterIcon;
    //         case IconBtnType.Delete:
    //             return deleteIcon;
    //         case IconBtnType.Add:
    //             return addIcon;
    //         case IconBtnType.Del:
    //             return delIcon;
    //         default:
    //             return editIcon;
    //     }
    // }

    function switchSize() {
        switch (_size) {
            case IconBtnSize.S:
                return {
                    width: '22px',
                    height: '22px'
                }
            case IconBtnSize.M:
                return {
                    width: '28px',
                    height: '28px'
                }
            default:
                break;
        }
    }

    function switchIconSize() {
        switch (_size) {
            case IconBtnSize.S:
                return {
                    width: '15px',
                    height: '15px'
                }
            case IconBtnSize.M:
                return {
                    width: '22px',
                    height: '22px'
                }
            default:
                break;
        }
    }

    return (
        <div
            id='icon_btn'
            className={switchStyle()}
            style={switchSize()}
        >
            <EditIcon style={switchIconSize()} />
            {/* <img src={switchIcon()} style={switchIconSize()} /> */}
        </div>
    )
}
