/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Editor } from "primereact/editor";
export default function EditorInput({ field, control, errors }) {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue || ""}
      errors={errors}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full">
          <Editor
            className="w-full"
            onTextChange={(e) => onChange(e.htmlValue)}
            value={value}
            error={!!error}
            style={{ height: "320px" }}
            helperText={error ? error.message : null}
          />
          {error && <span className="text-red-500">{`${error.message}`}</span>}
        </div>
      )}
    />
  );
}
