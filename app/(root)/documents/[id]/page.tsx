import Header from "@/components/header";
import { Editor } from "@/components/editor/Editor";

const Document = () => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">Document title example</p>
        </div>
      </Header>
      <Editor />
    </div>
  );
};

export default Document;
