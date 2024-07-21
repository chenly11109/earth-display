import { animated, useTransition } from '@react-spring/web';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fadeConfig, FadeOut1 } from '../../../config/animation';
import './index.css';

export default function PointInfo() {
    const transitions = useTransition(true, fadeConfig(FadeOut1));
    const [x, setX] = useState(1100);
    const [y, setY] = useState(30);

    // 拖拽卡片
    function handleMouseDown(e: any) {
        const disx = e.pageX - x;
        const disy = e.pageY - y;

        document.onmousemove = function (e) {
            setX(e.pageX - disx);
            setY(e.pageY - disy);
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmousedown = null;
        }
    }

    return transitions(
        (styles, item) => item &&
            <animated.div style={styles}>
                <div className='point_info' style={{ left: x + 'px', top: y + 'px' }}>
                    <div
                        className='drag_bar'
                        onMouseDown={handleMouseDown}
                    ></div>
                    <div className='box_content'></div>
                    <div className='box_btn'>
                        <Link to='/info'>
                            <div className='learn_more'>
                                <p className='learn_text'>Learn More</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </animated.div>
    )
}
