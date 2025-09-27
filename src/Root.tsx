import { Composition } from "remotion";
import { RemotionTutorial } from "./RemotionTutorial";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render RemotionTutorial
        id="RemotionTutorial"
        component={RemotionTutorial}
        durationInFrames={3600} // 120 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
