import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { ReactComponent as SearchLogo } from "./search.svg";
import IconBtn from '../../../../design/UIcomponents/IconBtn';
import { IconBtnSize, IconBtnType } from '../../../../config/unifyUI';
import { getTextareaLineCount } from '../../../../utils/public';
import { WORDS_NUM_LIMIT } from '../../../../config/homePage';

export interface PubContentStep2Props {
    title: string;
    describe: string;
    at: string[];
    classi: string[];
    handleSetDescribe: (e: any) => void;
    handleSetAt: (ats: string) => void;
    handleSetClassi: (classis: string) => void;
    deleteAt: (e: any, i: number) => void;
    deleteClassi: (e: any, i: number) => void;
    editTitle: (step: number) => void;
}

export interface classiClass {
    cla: string;
    hot: number;
}

export interface atClass {
    at: string;
    id: string;
}

const SEARCH_CLA = 'Search classification';
const SEARCH_AT = 'Search user name';

const CONTEXT = 'What do you want to talk about?';

// 模拟下模糊匹配的数据
const optionAt: atClass[] = [
    {
        at: 'MarkLee',
        id: '1234'
    }, {
        at: 'MarkLee',
        id: '1111'
    }, {
        at: 'MarkLee',
        id: '1114'
    }, {
        at: 'JimLee',
        id: '2254'
    }, {
        at: 'JimLee',
        id: '1334'
    }, {
        at: 'MinMax',
        id: '1334'
    }, {
        at: 'MinMax',
        id: '1328'
    }
];
const optionClassi: classiClass[] = [
    {
        cla: 'bbbb',
        hot: 1123
    }, {
        cla: 'Bob',
        hot: 342
    }, {
        cla: 'Ghoisdj',
        hot: 43
    }, {
        cla: 'Bifosd',
        hot: 98
    }, {
        cla: 'Mobsh',
        hot: 999
    }, {
        cla: 'Mobhhhh',
        hot: 999
    }, {
        cla: 'haoren',
        hot: 3
    }
];

