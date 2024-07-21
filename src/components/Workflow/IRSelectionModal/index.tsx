import Modal from "../../../design/WorkFlow/Modal";
import "./index.css";
import { useWorkflowStore } from "../../../state/workflow";
import { useState } from "react";
import SearchBar from "../../../design/WorkFlow/SearchBar";
import { useIrfromDopId } from "../../../api/workflow";

type System = {
  irs: Array<{
    data: { inputValue: boolean; outputValue: boolean; usedTime: boolean };
    id: string;
    irName: string;
  }>;
  systemId: string;
  systemNo: string;
  systemName: string;
};

function SystemDropDown({
  system,
  toggleShowModal,
  show,
  setIr,
}: {
  system: System;
  toggleShowModal: (showModal: boolean) => void;
  show: boolean;
  setIr: any;
}) {
  const [showIrs, toggleShowIrs] = useState(show);
  const { systemName, systemId, systemNo } = system;
  return (
    <div style={{ padding: "10px", width: "90%" }}>
      <div
        className="selection_title"
        onClick={() => {
          toggleShowIrs(!showIrs);
        }}
      >
        <div
          style={{
            display: "inline-block",
            transform: showIrs ? "rotate(90deg)" : "",
            position: "relative",
            top: showIrs ? "5px" : "",
          }}
        >
          {">"}
        </div>{" "}
        [{systemNo}] {system.systemName}
      </div>
      {showIrs ? (
        <div style={{ position: "relative", left: "24px" }}>
          {system.irs.map((ir) => (
            <div
              key={ir.id}
              onClick={() => {
                setIr({ systemNo, systemName, systemId, ...ir });
                toggleShowModal(false);
              }}
            >
              {ir.irName}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default function IRSelectionModal({
  toggleShowModal,
  setIr,
}: {
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIr: React.Dispatch<React.SetStateAction<any>>;
}) {
  //will be updated with post request
  const dopId = useWorkflowStore((state) => state.workflow.dopId);
  const { systems } = useIrfromDopId(dopId);

  const [searchText, setSearchText] = useState("");

  const systemsDisplay = systems
    ? systems.map(
        (system: {
          systemId: string;
          systemName: string;
          systemNo: string;
          irs: Array<{ data: any; id: string; irName: string }>;
        }) => ({
          ...system,
          irs: system.irs.filter((ir) =>
            ir.irName.toLowerCase().includes(searchText.toLowerCase())
          ),
        })
      )
    : [];
  return (
    <Modal
      showModal={toggleShowModal}
      style={{ height: "400px", width: "500px" }}
    >
      <div>Choose an Ir</div>
      <div style={{ height: "80%" }}>
        <SearchBar
          onChange={(e) => setSearchText(e.target.value)}
          placeHolder="Search Tag Name"
        />

        <div className="modal_contents_container">
          {systemsDisplay.map(
            (
              system: {
                systemId: string;
                systemName: string;
                systemNo: string;
                irs: Array<{ data: any; id: string; irName: string }>;
              },
              i: number
            ) => (
              <SystemDropDown
                key={i}
                system={system}
                toggleShowModal={toggleShowModal}
                show={i ? false : true}
                setIr={setIr}
              />
            )
          )}
        </div>
      </div>
    </Modal>
  );
}
