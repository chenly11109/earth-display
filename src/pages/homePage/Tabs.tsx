import './Tabs.scss'

function Tabs(){
    return (
        <div className="home_tabs">
            <span className="home_tabs_all">
                All
            </span>
            <span className="home_tabs_related">
                Related to me
            </span>
            <span className="home_tabs_subscribed">
                Subscribed
            </span>
        </div>
    )
}

export default Tabs;