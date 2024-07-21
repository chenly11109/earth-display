import "./index.css";
import { BackButton } from "../../../design/WorkFlow/BackButton";

export default function EventDisplay() {
  //data will be derived from eventID
  const event = {
    eventNo: 0,
    eventDetails: {
      information: {
        type: "Time-limited Activity",
        name: "Draft Event,with a really long name",
        description:
          "Lorem ipsum dolor sit amet, consecteturenim ad minim vconsequat. olore eu fut non proident, sunt in culpa qui officia deserunt mllit anim id est laborum Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam ",
      },
      prerequisite: {
        event: [
          { workflowName: "Current Workflow", eventNo: 1, eventId: "005001" },
          { workflowName: "Workflow1", eventNo: 15, eventId: "00503" },
        ],
        tag: [
          { tagId: "005002", tagName: "fakeTag" },
          { tagId: "005001", tagName: "fakeTag2" },
        ],
      },
      distribution: {
        platform: [],
        times: 1,
      },
      online: { maxIndex: 0, items: [] },
      //items: type(like, etc.),name,link
      //

      ir: {},
      task: {},
      reward: {
        //tag Id here
      },
    },
  };

  const { eventDetails } = event;
  const { information, prerequisite } = eventDetails;

  return (
    <div className="workflow_page_container">
      <BackButton history="../workflowView/123" />
      <div className="eventView_container">
        <div>
          <span className="eventView_name">{information.name}</span>
          <span className="eventView_type">{information.type}</span>
        </div>

        <div className="eventView_section">
          <div className="eventView_title">Description</div>
          <div>{information.description}</div>
        </div>

        <div className="eventView_section">
          <div className="eventView_title">Prerequisite</div>
          <div>
            {prerequisite.event.map((event) => (
              <div key={event.eventId}>
                {event.workflowName} : Event {event.eventNo}
              </div>
            ))}
            <div style={{ marginTop: "5px" }}>
              {prerequisite.tag.map((tag) => (
                <span className="eventView_tag" key={tag.tagId}>
                  {tag.tagName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
