import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PointInfo from '../../design/CanvasType/PointInfo';
import PointName from '../../design/PointName';
import { EarthModeContext } from '../../state/EarthModeProvider(archieve)';
import { pubsub } from '../../state/PubSub';
import './index.css';

export default function DetailPage() {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const globalServices = useContext(EarthModeContext);

    const { send } = globalServices.earthService;

    useEffect(() => {
        const unsubName = pubsub.on('pointName', (value) => {
            setName(value);
        })
        const unsubInfo = pubsub.on('pointInfo', (value) => {
            setInfo(value);
        })

        return () => {
            unsubName
            unsubInfo
        }
    }, [])

    function backToInfo() {
        send({ type: 'TOINFO' });
        pubsub.emit('init', '');
    }

    return (
        <div className='detail_container'>
            <Link to='/info'>
                <div className='detail_back' onClick={backToInfo}>Back</div>
            </Link>
            {
                name ? (
                    <div className='box_name'>
                        <PointName name={name} />
                    </div>
                ) : null
            }
            {
                info ? (
                    <PointInfo />
                ) : null
            }
        </div>
    )
}
