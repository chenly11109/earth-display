import { ReactNode, useState } from "react"
import FeedItem from "../../../design/CanvasType/FeedItem"
import { Tag } from "../../../types/feedItem"
import {
    Share,
    Like,
    View,
    Favorite,
    HoverLike,
    HoverFavorite,
    HoverShare,
} from '../../../svg'
import './ItemContainer.scss'
import { 
    DAOFUND, 
    DEFI, 
    GAMEFi, 
    MetaUniverse, 
    NFT,
    CrossChain,
    Protocol,
    RPG,    
    MoveToEarn,             
} from "./tagSvg"


interface ItemContainerProps {
    type: string,
    tags: Tag[],
    title: string,
    author?: string,
    date: string,
    content: ReactNode,
    view: string,
    like?: number,
    favorite: number,
    share: number,
}


function LastLineElement(ele: ReactNode, hoveringEle: ReactNode){
    const [isHovering, setHovering] = useState(false)

    return (
        <span onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
        >
            {
                isHovering ? hoveringEle : ele
            }
        </span>
    )
}



function ItemContainer (props: ItemContainerProps){
    const {
        type,
        tags,
        title,
        author,
        date,
        content,
        view,
        like,
        favorite,
        share,
    } = props

    const externalText = type === 'DOP' ?
                                 'A project was established.' : 
                                 'A new idea has been posted to the cultivational flow.'

    return (
        <FeedItem>
            <p className="feed_item_external_text">
                { externalText }
            </p>
            <div className="feed_item_container">
                <div className="feed_item_created_message">
                    <p>
                        { externalText }
                    </p>
                    <p>
                        { date }
                    </p>
                </div>
                <div className="feed_item_first_line">
                    <span>{ title }</span>
                    <span className={`feed_item_first_line-${type}`}>{ type }</span>
                </div>
                <div className="feed_item_second_line">
                    {
                        tags.map(tag => {
                            if(tag === Tag.DAOFUND) return <DAOFUND key={tag} width={'98px'} />
                            if(tag === Tag.NFT) return <NFT key={tag} width={'48px'} />
                            if(tag === Tag.DEFI) return <DEFI key={tag} width={'51px'} />
                            if(tag === Tag.GAMEFI) return <GAMEFi key={tag} width={'79px'} />
                            if(tag === Tag.Protocol) return <Protocol key={tag} width={'80px'} />
                            if(tag === Tag.CrossChain) return <CrossChain key={tag} width={'106px'} />
                            if(tag === Tag.RPG) return <RPG key={tag} width={'49px'} />
                            if(tag === Tag.MoveToEarn) return <MoveToEarn key={tag} width={'116px'} />
                            return <MetaUniverse key={tag} width={'125px'} />
                        })
                    }
                    <span>{ author }</span>
                    {/* <span> { date } </span> */}
                </div>

                { content }
                
                <div className="feed_item_last_line">
                    <span>
                        <View width={30} height={30} />{ view }
                    </span>
                    {like ? <>
                                {LastLineElement(
                                    <><Like width={30} height={30} />{ like }</>,
                                    <><HoverLike width={60} height={60} />{ like }</>
                                    )
                                }
                            </>
                            : null
                    }
                    {LastLineElement(
                                    <><Favorite width={30} height={30} />{ favorite }</>,
                                    <><HoverFavorite width={60} height={60} />{ favorite }</>
                                    )
                    }
                    {LastLineElement(
                                    <><Share width={30} height={30} />{ share }</>,
                                    <><HoverShare width={60} height={60} />{ share }</>
                                    )
                    }
                </div>
            </div>
        </FeedItem>
    )
}

export default ItemContainer