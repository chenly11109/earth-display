import { animated, useTransition } from '@react-spring/web';
import { fadeConfig, FadeOut1 } from '../../../config/animation';
import { useEarthStore } from '../../../state/earthMode';
import './index.css';

export default function InfoContent() {
    const transitions = useTransition(true, fadeConfig(FadeOut1));
    const selectedId = useEarthStore(state=>state.selectedId);
    const project = useEarthStore(state=>state.anchorPoints).find(project=>project.id === selectedId);
    return transitions(
        (styles, item) => item &&
            <animated.div className='info_content' style={styles}>
                
                <div>{project&&("projectID : " + project.id)}</div>
                <div>{project&&("City : "+project.data)}</div>
            </animated.div>
    )
}
