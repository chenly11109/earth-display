import './index.css';
import { convertTextare } from '../../../../utils/public';
import { WORDS_NUM_LIMIT } from '../../../../config/homePage';

export interface PubContentStep3Props {
    describe: string;
    introduce: string;
    at: string[];
    classi: string[];
    handleIntroduceText: (e: any) => void;
    editDescribe: (step: number) => void;
}

const CONTEXT = 'Please briefly introduce your idea';

export default function PubContentStep3(props: PubContentStep3Props) {
    const { describe, introduce, at, classi, handleIntroduceText, editDescribe } = props;

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

    function renderWordsNumTip() {
        return (
            WORDS_NUM_LIMIT - introduce.length <= 50 ? (
                <div className='PubContentStep3_wordsnumtip'>
                    <span style={{ color: '#969696' }}>Enterable characters: </span>
                    <span style={{ color: '#ff5151' }}>{WORDS_NUM_LIMIT - introduce.length}</span>
                </div>
            ) : null
        )
    }

    return (
        <div>
            <div id='idea_text' onClick={() => editDescribe(3)}>
                <div className='PubContentStep3_describe'>
                    {
                        convertTextare(describe).map(item => {
                            return (
                                <div
                                    key={`idea-${item}`}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
                {(at.length > 0 || classi.length > 0) ? <br /> : null}
                {at.length > 0 ? renderAtUsers() : null}
                {classi.length > 0 ? renderClassiName() : null}
            </div>
            <div className='inspire_box'>
                <span style={{ color: '#ffffff' }}>{CONTEXT}</span>
                <div id='textare_box'>
                    <textarea
                        id='textare_text'
                        placeholder={CONTEXT}
                        rows={10}
                        cols={80}
                        value={introduce}
                        onChange={(e) => { handleIntroduceText(e) }}
                    />
                    {renderWordsNumTip()}
                </div>
            </div>
        </div>
    )
}
