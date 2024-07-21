import { animated, useTransition } from '@react-spring/web';
import { fadeConfig, FadeOut1 } from '../../../config/animation';
import './index.css';

export default function FeedItem({children}) {
    const transitions = useTransition(true, fadeConfig(FadeOut1));

    return transitions(
        (styles, item) => item &&
            <animated.div className='feed_item' style={styles}>
                {children}
            </animated.div>
    )
}
