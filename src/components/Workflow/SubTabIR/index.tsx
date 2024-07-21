import "./index.css";
import { useState } from "react";
import { useWorkflowStore } from "../../../state/workflow";
import SelectType from "../../../design/WorkFlow/SelectType";
import { ReactComponent as TrashLogo } from "../../../design/WorkFlow/Icons/trashCan.svg";
import { ReactComponent as EnterLogo } from "../../../design/WorkFlow/Icons/enter.svg";
import { ReactComponent as EditLogo } from "../../../design/WorkFlow/Icons/edit.svg";
import { Event_InfoDtoList, Event_Ir } from "../../../types/workflow";
import LogicSelection from "../../../design/WorkFlow/LogicSelection";
import IRSelectionModal from "../IRSelectionModal";

type IR = {
  data: { inputValue: boolean; outputValue: boolean; usedTime: boolean };
  id: string;
  irName: string;
  systemNo: string;
  systemId: string;
  systemName: string;
};

export function IRSelection({ setAdd }: { setAdd: any }) {
  const [modal, showModal] = useState(false);

  const [ir, setIr] = useState<IR | null>(null);

  const currentEvent: Event_InfoDtoList = useWorkflowStore(
    (state) => state.currentEvent
  )();
  const irs = currentEvent.conditions.irs.irs;

  const dataOptions = [];
  if (ir) {
    if (
      ir.data.inputValue &&
      !irs.some((irItem) => irItem.irId === ir.id && irItem.dataId === 1)
    )
      dataOptions.push({ value: 1, label: "Input Value" });
    if (
      ir.data.usedTime &&
      !irs.some((irItem) => irItem.irId === ir.id && irItem.dataId === 0)
    )
      dataOptions.push({ value: 0, label: "Used Times" });
    if (
      ir.data.outputValue &&
      !irs.some((irItem) => irItem.irId === ir.id && irItem.dataId === 2)
    )
      dataOptions.push({ value: 2, label: "Output Value" });
  }

  const [data, setData] = useState<number | null>(null);
  const [times, setTimes] = useState(1);

  const { addIr } = useWorkflowStore((state) => state.utils);

  return (
    <div className="details_contents">
      <div className="details_contents_item">
        <span
          className="trash_button"
          onClick={() => {
            setAdd(true);
          }}
        >
          <TrashLogo />
        </span>
        When users&apos;&nbsp;
        {ir ? (
          <>
            <span style={{ color: "#C698DC" }}>
              [{ir.systemNo}] {ir.irName}
            </span>
            <SelectType
              options={dataOptions}
              defaultValue={{ value: "Select a Data", selectable: false }}
              setValue={setData}
              style={{ width: "200px" }}
            />

            <span style={{ display: "flex", flexDirection: "row" }}>
              &gt;=
              <input
                type="number"
                className="inputs_number"
                style={{ height: "30px" }}
                value={times}
                onChange={(e) => {
                  const value =
                    Number(e.target.value) > 0 ? Number(e.target.value) : 1;
                  setTimes(value);
                }}
              />
            </span>

            <span
              className="enter_button"
              onClick={() => {
                if (data !== null && ir) {
                  addIr({
                    dataId: data,
                    systemNo: ir.systemNo,
                    systemName: ir.systemName,
                    systemId: ir.systemId,
                    irName: ir.irName,
                    irId: ir.id,
                    threshold: times,
                  });
                  setAdd(true);
                }
              }}
            >
              <EnterLogo />
            </span>
          </>
        ) : (
          <span
            className="details_addButton details_addButton--inline"
            onClick={() => {
              showModal(true);
            }}
          >
            Select an IR
          </span>
        )}
        {modal ? (
          <IRSelectionModal toggleShowModal={showModal} setIr={setIr} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function IrItem({ irItem }: { irItem: Event_Ir }) {
  const [edit, toggleEdit] = useState(false);

  const { irId, irName, systemNo, dataId, threshold } = irItem;
  const [times, setTimes] = useState(threshold);

  const data =
    dataId === 0 ? "Used Times" : dataId === 1 ? "Input Value" : "Output Value";
  const { deleteIr, editIr } = useWorkflowStore((state) => state.utils);
  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          deleteIr(irId, dataId);
        }}
      >
        <TrashLogo />
      </span>
      When{" "}
      <span className="details_contents_item--unique">
        {systemNo}-{irName}
      </span>
      &apos;s Data:{" "}
      <span className="details_contents_item--unique">[{data}]</span>
      {">="}
      {edit ? (
        <input
          type="number"
          className="inputs_number"
          style={{ height: "30px" }}
          value={times}
          onChange={(e) => {
            const value =
              Number(e.target.value) > 0 ? Number(e.target.value) : 1;
            setTimes(value);
          }}
        />
      ) : (
        <span className="details_contents_item--unique">{threshold}</span>
      )}
      {edit ? (
        <span
          className="enter_button"
          onClick={() => {
            editIr(irId, dataId, times);
            toggleEdit(false);
          }}
        >
          <EnterLogo />
        </span>
      ) : (
        <span
          style={{ fill: "grey" }}
          onClick={() => {
            toggleEdit(true);
          }}
        >
          <EditLogo />
        </span>
      )}
    </div>
  );
}

export default function IRTab() {
  const currentEvent: Event_InfoDtoList = useWorkflowStore(
    (state) => state.currentEvent
  )();
  const IRSet = currentEvent.conditions.irs.irs;
  const logicType = currentEvent.conditions.irs.logicType;
  const select = useWorkflowStore((state) => state.utils.editIrLogicType);
  const [add, setAdd] = useState(true);

  return (
    <div className="details_container details_container_subTab">
      {IRSet.length > 1 ? (
        <LogicSelection logicType={logicType} select={select} />
      ) : (
        ""
      )}

      <div className="details_contents">
        {IRSet.map((ir: Event_Ir) => (
          <IrItem key={ir.irId + String(ir.dataId)} irItem={ir} />
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        {add ? (
          <span
            onClick={() => {
              setAdd(false);
            }}
            className="details_addButton"
          >
            + IR Condition
          </span>
        ) : (
          <IRSelection setAdd={setAdd} />
        )}
      </div>
    </div>
  );
}
