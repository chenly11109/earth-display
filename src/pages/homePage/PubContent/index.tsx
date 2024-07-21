import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import PubContentStep1 from './PubContentStep1';
import PubContentStep3 from './PubContentStep3';
import PostIdea from './PostIdea';
import TextBtn from '../../../design/UIcomponents/TextBtn';
import { TextBtnType } from '../../../config/unifyUI';
import PubContentStep2 from './PubContentStep2';
import { WORDS_NUM_LIMIT } from '../../../config/homePage';

export interface PubContentProps {
    visible?: boolean;
    closePub: () => void;
}

export default function PubContent(props: PubContentProps) {
    const { visible, closePub } = props;

    const [step, setStep] = useState(1); // 发布的步骤流程
    const [hisStep, setHisStep] = useState(1); // 用于存储返回修改的页面位置
    const [next, setNext] = useState(false); // 是否显示next按钮 || 是否可点击状态
    const [skip, setSkip] = useState(false); // 是否显示skip按钮

    const [title, setTitle] = useState(''); //step1
    const [introduce, setIntroduce] = useState(''); //step3
    const [describe, setDescribe] = useState(''); //step2
    const [at, setAt] = useState<string[]>([]); //step2
    const [classi, setClassi] = useState<string[]>([]); //step2

    const [tmpTitle, setTmpTitle] = useState('');
    const [tmpIntro, setTmpIntro] = useState('');
    const [tmpDescri, setTmpDescri] = useState('');
    const [tmpAt, setTmpAt] = useState<string[]>([]);
    const [tmpClassi, setTmpClassi] = useState<string[]>([]);

    const [popWin, setPopWin] = useState(false); // 是否显示关闭的弹窗

    // 监听step1中输入title的值
    function handleSetTitle(e: any) {
        const value = e.target.value;
        if (value) {
            setNext(true);
        } else {
            setNext(false);
        }
        if (value.length > 60) return;
        setTmpTitle(value);
    }

    // 监听step2中输入describe的值
    function handleSetDescribe(e: any) {
        const value = e.target.value;
        if (value) {
            setNext(true);
        } else {
            setNext(false);
        }
        setTmpDescri(value);
    }

    function handleSetAt(item: string) {
        const value = item.split('#')[0];
        setTmpAt([...tmpAt, value]);
    }

    function handleSetClassi(item: string) {
        setTmpClassi([...tmpClassi, item]);
    }

    // 删除Classification
    function deleteClassi(e: any, i: number) {
        const newClassi: string[] = [];
        if (e.key === 'Backspace') {
            tmpClassi.forEach((item, index) => {
                if (i !== index) {
                    newClassi.push(item);
                }
            })
            setTmpClassi(newClassi);
        }
    }

    // 删除at
    function deleteAt(e: any, i: number) {
        const newAt: string[] = [];
        if (e.key === 'Backspace') {
            tmpAt.forEach((item, index) => {
                if (i !== index) {
                    newAt.push(item);
                }
            })
            setTmpAt(newAt);
        }
    }

    // 监听step3中输入introduction的值
    function handleIntroduceText(e: React.ChangeEvent<HTMLDivElement>) {
        const value = (e.target as any).value;
        if (value) {
            setNext(true);
        } else {
            setNext(false);
        }
        if (value.length > WORDS_NUM_LIMIT) return;
        setTmpIntro(value);
    }

    // 点击skip按钮跳过当前步骤
    function toSkipStep() {
        setStep(step + 1);
        setNext(false);
        setIntroduce('');
    }

    // 点击next按钮进入下一个步骤，将缓存区的值正式赋给相应的字段
    function toNextStep() {
        if (next) {
            setStep(step + 1);
            if (step === 1) {
                setTitle(tmpTitle);
            } else if (step === 2) {
                setDescribe(tmpDescri);
                setAt(tmpAt);
                setClassi(tmpClassi);
            } else if (step === 3) {
                setIntroduce(tmpIntro);
            }
        }
        setNext(false);
        setSkip(true);
    }

    // 返回编辑title
    function editTitle(step: number) {
        setStep(5);
        setNext(true);
        setHisStep(step);
    }

    // 返回编辑describe
    function editDescribe(step: number) {
        setStep(6);
        setNext(true);
        setHisStep(step);
    }

    // 返回编辑introduction
    function editIntroduce(step: number) {
        setStep(7);
        setNext(true);
        setHisStep(step);
    }

    // 取消更改的内容并回到上个页面流程
    function cancleEdit() {
        setStep(hisStep);
        switch (step) {
            case 5:
                setTmpTitle(title);
                break;
            case 6:
                setTmpDescri(describe);
                setTmpAt(at);
                setTmpClassi(classi);
                break;
            case 7:
                setTmpIntro(introduce);
                break;
            default:
                break;
        }
    }

    // 保存更改的内容，将缓存区的值正式赋给相应的字段并回到上个页面流程
    function saveEdit() {
        if (!next) return;
        setStep(hisStep);
        switch (step) {
            case 5:
                setTitle(tmpTitle);
                break;
            case 6:
                setDescribe(tmpDescri);
                setAt(tmpAt);
                setClassi(tmpClassi);
                break;
            case 7:
                setIntroduce(tmpIntro);
                break;
            default:
                break;
        }
    }

    // 是否显示弹窗
    function whetherWarn() {
        if (title || describe) {
            setPopWin(true);
        } else {
            closePub();
        }
    }

    // 关闭发布页面，之前的编辑全部清空
    function stopPubContent() {
        setStep(1);
        setNext(false);
        setSkip(false);
        setTitle('');
        setIntroduce('');
        setDescribe('');
        setAt([]);
        setClassi([]);
        setTmpTitle('');
        setTmpIntro('');
        setTmpDescri('');
        setTmpAt([]);
        setTmpClassi([]);
        setPopWin(false);
        closePub();
    }

    function renderCard() {
        switch (step) {
            case 0:
            case 1:
            case 5:
                return (
                    <PubContentStep1 title={tmpTitle} handleSetTitle={handleSetTitle} />
                );
            case 2:
            case 6:
                return (
                    <PubContentStep2
                        title={title}
                        describe={tmpDescri}
                        at={tmpAt}
                        classi={tmpClassi}
                        handleSetDescribe={handleSetDescribe}
                        handleSetAt={handleSetAt}
                        handleSetClassi={handleSetClassi}
                        deleteAt={deleteAt}
                        deleteClassi={deleteClassi}
                        editTitle={editTitle}
                    />
                )
            case 3:
            case 7:
                return (
                    <PubContentStep3
                        describe={describe}
                        introduce={tmpIntro}
                        at={at}
                        classi={classi}
                        handleIntroduceText={handleIntroduceText}
                        editDescribe={editDescribe}
                    />
                )
            case 4:
                return (
                    <PostIdea
                        title={title}
                        describe={describe}
                        at={at}
                        classi={classi}
                        introduce={introduce}
                        editTitle={editTitle}
                        editIntroduce={editIntroduce}
                        editDescribe={editDescribe}
                    />
                )
            default:
                break;
        }
    }

    function renderPopWin() {
        if (!popWin) return;
        return (
            <div className='PubContent_popwin'>
                <div className='PubContent_popwinwarn'>
                    <text style={{ fontWeight: 'bold', fontSize: 16 + 'px' }}>Warning</text>
                    <text>Your edits will not be saved, please make</text>
                    <text>sure to exit</text>
                </div>
                <div style={{ display: 'flex' }}>
                    <div id='PubContent_popwinbtn' className='PubContent_popwindone' onClick={() => { stopPubContent() }}>Done</div>
                    <div id='PubContent_popwinbtn' className='PubContent_popwincancel' onClick={() => { setPopWin(false) }}>Cancel</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                visible ? (
                    <div className='pub_content'>
                        <div className='pub_top'>
                            <Link to='/home'>
                                <div className='pub_close' onClick={() => { whetherWarn() }}>×</div>
                            </Link>
                        </div>
                        <div className='edit_content'>
                            {renderCard()}
                            <div className='pub_foot'>
                                {
                                    skip && step === 3 ? (
                                        <div onClick={toSkipStep}>
                                            <TextBtn title='Skip' type={TextBtnType.Skip} />
                                        </div>
                                    ) : null
                                }
                                {
                                    step < 4 ? (
                                        <div onClick={toNextStep}>
                                            <TextBtn title='Next' type={TextBtnType.Next} clickable={next} />
                                        </div>
                                    ) : null
                                }
                                {
                                    step === 4 ? (
                                        <div>
                                            <TextBtn title='Post' type={TextBtnType.Create} />
                                        </div>
                                    ) : null
                                }
                                {
                                    step > 4 ? (
                                        <div onClick={cancleEdit}>
                                            <TextBtn title='Cancel' type={TextBtnType.Skip} />
                                        </div>
                                    ) : null
                                }
                                {
                                    step > 4 ? (
                                        <div onClick={saveEdit}>
                                            <TextBtn title='Save' type={TextBtnType.Next} clickable={next} />
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        {renderPopWin()}
                    </div>
                ) : null
            }
        </div>
    )
}
