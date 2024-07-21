
import { Link } from 'react-router-dom';
import './index.css';
import ItemContainer from './Items/ItemContainer';
import { ItemsData } from './Items/ItemsData';
import Tabs from './Tabs';

export default function HomePage() {


    return (
        <>
        <div className='home_container'>
            <Tabs />
            <div className="box">
                {ItemsData.map((item, idx) => {
                    if(idx === 3){
                        return (
                            <Link to='/dop' state={"dopPage"}>
                                <ItemContainer  type={item.type}
                                        tags={item.tags}
                                        title={item.title}
                                        author={item.author}
                                        date={item.date}
                                        content={item.content}
                                        view={item.view}
                                        like={item.like}
                                        favorite={item.favorite}
                                        share={item.share}
                                        key={idx} 
                                />
                            </Link>
                        )
                    }else{
                        return (
                            <ItemContainer  type={item.type}
                                    tags={item.tags}
                                    title={item.title}
                                    author={item.author}
                                    date={item.date}
                                    content={item.content}
                                    view={item.view}
                                    like={item.like}
                                    favorite={item.favorite}
                                    share={item.share}
                                    key={idx} 
                            />
                        )
                    }
                    
                })
                }
            </div>
            {/* <div className='top_bar'>
                <Link to='/home/publish'>
                    <div className='publish_content' onClick={publishContent}>
                        <div>+</div>
                    </div>
                </Link>
                <Link to='/'>
                    <div id='top_bar' className='back' onClick={backToDefault}>Back</div>
                </Link>
                {
                    search ? (
                        <div id='top_bar' className='ipt'>
                            <div onClick={() => { setSearch(false) }}>🔍</div>
                            <input className='ipt_text' type="text" />
                        </div>
                    ) : (
                        <div id='top_bar' className='search' onClick={handleSearch}>🔍</div>
                    )
                }
            </div> */}
        </div >
        </>
    )
}
