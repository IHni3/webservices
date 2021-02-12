import { ScrollPanel } from "primereact/scrollpanel";

import "./style.scss";

export const Page = (props) => {
  return (
    <ScrollPanel className={"page " + props.className}>
      {props.children}
    </ScrollPanel>
  );
};
