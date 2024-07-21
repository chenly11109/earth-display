function AwardText({
  award,
}: {
  award: { userName: string; workflowName: string };
}) {
  const { userName, workflowName } = award;
  return (
    <div>
      {userName}
      <span style={{ color: "lightGrey" }}> get reward from the</span>{" "}
      {workflowName}
    </div>
  );
}

const awards = [
  {
    userName: "MarkLee#1564",
    workflowName: "Creation",
  },
  {
    userName: "Jennie#w965",
    workflowName: "Community",
  },
  {
    userName: "Jennie#w995",
    workflowName: "Creation",
  },
];

export default function Awards() {
  return (
    <div style={{ position: "relative" }}>
      <div>
        <span style={{ color: "yellowgreen" }}>256</span> Users get Awards:
      </div>
      {awards.map((award, i) => (
        <AwardText award={award} key={i} />
      ))}
    </div>
  );
}
