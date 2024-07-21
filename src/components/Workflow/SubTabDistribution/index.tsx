import "./index.css";
import { ReactComponent as TrashLogo } from "../../../design/WorkFlow/Icons/trashCan.svg";
import { useWorkflowStore } from "../../../state/workflow";
import { Event_InfoDtoList } from "../../../types/workflow";
import LogicSelection from "../../../design/WorkFlow/LogicSelection";

function DistributionItem({
  type,
  times,
}: {
  type: "dop" | "workflow";
  times: number;
}) {
  const { deleteDistribution, addDistribution } = useWorkflowStore(
    (state) => state.utils
  );

  return (
    <div className="details_contents">
      <div className="details_contents_item" style={{ marginTop: "20px" }}>
        <span
          className="trash_button"
          onClick={() => {
            deleteDistribution(type);
          }}
        >
          <TrashLogo />
        </span>
        Share current {type} and was visited
        <input
          type="number"
          className="inputs_number"
          value={times}
          onChange={(e) => {
            const value = Number(e.target.value);
            const time = value < 1 ? 1 : value > 9999 ? 9999 : value;

            addDistribution(time, type);
          }}
        />
        times
      </div>
    </div>
  );
}

export default function DistributionTab() {
  const currentEvent: Event_InfoDtoList = useWorkflowStore(
    (state) => state.currentEvent
  )();
  const distribution = currentEvent.conditions.shares.shares;
  const { addDistribution } = useWorkflowStore((state) => state.utils);
  const logicType = currentEvent.conditions.shares.logicType;
  const select = useWorkflowStore((state) => state.utils.editDistributionLogicType);

  const distributionWorkflow = distribution.find(
    (item) => item.shareObjectType === 1
  );
  const distributionDop = distribution.find(
    (item) => item.shareObjectType === 2
  );

  return (
    <div className="details_container details_container_subTab">
      {distribution.length > 1 ? (
        <LogicSelection logicType={logicType} select={select} />
      ) : (
        ""
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {distributionWorkflow ? (
          <DistributionItem
            type={"workflow"}
            times={distributionWorkflow.values}
            key={"workflow"}
          />
        ) : (
          <span
            onClick={() => {
              addDistribution(1, "workflow");
            }}
            style={{ width: "300px" }}
            className="details_addButton"
          >
            + Share Current Workflow
          </span>
        )}

        {distributionDop ? (
          <DistributionItem
            type={"dop"}
            times={distributionDop.values}
            key={"dop"}
          />
        ) : (
          <span
            onClick={() => {
              addDistribution(1, "dop");
            }}
            style={{ width: "300px" }}
            className="details_addButton"
          >
            + Share Current DOP
          </span>
        )}
      </div>
    </div>
  );
}
