import styled from "styled-components";
import { Segmented, Card, Radio } from "antd";
import { useEditor } from "../../stores";
import { WebViewTool, CallRoomTool } from "./";

export const InteractionTool = () => {
  const { subTool, setSubTool, interactionTool, setInteractionTool } = useEditor();

  return (
    <Card title="Interaction" size="small">
      <Segmented block options={["Add", "Remove"]} value={subTool} onChange={(value) => setSubTool(value as string)} />

      {subTool === "Add" && (
        <OptionArea>
          <Radio.Group
            value={interactionTool}
            onChange={(e) => setInteractionTool(e.target.value)}
            size="small"
            buttonStyle="solid"
          >
            <Radio.Button value="collision">Collision</Radio.Button>
            <Radio.Button value="webview">WebPage</Radio.Button>
            <Radio.Button value="callRoom">CallRoom</Radio.Button>
          </Radio.Group>
          {interactionTool === "webview" && <WebViewTool />}
          {interactionTool === "callRoom" && <CallRoomTool />}
        </OptionArea>
      )}
    </Card>
  );
};

const OptionArea = styled.div`
  margin-top: 20px;
  .ant-radio-group {
    margin-bottom: 10px;
  }
`;
