import './index.css';

export interface IptProps {
    context: string
}

export default function Ipt(props: IptProps) {
    const { context } = props;

    return (
        <div>
            <input type="text" />
        </div>
    )
}
