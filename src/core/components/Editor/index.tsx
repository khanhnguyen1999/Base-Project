import { CKEditor } from "ckeditor4-react";
import { useState } from "react";

interface Props {
  readOnly?: boolean;
}

const Editor = ({ readOnly }: Props) => {
  const [inputMessage, setInputMessage] = useState("");
  const onEditorChange = (event: any) => setInputMessage(event.editor.getData());

  return (
    <div className="rowEditor">
      <CKEditor
        data={inputMessage}
        onChange={onEditorChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Editor;