export default function PubContentStep2(props: PubContentStep2Props) {
    const {
        title,
        describe,
        at,
        classi,
        handleSetDescribe,
        handleSetAt,
        handleSetClassi,
        deleteAt,
        deleteClassi,
        editTitle
    } = props;

    const [mtcAts, setMtcAts] = useState<atClass[]>(optionAt);
    const [mtcClassis, setMtcClassis] = useState<classiClass[]>(optionClassi);
    const [atIpt, setAtIpt] = useState('');
    const [classiIpt, setClassiIpt] = useState('');
    const [editAt, setEditAt] = useState(false);
    const [editClassi, setEditClassi] = useState(false);
    const [rows, setRows] = useState(8);

    const iptRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        initTextareaRows(describe);
    }, []);

    // 过滤匹配at的结果
    function filterMatchAtValue(value: string) {
        const matchValues: atClass[] = [];
        optionAt.forEach(s => {
            if (s.at.search(value) > -1) {
                matchValues.push(s);
            }
        })
        setMtcAts(matchValues);
    }

    function filterMatchClassiValue(value: string) {
        const matchValues: classiClass[] = [];
        optionClassi.forEach(s => {
            if (s.cla.search(value) > -1) {
                matchValues.push(s);
            }
        })
        setMtcClassis(matchValues);
    }

    // 编辑at的名字
    function editAtName() {
        if (editAt === false && editClassi === false) {
            setEditAt(true);
            setMtcAts(optionAt);
            iptRef.current?.focus();
        }
    }

    function editClassiTitle() {
        if (editAt === false && editClassi === false) {
            setEditClassi(true);
            setMtcClassis(optionClassi);
            iptRef.current?.focus();
        }
    }

    // 选中一个at的名字
    function selectAtName(item: atClass) {
        const ipt = `${item.at}#${item.id}`;
        setAtIpt(ipt);
        setMtcAts([]);
        handleSetAt(ipt);
        stopEdit();
    }

    function selectClassiName(item: classiClass) {
        const ipt = item.cla;
        setClassiIpt(ipt);
        setMtcClassis([]);
        handleSetClassi(ipt);
        stopEdit();
    }

    // 关闭编辑弹窗停止编辑
    function stopEdit() {
        setEditAt(false);
        setEditClassi(false);
        setAtIpt('');
        setClassiIpt('');
    }

    // 编辑at或者classification时监听输入的值
    function handleChangeIpt(e: React.ChangeEvent<HTMLDivElement>) {
        const value = (e.target as any).value;
        editAt ? setAtIpt(value) : setClassiIpt(value);
        editAt ? filterMatchAtValue(value) : filterMatchClassiValue(value);
    }

    // 监听Enter键
    function handleAddItem(e: React.KeyboardEvent<HTMLDivElement>) {
        const value = (e.target as any).value;
        if (e.key === 'Enter' && value) {
            editAt ? handleSetAt(value) : handleSetClassi(value);
            stopEdit();
        }
    }

    // 监听输入describe的值 -> 设置describe -> 文本域的样式进行响应
    function handleChangeDescribe(e: any) {
        const value = e.target.value;
        if (value.length > WORDS_NUM_LIMIT) {
            return;
        }
        const lineCount = getTextareaLineCount(value);
        setTextareaRows(lineCount);
        handleSetDescribe(e);
    }

    // 初始化文本域的行数
    function initTextareaRows(value: string) {
        const lineCount = getTextareaLineCount(value);
        setTextareaRows(lineCount);
    }

    // 根据文本的行数设置文本域的行数
    function setTextareaRows(lineCount: number) {
        if (lineCount > 8 && lineCount < 24) {
            setRows(lineCount);
        } else if (lineCount <= 8) {
            setRows(8);
        } else if (lineCount >= 24) {
            setRows(24);
        }
    }

    function renderDescribe() {
        return (
            <textarea
                id='textare_text'
                placeholder={CONTEXT}
                value={describe}
                rows={rows}
                cols={79}
                onChange={(e: any) => handleChangeDescribe(e)}
            />
        )
    }

    // 渲染编辑的弹窗
    function renderPopUp() {
        const CHOOSE = editAt ? 'Choose User' : 'Choose classification';
        return (
            <div className='PubContentStep2_popUp'>
                <div className='PubContentStep2_popUpTop'>
                    <div>{CHOOSE}</div>
                    <div className='PubContentStep2_closebtn' onClick={() => stopEdit()}>
                        ×
                    </div>
                </div>
                <div className='PubContentStep2_popUpSearch'>
                    <SearchLogo />
                    <div id='PubContentStep2_iptBbox'>
                        <input
                            ref={iptRef}
                            className='PubContentStep2_iptContent'
                            placeholder={editAt ? SEARCH_AT : SEARCH_CLA}
                            value={editAt ? atIpt : classiIpt}
                            onChange={(e: any) => handleChangeIpt(e)}
                            onKeyDown={(e: any) => handleAddItem(e)}
                        />
                    </div>
                </div>
                {editClassi ? renderClassiItem(mtcClassis) : null}
                {editAt ? renderAtItem(mtcAts) : null}
            </div>
        )
    }

    function renderAtItem(option: atClass[]) {
        return (
            <div className='PubContentStep2_popUpContent'>
                {
                    option.map(item => {
                        return (
                            <div
                                id='PubContentStep2_chooseItem'
                                key={`${item.at}-${item.id}`}
                                onClick={() => { selectAtName(item) }}
                            >
                                <span>{item.at}</span>
                                <span style={{ color: '#989899' }}>#{item.id}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function renderClassiItem(option: classiClass[]) {
        return (
            <div className='PubContentStep2_popUpContent'>
                {
                    option.map(item => {
                        return (
                            <div
                                id='PubContentStep2_chooseItem'
                                key={`${item.cla}-${item.hot}`}
                                style={{ justifyContent: 'space-between', paddingRight: 20 + 'px' }}
                                onClick={() => { selectClassiName(item) }}
                            >
                                <span>{item.cla}</span>
                                <span style={{ color: item.hot >= 1000 ? '#FF7E7E' : '#ffffff' }}>{item.hot}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function renderAtUsers() {
        return (
            <div className='PubContentStep2_mentionUsers'>
                <span style={{ color: '#89898a' }}>Mentioned user : </span>
                {
                    at.map((item, index) => {
                        return (
                            <div key={item}>
                                <span>{item}</span>
                                <span
                                    contentEditable={true}
                                    suppressContentEditableWarning
                                    onKeyDown={(e: any) => { deleteAt(e, index) }}
                                >
                                    &nbsp;
                                </span>
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
                    classi.map((item, index) => {
                        return (
                            <div key={item}>
                                <span>#{item}</span>
                                <span
                                    contentEditable={true}
                                    suppressContentEditableWarning
                                    onKeyDown={(e: any) => { deleteClassi(e, index) }}
                                >
                                    &nbsp;
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    // 字数控制
    function renderWordsNumTip() {
        return (
            WORDS_NUM_LIMIT - describe.length <= 50 ? (
                <div>
                    <span style={{ color: '#969696' }}>Enterable characters: </span>
                    <span style={{ color: '#ff5151' }}>{WORDS_NUM_LIMIT - describe.length}</span>
                </div>
            ) : null
        )
    }

    return (
        <div>
            <div className='about_idea'>
                {(editAt || editClassi) ? renderPopUp() : null}
                <div id='edit_title'>
                    <span style={{ color: '#ffffff' }}>{title}</span>
                    <div onClick={() => editTitle(2)}>
                        <IconBtn type={IconBtnType.Edit} size={IconBtnSize.S} />
                    </div>
                </div>
                <div id='textare_box'>
                    {renderDescribe()}
                    <div className='PubContentStep2_supply'>
                        {at.length > 0 ? renderAtUsers() : null}
                        {classi.length > 0 ? renderClassiName() : null}
                    </div>
                    <div className='PubContentStep2_footfunc'>
                        <div className='add_extra'>
                            <div className='add_at' onClick={() => { editAtName() }}>@</div>
                            <div className='add_topic' onClick={() => { editClassiTitle() }}>#</div>
                        </div>
                        {renderWordsNumTip()}
                    </div>
                </div>
            </div>
        </div>
    )
}
