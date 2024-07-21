import './index.css';

export interface PubContentStep1Props {
    title: string;
    handleSetTitle: (e: any) => void;
}

const CONTEXT = 'Input Idea Title';

export default function PubContentStep1(props: PubContentStep1Props) {
    const { title, handleSetTitle } = props;

    return (
        <div>
            <div className='share_idea'>
                <p>Idea Title</p>
            </div>
            <div className='title_ipt'>
                <input
                    className='share_title'
                    placeholder={CONTEXT}
                    value={title}
                    onChange={(e: any) => handleSetTitle(e)}
                    onKeyDown={(e: any) => handleSetTitle(e)}
                />
            </div>
        </div>
    )
}
