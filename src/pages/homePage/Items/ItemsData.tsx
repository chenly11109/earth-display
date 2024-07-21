import { Tag } from "../../../types/feedItem"
import { ReactComponent as First } from './contentData/first.svg'
import { ReactComponent as Second } from './contentData/second.svg'
import { ReactComponent as Third } from './contentData/third.svg'
import { ReactComponent as Forth } from './contentData/forth.svg'
import { ReactComponent as Fifth } from './contentData/fifth.svg'
import './ItemsData.scss'

const ItemsData = [
    {
        type: 'Idea' ,
        tags: [Tag.NFT, Tag.DEFI],
        title: 'A safe, efficient, and decentralized NFT pool...',
        author: 'By:MarkLee',
        date: '06/14/2021',
        content: <div className="items-data-content">
            <p>
                <span>
                    26
                </span>
                <span>
                    Dop has been initiated based on this idea tread
                </span>
            </p>
            <p>
            A safe, efficient, and decentralized NFT pool-based lending center. With convenient NFT mortgage loans, users can also obtain income by providing liquidity to ensure the complete flow of funds.
            </p>
        </div>,
        view: '1.2k',
        like: 42,
        favorite: 42,
        share: 63,
    },
    {
        type: 'DOP' ,
        tags: [Tag.DEFI],
        title: 'Moi Swap',
        author: 'By:XOrganization',
        date: '06/14/2021',
        content: <Second width={576} height={356 - 148} />,
        view: '1.2k',
        favorite: 42,
        share: 63,
    },
    {
        type: 'Workflow' ,
        tags: [Tag.NFT, Tag.DAOFUND],
        title: 'Omnis - Follow Omnis on Instagram',
        date: '3 days ago',
        content: <Third width={576} height={260 - 148} />,
        view: '1.2k',
        favorite: 42,
        share: 63,
    },
    {
        type: 'DOP' ,
        tags: [Tag.DEFI, Tag.CrossChain, Tag.Protocol],
        title: 'Consectetur Protocol',
        author: 'By:XOrganization',
        date: '06/14/2021',
        content: <Forth width={576} height={356 - 148} />,
        view: '1.2k',
        favorite: 42,
        share: 63,
    },
    {
        type: 'Idea' ,
        tags: [Tag.GAMEFI, Tag.DEFI, Tag.RPG],
        title: 'Build an RPG game with a grand story backg...',
        author: 'By:XOrganization',
        date: '06/14/2021',
        content: <div className="items-data-content">
            <p>
                <span>
                    26
                </span>
                <span>
                    Dop has been initiated based on this idea tread
                </span>
            </p>
            <p>
            I want to make an RPG game where each race has different characteristics and stories. In the game, players use their own tactics to control the turn-based battles of NFT heroes.
            </p>
        </div>,
        view: '1.2k',
        like: 42,
        favorite: 42,
        share: 63,
    },
    {
        type: 'Idea' ,
        tags: [Tag.GAMEFI, Tag.MoveToEarn],
        title: 'Win with intelligence and physical strength',
        author: 'By:MarkLee',
        date: '06/14/2021',
        content: <div className="items-data-content">
        <p>
            <span>
                26
            </span>
            <span>
                Dop has been initiated based on this idea tread
            </span>
        </p>
        <p>
        A Move to Earn program, a double test of intelligence and brainpower. People will use their mobile devices to participate in solving math problems (quizzes) at certain predetermined locations in their area, un...
        </p>
    </div>,
        view: '1.2k',
        like: 42,
        favorite: 42,
        share: 63,
    },
    {
        type: 'Workflow' ,
        tags: [Tag.NFT, Tag.DAOFUND],
        title: 'Ghost Farm - Invite 5 people to the DO.',
        date: '3 days ago',
        content: <Third width={576} height={260 - 148} />,
        view: '1.2k',
        favorite: 42,
        share: 63,
    },
]

export {
    ItemsData,
}